var db = require("../models");


module.exports = function (app) {
  app.post("/api/rides/search/", function (req, res) {
    console.log(req.body.startTime);
    db.driverRide.findAll({
        // where: {
        //     departure_time: {
        //         $between: [req.body.startTime, req.body.endTime]
        //         //$between: ["2019-07-16 11:00:00", "2019-07-16 13:00:00"]
        //     }
        // }
    }).then(function(response){
      res.json("t1 " + req.body.startTime + " t2 " + req.body.endTime + " db " + response)
    })
    
  });

};
