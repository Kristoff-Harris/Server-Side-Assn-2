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
        idsFound = _.findWhere(data, {id: currId});
        console.log("IDS found == ", JSON.stringify(idsFound));
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

    // Using pluck to print out all ids for a given dataset
    getIds: function(currDataSet){
        console.log(_.pluck(currDataSet, 'id'));
    },

    // Using pluck to print out all first names for a given dataset
    getFirstNames: function(currDataSet){
        console.log(_.pluck(currDataSet, 'firstName'));
    },

    // Using pluck to print out all ids for a given dataset
    getLastNames: function(currDataSet){
        console.log(_.pluck(currDataSet, 'lastName'));
    },

    // Adds a new employee to the data object
    addEmployee: function(fName, lName){
        // Get the highest id employee
        var currHighest = _.max(data, function(data){ return data.id; });
        var newId = currHighest.id + 1;

        //var currList = JSON.parse(data);
        data.push({id: newId, firstName: fName, lastName: lName});
        return newId;
    }
};


