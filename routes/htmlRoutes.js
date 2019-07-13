var db = require("../models");

var path = require("path");

module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.userTest.findAll({}).then(function(dbUser) {
//       res.render("index", {
//         msg: "Welcome!",
//         userTests: dbUser
//       });
//     });
//   });

//   // Load userTest page and pass in an userTest by id
//   app.get("/userTest/:id", function(req, res) {
//     db.userTest.findOne({ where: { id: req.params.id } }).then(function(dbuserTest) {
//       res.render("userTest", {
//         userTest: dbUser
//       });
//     });
//   });

  // index route loads driver.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/driver.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
