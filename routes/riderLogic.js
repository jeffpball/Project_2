var moment = require('moment');

    // var distanceCall = function (riderStart, riderEnd, driverStart, driverEnd) {
    //     var service = new google.maps.DistanceMatrixService();
    //     service.getDistanceMatrix(
    //         {
    //             origins: [riderStart, riderEnd],
    //             destinations: [driverStart, driverEnd],
    //             travelMode: 'DRIVING',
    //             unitSystem: google.maps.UnitSystem.IMPERIAL,
    //         }, callback());

    //     function callback(response, status) {
    //         if (status !== google.maps.DistanceMatrixStatus.OK) {
    //             console.log('Error:', status);
    //         } else {
    //             console.log(response);
    //             $("#distance").text(response.rows[0].elements[0].distance.text).show();
    //             $("#duration").text(response.rows[0].elements[0].duration.text).show();
    //         }
    //     }
    // }
//function to do time math
var timeMath = function(data, startTime, endTime){
    var startNum = moment(startTime).format("X");
    var endNum = moment(endTime).format("X");
    var ridesPosTime = [];
    for(var i = 0; i < data.length; i++){
        var rideNum = moment(data[i].departure_time).format("X")
        if((startNum < rideNum) && (rideNum < endNum)){
            ridesPosTime.push(data[i]);
        };
    };
    return ridesPosTime;
};

module.exports = {
    timeMath: timeMath
}
