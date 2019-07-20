//useful global variables
var riderOrigin = "";
var riderDest = "";

//onclick for submit button
$("#sub").on("click", function () {
    //retrieve data from timepickers
    var windowStart = $("#datetimepicker4").find("input").val();
    var windowEnd = $("#datetimepicker5").find("input").val();
    //initialze moment objects
    var mS = moment(windowStart).toDate();
    var mE = moment(windowEnd).toDate();
    var riderLocations = formData();
    var riderZips = formZips();
    //callback for api call
    postRides(mS, mE, riderLocations, riderZips);

})
//onclick for map button
$("#").on("click", function () {


})
//onclick for map button

//api post call taking two time parameters and two address
var postRides = function (startT, endT, arrAddress, arrZip) {
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/rides/search/",
        data: JSON.stringify({
            startTime: startT,
            endTime: endT,
            riderStart: arrAddress[0],
            riderEnd: arrAddress[1],
            riderStartZip: arrZip[0],

            riderEndZip: arrZip[1]

        })
    }).then(function (response) {
        console.log(response);
        var rowsToAdd1 = [];
        for (var i = 0; i < response.length; i++) {
            console.log("adding rows")    
            rowsToAdd1.push(rideReturn(response[i]));
                renderPastRideList(rowsToAdd1);
        }
    })
}


//function to build table from response
var rideReturn = function (data) {
    console.log("generating new table row")    
    var newTr = $("<tr>");
        newTr.data("ride", data);
        newTr.append("<td>" + moment(data.departure_time).format('MMMM Do YYYY, h:mm:ss a')+ "</td>");
        newTr.append("<td>" + addRG(data.pick_up_address) + "</td>");
        newTr.append("<td>" + addRG(data.drop_off_address) + "</td>");
        newTr.append("<td>" + data.max_number_riders + "</td>");
        if (data.female_ride_only) {
            newTr.append("<td>Yes</td>");
        } else {
            newTr.append("<td>No</td>");
        }
        newTr.append("<button>Join Ride</button>");
        return newTr;
}

function renderPastRideList(rows) {
    console.log("rendering row")
    if (rows.length) {
        $("#rides-output").prepend(rows);
    }
}

//function to create a map with points and lines on it


//function to retrieve data from form 
var formData = function () {
    var locations = [];
    var locOne = $("#inputAddress").val().trim() + "," +

        $("#inputAddress2").val().trim() + "," + $("#inputCity").val().trim() +
        "," + $("#inputState").val().trim() + "," + $("#inputZip").val().trim()
    var locTwo = $("#destAddress").val().trim() + "," +
        $("#destAddress2").val().trim() + "," + $("#destCity").val().trim() +
        "," + $("#destState").val().trim() + "," + $("#destZip").val().trim()
    riderOrigin = addRG(locOne);
    riderDest = addRG(locTwo);
    locations.push(locOne, locTwo);
    return locations
}

//function to retrieve zipcodes

var formZips = function () {

    var zips = [];
    var zipOne = $("#inputZip").val().trim();
    var zipTwo = $("#destZip").val().trim();
    zips.push(zipOne, zipTwo);
    return zips
}

//helper regex function
var addRG = function (str) {
    return str.replace(/[, ]+/g, " ").trim();
 }
