$("#sub").on("click", function(){
    //retrieve data from timepickers
    var windowStart = $("#datetimepicker4").find("input").val();
    var windowEnd = $("#datetimepicker5").find("input").val();
    //initialze moment objectss
    var mS = moment(windowStart).format('X');
    var mE = moment(windowEnd).format('X');
    console.log(mS, mE);
    //callback for api call
    getRides(mS, mE);
})

//api get call taking two time parameters
var getRides = function (start, end) {
    var timeQ = start + "/" + end 
    $.get("/api/rides/search/" + timeQ, function (data) {
        console.log("yay" + data);
    })
}