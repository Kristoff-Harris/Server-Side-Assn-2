const empMod = require('./employeeModule');
const express = require('express');
const app = express();

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({defaultLayout: 'main_logo'}));

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

app.get('/about', (req, res) => {
    res.render('about');
});

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
                '</employee>';
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

app.get('/addEmployee', (req, res) => {
    res.render('newEmployee');
});

app.post('/addEmployee', (req, res) => {
    console.log(req.body);
    empMod.addEmployee(req.body.fName, req.body.lName);
    res.redirect('/lastName/' + req.body.lName);

});

// module
const courses = require('./ex08_courses');

app.get('/api/courses', (req, res) => {
    res.json(courses.getAllCourses())
});

// GET request to the homepage
app.get('/', (req, res) => {
    res.type('text/html');
    let result = '<table border=1>';
    let item = '';
    for (let header in req.headers) {
        item = '<tr><th>' + header + '</th>' +
            '<td>' + req.headers[header] + '</td></tr>\n';
        result += item;
    }
    result += '</table>'
    res.send(result);
});

app.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.send("<b>404 - Not Found</b>");
});

app.listen(3002, () => {
    console.log('http://localhost:3002');
});

/*
curl -X GET "http://localhost:3000/api/courses"

curl -X GET "http://localhost:3000/api/course/cs602"

curl -X DELETE "http://localhost:3000/api/course/cs602"

curl -X POST -H "Content-type: application/json" \
    "http://localhost:3000/api/course" \
    -d '{"cid":"cs520", "cname":"Info Structures"}'

*/