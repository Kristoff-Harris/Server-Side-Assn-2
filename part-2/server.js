//---------------------------------------------------------------------------------
// Author   : Chris Harris
// Class    : BU CS 601
// Assn     : 2
// File     : Server.js for Part 2
// Purpose  : This program is meant to be accessed by a web browser, or API client which requests employeeModule functions such
//            as looking up against an employee data set, doing a search to interact with a predefined dataset
//
//---------------------------------------------------------------------------------

const empMod = require('./employeeModule');
const express = require('express');
const app = express();

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({defaultLayout: 'layoutmain'}));

// to parse request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// static resources
app.use(express.static(__dirname + '/public'));


app.set('view engine', 'handlebars');

// GET request to the homepage
app.get('/', (req, res) => {
    res.render('home');
});

// Used to search for a specific user ID and retrieve user details (available in JSON, XML and HTML)
app.get('/id/:id', (req, res) => {
    res.format({
        'application/json': () => {
            res.send(JSON.stringify(empMod.lookupById(parseInt(req.params.id))));
        },
        'application/xml': () => {
            var requestedEmp = empMod.lookupById(parseInt(req.params.id));
            var idXml =
                '<?xml version="1.0"?>\n' +
                '<employee id="' + parseInt(req.params.id) + '">' + '\n' +
                '<firstName>' + requestedEmp.firstName + '</firstName>' + '\n' +
                '<lastName>' + requestedEmp.lastName + '</lastName>' + '\n' +
                '</employee>\n';
            res.type('application/xml');
            res.send(idXml);
        },
        'text/html': () => {
            res.render('employee', {
                employee: empMod.lookupById(parseInt(req.params.id)),
                searchId: req.params.id
            });
        }
    });
});

// Used to search for a given last name (available in JSON, XML and HTML)
app.get('/lastName/:name', (req, res) => {
    res.format({
        'application/json': () => {
            res.send(JSON.stringify(empMod.lookupByLastName(req.params.name)));
        },
        'application/xml': () => {
            var searchXml =
                '<?xml version="1.0"?>\n<employees>\n' +
                empMod.lookupByLastName(req.params.name).map((emp) => {
                return '<employee id="' + emp.id +'">' + '\n' +
                            '<firstName>' + emp.firstName + '</firstName>' + '\n' +
                            '<lastName>' + emp.lastName + '</lastName>' + '\n' +
                       '</employee>'
            }).join('\n') + '\n</employees>\n';

            res.type('application/xml');
            res.send(searchXml);
        },
        'text/html': () => {
            res.render('employees',
                {
                    searchTerm: req.params.name,
                    employees: empMod.lookupByLastName(req.params.name)
                });
        }
    });
});

// show the add employee form to the user
app.get('/addEmployee', (req, res) => {
    res.render('newEmployee');
});

// Endpoint which is posted to upon new user form submit
app.post('/addEmployee', (req, res) => {
    empMod.addEmployee(req.body.fName, req.body.lName);
    res.redirect('/lastName/' + req.body.lName);

});

// Setting up a way to return 404 upon resource unknown
app.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.send("<b>404 - Not Found</b>");
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
