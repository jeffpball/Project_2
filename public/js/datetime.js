$("#sub").on("click", function () {
    //retrieve data from timepickers
    var windowStart = $("#datetimepicker4").find("input").val();
    var windowEnd = $("#datetimepicker5").find("input").val();
    //initialze moment objects
    var mS = moment(windowStart).toDate();
    var mE = moment(windowEnd).toDate();
    var riderLocations = formData();
    //callback for api call
    postRides(mS, mE, riderLocations);
})

//api post call taking two time parameters and two address
var postRides = function (startT, endT, arrAddress) {
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
            riderEnd: arrAddress[1]
        })
    }).then(function(response){
        console.log(response);
    })
}

//function to retrieve data from form 
var formData = function(){
    var locations = [];
    var locOne = $("#inputAddress").val().trim() + "," +
    $("#inputAddress2").val().trim() + "," + $("#inputCity").val().trim() +
    "," + $("#inputState").val().trim() + "," + $("#inputZip").val().trim()

    var locTwo = $("#destAddress").val().trim() + "," +
    $("#destAddress2").val().trim() + "," + $("#destCity").val().trim() +
    "," + $("#destState").val().trim() + "," + $("#destZip").val().trim()

    locations.push(locOne);
    locations.push(locTwo);
    
    return locations

}