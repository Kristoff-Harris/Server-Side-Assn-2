var net = require('net');
var readline = require('readline');

const empMod = require("./employeeModule");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const readMessage = (client) => {
    rl.question("Enter Message: ", (line) => {
        client.write( line);
        if (line == "bye")
            client.end();
        else {
            setTimeout(() => {
                readMessage(client);
            }, 5000);
        };
    });
};

const client = net.connect({port:3000},
    () => {
        console.log("Connected to server");
        readMessage(client);
    });


client.on('end', () => {
    console.log("Client disconnected...");
    return;
});

client.on('data', (data) => {
    console.log("\n Received:", data.toString());
});

/*
const client = net.connect({port:3000},
    () => {
        //client.setNoDelay();
        console.log("Connected to server");
        //var cmdArray        = ["lookupByLastName Smith ", "addEmployee William Smith  ", "lookupById 2 ", "bye "];
        //lookupById

        // Initializing currEle variable as a string
        var currEle = "";
        var arrayLength = cmdArray.length;

        //client.setNoDelay();
        for(var i = 0; i < arrayLength; i++){
            client.writeln(cmdArray[i]);
        }
        client.end();


        //var msg = "Hello from client ";
        //console.log("Sending: " + msg);
        //client.write(msg);
});

*/