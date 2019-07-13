var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.userTest.findAll({
      include: [db.driverRide]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.userTest.findOne({
      where: {
        id: req.params.id
      },
      include: [db.driverRide]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.driverRide("/api/users", function(req, res) {
    db.userTest.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.userTest.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
