$(document).ready(function () {

    // The code below handles the case where we want to get ride posts for a specific user/user
    // Looks for a query param in the url for user_id

    var url = window.location.search;
    var userId;
    var userName;


    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getUserName();
    }


    function getUserName() {
        $.get("/api/users/" + userId, function (data) {
            userName = data.userName;
            console.log(userName);
            $("#username").append("Welcome " + userName + " ! &#128522;");

        })
    }

    $("#createRide").on("click", function () {
        window.location.replace("/driver/?user_id=" + userId);

    })

    $("#findRide").on("click", function () {

        window.location.replace("/rides/?user_id=" + userId);

    })

    function createRideRow(rideData) {
        var newTr = $("<tr>");
        newTr.data("ride", rideData);
        newTr.append("<td>" + rideData.departure_time + "</td>");
        newTr.append("<td>" + rideData.pick_up_address +"</td>");
        newTr.append("<td>" + rideData.drop_off_address + "</td>");
        newTr.append("<td>" + rideData.max_number_riders + "</td>");
        if (rideData.female_ride_only) {
            newTr.append("<td>Yes</td>");
        } else {
            newTr.append("<td>No</td>");
        }

        return newTr;
    }

    // Function for retrieving authors and getting them ready to be rendered to the page
    $.get("/api/users/" + userId, function (data) {
            var rideData = data.driverRide;
            for (var i = 0; i < rideData.length; i++) {
                createRideRow(rideData[i]);
                // console.log(rideData[i]);
            }
        });
    










})