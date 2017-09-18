const empMod = require("./employeeModule");

// Running tests specified in the requirements
console.log("Lookup by last name (Smith)");
empMod.lookupByLastName("Smith");

console.log("Adding employee William Smith ");
empMod.addEmployee('William', 'Smith');

console.log("Lookup by last name (Smith)");
empMod.lookupByLastName("Smith");

console.log("Lookup by id (2)");
empMod.lookupById(2);

console.log("Changing First Name");
empMod.updateById(2, 'Mary', 'Smith');

console.log("Lookup by id (2)");
empMod.lookupById(2);
