
$(document).ready(function () {

    // The code below handles the case where we want to get ride posts for a specific driver/user
    // Looks for a query param in the url for user_id

    var url = window.location.search;
    var userId;
    var driverName;
    var female_ride_option = false;


    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getUserName();
    }
    

    function getUserName() {
        $.get("/api/users/"+userId, function (data) {
                driverName = data.userName;
                console.log(driverName);
            
            $(".driverName").append(driverName);

        })
    }


    $("#rideForm").on("click", handleFormSubmit);
    $('input[type="checkbox"]').click(function(){
        if($(this).prop("checked") == true){
            female_ride_option = true;
        }
        else if($(this).prop("checked") == false){
            female_ride_option = false;
        }
    });


    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(envent) {
        event.preventDefault();
        console.log("submit success!!")
        // Wont submit the post if the following info is missing
        if (!$("#datetimepicker4").find("input").val() || !$("#pickupAddress1").val().trim()
            || !$("#pickupCity").val().trim() ||!$("#pickupState").val().trim() 
            || !$("#pickupZip").val().trim() ||!$("#dropoffAddress1").val().trim() || 
            !$("#dropoffCity").val().trim() || !$("#dropoffState").val().trim() ||
            !$("#dropoffZip").val().trim() || !$("#riderNumber").val()
        ) {
            return;
        }
        
        // Constructing a newPost object to hand to the database
        var newRide = {

            departure_time : moment($("#datetimepicker4").find("input").val()).toDate(),

            pick_up_address: $("#pickupAddress1").val().trim() + "," +
                $("#pickupAddress2").val().trim() + "," + $("#pickupCity").val().trim() +
                "," + $("#pickupState").val().trim() + "," + $("#pickupZip").val().trim(),

            drop_off_address: $("#dropoffAddress1").val().trim() + "," +
                $("#dropoffAddress2").val().trim() + "," + $("#dropoffCity").val().trim() +
                "," + $("#dropoffState").val().trim() + "," + $("#dropoffZip").val().trim(),

            max_number_riders: $("#riderNumber").val(),

            female_ride_only: female_ride_option,
            //driverrides foreign key (user id)
            UserId: userId
        };


        submitRide(newRide);

    }

    function submitRide(ride) {
        $.post("/api/rides", ride, function (data) {
            // console.log("Data stored in mysql " + data);
            window.location.replace("/members/?user_id=" + userId);
        });

    }


})