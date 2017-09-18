const _ = require("underscore") ;


var data = [
    {id:1, firstName:'John', lastName:'Smith'},
    {id:2, firstName:'Jane', lastName:'Smith'},
    {id:3, firstName:'John', lastName:'Doe'}
];

module.exports = {
    lookupById: function(currId){
        console.log("currId == ", currId);
        // with the assumption every user will have a unique ID
        var idsFound = _.findWhere(data, {id: currId});
        return idsFound;
    },

    lookupByLastName: function(currLastName){
        return _.where(data, {lastName: currLastName});
    },

    // Provide an id for which to update the first and last name
    // Alternatively we could create an updateFirstNameById, and updateLastNameById, but this seemed simplest
    updateById: function( currId, fName, lName){
       return _.each(data, function(item){
            if(item.id === currId){
                item.firstName = fName;
                item.lastName = lName;
            }
        });
    },

    // Adds a new employee to the data object
    addEmployee: function(fName, lName){
        // Get the highest id employee
        var currHighest = _.max(data, function(data){ return data.id; });
        var newId = currHighest.id + 1;

        data.push({id: newId, firstName: fName, lastName: lName});
        return newId;
    }
};


