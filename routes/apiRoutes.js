var db = require("../models");
var moment = require('moment');
var riderLogic = require("./riderLogic")


module.exports = function (app) {
  app.post("/api/rides/search/", function (req, res) {
    db.driverRide.findAll({
    }).then(function(response){
      var ridePosTime = riderLogic.timeMath(response, req.body.startTime, req.body.endTime);
      riderLogic.compZips(req.body.riderStartZip, req.body.riderEndZip, ridePosTime)
      res.json(ridePosTime);
    })    
  });
};