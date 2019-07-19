var moment = require('moment');
var distance = require('google-distance-matrix');

//fucntion to determine distance between start and end points
var distanceCall = function (riderStart, riderEnd, driverStart, driverEnd) {
    var origins = [riderStart, riderEnd]
    var destinations = [driverStart, driverEnd]
    distance.key(process.env.GOOGLE_API_KEY)
    distance.units("imperial");
    distance.matrix(origins, destinations, function(err, distances){
        if (err){
            return console.log(err);
        }
        if (distances.status == 'OK'){
            return distances
        } 
    })
}
//function to do time math
var timeMath = function (data, startTime, endTime) {
    var startNum = moment(startTime).format("X");
    var endNum = moment(endTime).format("X");
    var ridesPosTime = [];
    for (var i = 0; i < data.length; i++) {
        var rideNum = moment(data[i].departure_time).format("X")
        if ((startNum < rideNum) && (rideNum < endNum)) {
            ridesPosTime.push(data[i]);
        };
    };
    return ridesPosTime;
};

//function to clean up adress inputs
var addRG = function(str){
    return str.replace(/[, ]+/g, " ").trim();
}

module.exports = {
    timeMath: timeMath,
    distanceCall: distanceCall,
    addRG: addRG
}
