var db = require("../models");

var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {
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

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });


  app.get("/driver", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/driver.html"));
  });

  // load ride search page
  app.get("/rides", function (req, res) {
    res.render("rider-form");
  })

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // }); 
};