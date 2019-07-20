var db = require("../models");
var emailer = require("./emailer.js");

module.exports = function (app) {
    // Get all drivers rides
    app.get("/api/rides", function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.userId = req.query.User_id;
        }
        db.driverRide.findAll({
            where: query,
            include: [db.User]

        }).then(function (dbRides) {
            res.json(dbRides);
        });
    });

    // Get route for retrieving a single ride
    app.get("/api/rides/:id", function (req, res) {
        db.driverRide.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function (dbRides) {
            res.json(dbRides);
        });
    });


    // Create a new ride
    app.post("/api/rides", function (req, res, email) {
        db.driverRide.create(req.body).then(function (dbRides) {
            res.json(dbRides);
            emailer();
            console.log("email sent!!!")
            
        });
    });

    // Delete a ride by id
    app.delete("/api/rides/:id", function (req, res) {
        db.driverRide.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbRides) {
            res.json(dbRides);
        });
    });

    // PUT route for updating rides
    app.put("/api/rides", function (req, res) {
        db.driverRide.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
            res.json(dbPost);
        });
    });
};

