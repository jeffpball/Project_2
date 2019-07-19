var db = require("../models");
var moment = require('moment');
var riderLogic = require("./riderLogic")


module.exports = function (app) {
  app.post("/api/rides/search/", function (req, res) {
    console.log(req.body.startTime);
    db.driverRide.findAll({
    }).then(function(response){
      var ridePosTime = riderLogic.timeMath(response, req.body.startTime, req.body.endTime);
      res.json(ridePosTime);
      for(var i = 0; i < ridePosTime.length; i++){
        console.log(riderLogic.addRG(req.body.riderStart), riderLogic.addRG(req.body.riderEnd), riderLogic.addRG(ridePosTime[i].pick_up_address), riderLogic.addRG(ridePosTime[i].drop_off_address));
        riderLogic.distanceCall(riderLogic.addRG(req.body.riderStart), riderLogic.addRG(req.body.riderEnd), riderLogic.addRG(ridePosTime[i].pick_up_address), riderLogic.addRG(ridePosTime[i].drop_off_address))
      }
      
    })
    
  });

};
