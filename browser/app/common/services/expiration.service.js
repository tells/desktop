app.service('expiration', ['Session', function(Session) {
    // grab all landlords' real estate
    var portfolio = Session.user.data.building_ids;

    // filter if building ID provided
    if (typeof buildingID === "string") {
        portfolio = portfolio.filter(function(building) {
            return building._id === buildingID;
        });
    }

    var today = new Date();
    //A day in milliseconds
    var oneDay = 86400000;
    //add the amount of days to the lxd on to the apartment object - this makes it available to the filter function down below
    portfolio.forEach(function(building) {
        if (typeof building.apartments !== 'object') return console.log("No apartments provided for ", building.streetNumber, " ", building.streetName);
        building.apartments.forEach(function(apartment) {
            apartment['daysToLxd'] = apartment.lease_ids[0] ? daysToExpiration(apartment.lease_ids[0].end_date) : undefined
            apartment['buildingName'] = building.street_number + " " + building.street_name;
            apartment['buildingID'] = building._id;
        })
    });

    function daysToExpiration(leaseExpiry) {
        return Math.floor(((new Date(leaseExpiry)) - today) / (oneDay))
    }

    this.portAptFilter = function(func) {
        var filteredArray = []
        portfolio.forEach(function(building) {
            building.apartments.filter(func).forEach(function(obj) {
                filteredArray.push(obj)
            })
        })
        return filteredArray;
    }

    //if object put that object's properties onto resulting array
    this.portAptFilterFuncArr = function(funcArr) {
        if(typeof funcArr !=='object') throw new Error('argument should be an object/array');
        var filteredArray = Array.isArray(funcArr) ? [] : new Map();
        portfolio.forEach(function(building) {
            building.apartments.filter(funcArr).forEach(function(obj) {
                filteredArray.push(obj);
            });
        });
        return filteredArray;
    };
}]);
