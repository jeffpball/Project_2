var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.userTest.findAll({
      include: [db.driverRide]
    }).then(function(dbuserTest) {
      res.json(dbuserTest);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.userTest.findOne({
      where: {
        id: req.params.id
      },
      include: [db.driverRide]
    }).then(function(dbuserTest) {
      res.json(dbuserTest);
    });
  });

  app.post("/api/users", function(req, res) {
    db.userTest.create(req.body).then(function(dbuserTest) {
      res.json(dbuserTest);
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
