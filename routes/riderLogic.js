var moment = require('moment');
//const distance = require('google-distance-matrix');

//function to determine if rider and driver zips are the same
var compZips = function(riderStartZip, riderEndZip, data){
    var ridesPosZips = [];
    for (var i = 0; i < data.length; i++){
        
    }
}

//function to determine distance between start and end points. THIS IS DEPRICATED DUE TO THE DIFFICULTY OF WORKING WITH DISTANCE MATRIX
// var distanceCall = function (riderStart, riderEnd, data) {
//     var ridesPosDist = [];
//     var origins = [];
//     var destinations = [];
//     console.log(data.length)
//     for(var i = 0; i < data.length; i++){
//         origins.push(addRG(riderStart), addRG(riderEnd));
//         destinations.push(addRG(data[i].pick_up_address), addRG(data[i].drop_off_address));
//     }
//     console.log(origins);
//     console.log(destinations);
//     distance.key(process.env.API_KEY);
//     distance.units("imperial");
//     distance.matrix(origins,destinations, function(err, distances){
//         if (!err){
//             console.log(distances.rows[0].elements, distances.rows[1].elements, distances.rows[2].elements, distances.rows[3].elements);
//             for(var i = 0; i < data.length; i ++){
//                 //console.log(distances.rows[i].elements);
//                 //console.log(distances.rows[(i*2)].elements.distance.text);
//             }
//         }
//     })
// };
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
var addRG = function (str) {
    return str.replace(/[, ]+/g, " ").trim();
}

module.exports = {
    timeMath: timeMath,
    //distanceCall: distanceCall,
    addRG: addRG
}
