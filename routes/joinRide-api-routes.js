var db = require("../models");
var passport = require("../config/passport");
var emailer = require("./emailer.js");

module.exports = function (app) {
    // Get all riders' rides
    app.get("/api/rider/rides", function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.userId = req.query.User_id;
        }
        db.joinRide.findAll({
            where: query,
            include: [db.User],
            include: [db.driverRide]

        }).then(function (dbRides) {
            res.json(dbRides);
        });
    });

    // Get route for retrieving a single ride
    app.get("/api/rider/rides/:id", function (req, res) {
        db.joinRide.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User],
            include: [db.driverRide]
        }).then(function (dbRides) {
            res.json(dbRides);
        });
    });

    app.get("/api/rider/:id", function (req, res) {
        db.joinRide.findOne({
          where: {
            UserId: req.params.id
          },
          include: [db.driverRide]
        }).then(function (dbRider) {
          res.json({
            riderid: dbRider.UserId,
            driverRide: dbRider.driverRide
    
          });
        });
      });
    

    // Create a new ride
    app.post("/api/rider/rides", function (req, res) {
        db.joinRide.create(req.body).then(function (dbRides) {
            res.json(dbRides);
            // emailer(email);
            // console.log("email sent!!!")
            
        });
    });

    // Delete a ride by id
    app.delete("/api/rider/rides/:id", function (req, res) {
        db.joinRide.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbRides) {
            res.json(dbRides);
        });
    });

    // PUT route for updating rides
    app.put("/api/rider/rides", function (req, res) {
        db.joinRide.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
            res.json(dbPost);
        });
    });
};
