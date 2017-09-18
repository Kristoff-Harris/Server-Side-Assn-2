//---------------------------------------------------------------------------------
// Author   : Chris Harris
// Class    : BU CS 601
// Assn     : 2
// File     : Server.js for Part 1
// Purpose  : This program is meant to handle remote client requests which call upon the
//             employeeModule to interact with a predefined dataset which may have employees added.
//             Client may lookup by ID via "lookupByID 2" "lookupByLastName Smith", and add an employee to
//             the dataset via "addEmployee Joe Smith"
//---------------------------------------------------------------------------------

//TODO Remove the comments which don't add value


const net = require('net');
const empModule = require('./employeeModule');

// Listen for commands from the client
var server = net.createServer(
    function(socket){
        // Indicate that a client has connected to us
        console.log("Client connection...");

        // Indicate that a client has disconnected
        socket.on('end', function(){
            console.log('Client Disconnected...');
        });

        // process data from client
        socket.on('data', function(data){
            dataArray = data.toString().split(' ');
            console.log(".. Received " + data.toString());

            if(dataArray[0] == 'lookupByLastName' && dataArray[1] != undefined){
                socket.write(JSON.stringify(empModule.lookupByLastName(dataArray[1])));
            }

            else if(dataArray[0] == 'addEmployee' && dataArray[1] != undefined && dataArray[2] != undefined){
                socket.write(JSON.stringify(empModule.addEmployee(dataArray[1], dataArray[2])));
            }

            else if(dataArray[0] == 'lookupById' && dataArray[1] != undefined){
                socket.write(JSON.stringify(empModule.lookupById(parseInt(dataArray[1]))));
            }
            else {
                socket.write("Unknown Command");
            }
        });
    });

server.listen(3000, function() {
    console.log("Listening for connections ")
});


