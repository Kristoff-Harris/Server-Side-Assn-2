//---------------------------------------------------------------------------------
// Author   : Chris Harris
// Class    : BU CS 601
// Assn     : 2
// File     : Client.js for Part 1
// Purpose  : This program is meant to connect to a remote server which leverages the
//             employeeModule to interact with a predefined dataset which may have employees added.
//             Client may lookup by ID via "lookupByID 2" "lookupByLastName Smith", and add an employee to
//             the dataset via "addEmployee Joe Smith"
//---------------------------------------------------------------------------------

var net = require('net');
var readline = require('readline');

// Importing the employee module from assn 1
const empMod = require("./employeeModule");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Get the client input from commandline
const readMessage = (client) => {
    rl.question("Enter Message: ", (line) => {
        client.write(line);
        if (line == "bye")
            client.end();
        else {
            setTimeout(() => {
                readMessage(client);
            }, 5000);
        }
        ;
    });
};

const client = net.connect({port: 3000},
    () => {
        console.log("Connected to server");
        readMessage(client);
    });


client.on('end', () => {
    console.log("Client disconnected...");
});

client.on('data', (data) => {
    console.log("\n Received:", data.toString());
});

