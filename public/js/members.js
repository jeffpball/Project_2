$(document).ready(function () {

    // The code below handles the case where we want to get ride posts for a specific user/user
    // Looks for a query param in the url for user_id

    var url = window.location.search;
    var userId;
    var userName;
    var upcomingRideList = $(".upcomingRides");
    var PastRideList = $(".pastRides");
    // trim ",," from the address
     var addRG = function (str) {
        return str.replace(/[, ]+/g, " ").trim();
     }

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var curretDateTime = date+' '+time;

    curretDateTime = moment(curretDateTime).format("X");

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
        newTr.append("<td>" + moment(rideData.departure_time).format('MMMM Do YYYY, h:mm:ss a')+ "</td>");
        newTr.append("<td>" + addRG(rideData.pick_up_address) + "</td>");
        newTr.append("<td>" + addRG(rideData.drop_off_address) + "</td>");
        newTr.append("<td>" + rideData.max_number_riders + "</td>");
        if (rideData.female_ride_only) {
            newTr.append("<td>Yes</td>");
        } else {
            newTr.append("<td>No</td>");
        }
        newTr.append("<button>Map Button</button>");
        return newTr;
    }

    // Function for retrieving authors and getting them ready to be rendered to the page
    $.get("/api/users/" + userId, function (data) {
        var rowsToAdd1 = [];
        var rowsToAdd2 = [];

        var rideData = data.driverRide;
        for (var i = 0; i < rideData.length; i++) {
            var departureTime = moment (rideData[i].departure_time).format("X");
            console.log(departureTime);
            if (departureTime < curretDateTime ) {
                rowsToAdd2.push(createRideRow(rideData[i]));
                renderPastRideList(rowsToAdd2);

            } else {
                rowsToAdd1.push(createRideRow(rideData[i]));
                renderUpcomingRideList(rowsToAdd1);
            }

        }

    });


    // A function for rendering the list of rides to the page
    function renderUpcomingRideList(rows) {
        upcomingRideList.children().not(":last").remove();
        // authorContainer.children(".alert").remove();
        if (rows.length) {
            // console.log(rows);
            upcomingRideList.prepend(rows);
        }
    }


    function renderPastRideList(rows) {
        // PastRideList.children().not(":last").remove();
        // authorContainer.children(".alert").remove();
        if (rows.length) {
            // console.log(rows);
            PastRideList.prepend(rows);
        }
    }

    console.log(curretDateTime);

})

