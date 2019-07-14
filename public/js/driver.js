$(document).ready(function () {

    // The code below handles the case where we want to get ride posts for a specific driver/user
    // Looks for a query param in the url for user_id

    var url = window.location.search;
    var userId;
    var users;
    var driverName;


    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        // console.log("userId is " + userId);
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

    $("#rideDetail").on("submit", handleFormSubmit);
    

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(envent) {
        event.preventDefault();
        // Wont submit the post if the following info is missing
        if (!$(".departureDateTime").val().trim() || !$("#pickupAddress1").val().trim()
         || !$("#pickupAddress2").val().trim() || !$("#pickupCity").val().trim()
         || !$("#pickupState").val().trim() || !$("#pickupZip").val().trim()
         || !$("#dropoffAddress1").val().trim()|| !$("#dropoffAddress2").val().trim() 
         || !$("#dropoffCity").val().trim()|| !$("#dropoffState").val().trim() 
         || !$("#dropoffZip").val().trim()|| !$("#riderNumber").val().trim()
         ){
         return;
         }

         $('#femaleRideCheck').click(function(){
            //use $(this).prop("checked") which will return a boolean.
            if($(this).prop("checked") == true){ 
                $("#femaleRide").val() = true;
            }
            else if($(this).prop("checked") == false){
                $("#femaleRide").val() = false;
            }
        });

       // Constructing a newPost object to hand to the database
       var newRide = {
           departure_time: $(".departureDateTime").val().trim(),

           pick_up_address: $("#pickupAddress1").val().trim() + "," + 
           ("#pickupAddress2").val().trim() + "," + $("#pickupCity").val().trim() 
           + "," + $("#pickupState").val().trim() + "," + $("#pickupZip").val().trim(),

           drop_off_address: $("#dropoffAddress1").val().trim() + "," + 
           ("#dropoffAddress2").val().trim() + "," + $("#dropoffCity").val().trim() 
           + "," + $("#dropoffState").val().trim() + "," + $("#dropoffZip").val().trim(),

           max_number_riders: $("#riderNumber").val().trim(),

           female_ride_only:$("#femaleRide").val(),

           userTestId: userId
       }

       function submitRide()





    }





})