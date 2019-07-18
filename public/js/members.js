$(document).ready(function(){

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
        $.get("/api/users/"+userId, function (data) {
                userName = data.userName;   
                console.log(userName);         
            $("#username").append("Welcome " + userName +" ! &#128522;");

        })
    }

    $("#setRide").on("click", function(){
      window.location.replace("/driver/?user_id=" + userId);

    } )











})