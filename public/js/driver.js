$(document).ready(function () {

    // The code below handles the case where we want to get ride posts for a specific driver/user
    // Looks for a query param in the url for user_id

    var url = window.location.search;
    var userId;
    var driverName = $(".driverName");
    var rides;

    // if (url.indexOf("?user_id=") !== -1) {
    //     userId = url.split("=")[1];
    //     getRides(userId);
    //     console.log("userId"+userId);
    // }


    // function getRides(user) {
    //     userId = user || "";
    //     if (userId) {
    //         userId = "/?user_id=" + userId;
    //     }
    //     $.get("/api/rides" + userId, function (data) {
    //         // console.log("Rides", data);
    //         rides = data;
    //         driverName.append(data.userTest.userName)

    //     });
    // }

        if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        console.log("userId is "+userId);
    }







})