var moment = require('moment');
const distance = require('google-distance-matrix');

//function to determine if rider and driver zips are the same
var zipCall = function(data, riderStartZip, riderEndZip){
    var ridesPosZips = [];
    for (var i = 0; i < data.length; i++){
        if((data[i].zip_code_pickup == riderStartZip) && (data[i].zip_code_dropoff == riderEndZip)){
           ridesPosZips.push(data[i])
        }
    }
    console.log("in zips " + ridesPosZips)
    return ridesPosZips;
}

//function to determine distance between ride and rider start.
var startDistCall = function (data, riderStart, riderEnd, maxDist) {
    var origins = [];
    var destinations = [];
    origins.push(addRG(riderStart));
    for(var i = 0; i < data.length; i++){
        destinations.push(addRG(data[i].pick_up_address));
    }
    distance.key(process.env.API_KEY);
    distance.units("imperial");
    distance.matrix(origins, destinations, function(err, distances){
        if (!err){
            var startDist = [];
            for(var i = 0; i < distances.length; i ++){
                console.log(distances.rows[i]);
                if(distances.rows[i].elements.distance.value){
                    startDist.push(distances.rows[i].elements.distance.value)
                }
                else{
                    startDist.push("bad address")
                }
            }
            endDistCall(data, riderEnd, maxDist, startDist);
        }
    })
};

//function to determine distance between ride and rider end
var endDistCall = function(data, riderEnd, maxDist, startDist){
    var origins = [];
    var destinations = [];
    console.log("in endDistCall")
    origins.push(addRG(riderEnd));
    for(var i = 0; i < data.length; i++){
        destinations.push(addRG(data[i].drop_off_address));
    }
    distance.key(process.env.API_KEY);
    distance.units("imperial");
    distance.matrix(origins, destinations, function(err, distances){
        if (!err){
            var endDist = [];
            var ridesPosDist = [];
            for(var i = 0; i < distances.length; i ++){
                console.log(distances.rows[i].elements.distance.value);
                if(distances.rows[i].elements.distance.value){
                    endDist.push(distances.rows[i].elements.distance.value)
                }
                else{
                    endDist.push("bad address")
                }
            }
            for(var j = 0; i < data.length; j++){
                if (Number(startDist[i]) + Number(endDist[i]) <= milesToMeters(maxDist)){
                    ridesPosDist.push(data[i]);
                }
            }
            return ridesPosDist
        }
    })
};

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
    console.log("in time " + ridesPosTime.length);
    return ridesPosTime;
};

//function to clean up adress inputs
var addRG = function (str) {
    return str.replace(/[, ]+/g, " ").trim();
}

//function to convert miles to meters
var milesToMeters = function(val){
    var meterOut = Number(val) * 1609.34;
    return meterOut
}

module.exports = {
    timeMath: timeMath,
    startDistCall: startDistCall,
    addRG: addRG,
    zipCall: zipCall
}
