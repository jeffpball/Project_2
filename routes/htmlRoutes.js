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

  // index routes loads driver.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/driver.html"));
  });

  app.get("/driver", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/driver.html"));
  });

  app.get("/rides", function (req, res) {
    res.render("rider-form");
   })


  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
// load ride search page
app.get("/rides", function (req, res) {
  res.render("rider-form");
})

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  }); 
};
