var db = require("../models");


module.exports = function (app) {


  // // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Get rides between two times
  app.get("/api/rides/search/:id/:id1", function (req, res) {
    // db.Rides.findAll({
    //     where: {
    //         departure_time: {
    //             $between: [moment(id).format]
    //         }
    //     }
    // })
    res.json("id " + req.params.id + " id2 " + req.params.id1)
})

  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

};
