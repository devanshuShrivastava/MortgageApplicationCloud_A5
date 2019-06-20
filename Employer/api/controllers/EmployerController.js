/**
 * EmployerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    console.log(req.query);
    var name = req.query.fullName;
    var designation = req.query.designation;
    var salary = req.query.salary;
    var tenure = req.query.tenure;
    var empID = Math.random() * Math.floor(10);
    Employer.create({
      empID: empID,
      fullName: name,
      designation: designation,
      salary: salary,
      tenure: tenure
    }).exec(function(err, employee) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
    });
    res.send("Database updated !");
  },
  add: function(req, res) {
    res.view("pages/add");
  },
  list: function(req, res) {
    console.log("sdfsdfsdfsdfsd");
    Employer.find({fullname:"devanshu"}).exec(function(err) {
      // console.log(employee);
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.send('ad');
    });
  }
};
