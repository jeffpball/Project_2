$(document).ready(function () {

    // The code below handles the case where we want to get ride posts for a specific driver/user
    // Looks for a query param in the url for user_id

    var url = window.location.search;
    var userId;
    var users;
    var driverName;
    var female_ride_only;


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

    $("#rideForm").on("click", handleFormSubmit);
    $('input[type="checkbox"]').click(function(){
        if($(this).prop("checked") == true){
            female_ride_only = true;
        }
        else if($(this).prop("checked") == false){
            female_ride_only = false;
        }
    });


    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(envent) {
        event.preventDefault();
        console.log("submit success!!")
        // // Wont submit the post if the following info is missing
        // if (!$(".departureDateTime").val() || !$("#pickupAddress1").val().trim()
        //     || !$("#pickupCity").val().trim() ||
        //     !$("#pickupState").val().trim() || !$("#pickupZip").val().trim() ||
        //     !$("#dropoffAddress1").val().trim() || !$("#dropoffAddress2").val().trim() ||
        //     !$("#dropoffCity").val().trim() || !$("#dropoffState").val().trim() ||
        //     !$("#dropoffZip").val().trim() || !$("#riderNumber").val()
        // ) {
        //     return;
        // }

        // Constructing a newPost object to hand to the database
        // var newRide = {
        //     departure_time: $(".departureDateTime").val(),

        //     pick_up_address: $("#pickupAddress1").val().trim() + "," +
        //         $("#pickupAddress2").val().trim() + "," + $("#pickupCity").val().trim() +
        //         "," + $("#pickupState").val().trim() + "," + $("#pickupZip").val().trim(),

        //     drop_off_address: $("#dropoffAddress1").val().trim() + "," +
        //         $("#dropoffAddress2").val().trim() + "," + $("#dropoffCity").val().trim() +
        //         "," + $("#dropoffState").val().trim() + "," + $("#dropoffZip").val().trim(),

        //     max_number_riders: $("#riderNumber").val(),

        //     female_ride_only: $("#femaleRide").val(),

        //     userTestId: userId
        // };


        // submitRide(newRide);
        // window.location.reload();
        // console.log(newRide)

        var departure_time = $("#datetimepicker4").find("input").val();
        var pick_up_address = $("#pickupAddress1").val().trim() + "," +
            $("#pickupAddress2").val().trim() + "," + $("#pickupCity").val().trim() +
            "," + $("#pickupState").val().trim() + "," + $("#pickupZip").val().trim();

        var drop_off_address = $("#dropoffAddress1").val().trim() + "," +
            $("#dropoffAddress2").val().trim() + "," + $("#dropoffCity").val().trim() +
            "," + $("#dropoffState").val().trim() + "," + $("#dropoffZip").val().trim();

        var max_number_riders = $("#riderNumber").val();
        

        console.log(departure_time);
        console.log(pick_up_address);
        console.log(drop_off_address);
        console.log(max_number_riders);
        console.log(female_ride_only);

        



    }

    function submitRide(ride) {
        $.post("/api/rides", ride, function (data) {
            // console.log(departure_time);
        });
    }
})