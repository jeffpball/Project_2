module.exports = {
    getRides: function (start, end) {
        $.get("api/rides/search", function (data) {
            console.log("yay" + data);
        })
    }
}