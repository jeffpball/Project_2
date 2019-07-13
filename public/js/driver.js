$(document).ready(function () {

    // The code below handles the case where we want to get ride posts for a specific driver/user
    // Looks for a query param in the url for user_id

    var url = window.location.search;
    var userId;
    var users;
    var driverName;

    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        console.log("userId is " + userId);
        getUserName();
    }

    function getUserName(author) {
        $.get("/api/users", function (data) {
            // console.log(data);
            users = data;
            driverName = users[userId - 1].userName;
            // console.log(driverName);
            $(".driverName").append(driverName);

        })
    }






})