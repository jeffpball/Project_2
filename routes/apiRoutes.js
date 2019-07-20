var db = require("../models");
var moment = require('moment');
var riderLogic = require("./riderLogic")


module.exports = function (app) {
  app.post("/rides/api/rides/search/", function (req, res) {
    console.log(req.body.startTime);
    db.driverRide.findAll({
    }).then(function(response){
      var ridePosTime = riderLogic.timeMath(response, req.body.startTime, req.body.endTime);
      riderLogic.compZips(req.body.riderStartZip, req.body.riderEndZip, ridePosTime)
      res.json(ridePosTime);
    })    
  });
};