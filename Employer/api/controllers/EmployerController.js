/**
 * EmployerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var request = require('request');

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

  // should this add function be a part of the front end application?
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
  },

  'authenticate-and-send-info-to-broker': function (req, res) {
    var mortgageApplicationNum = req.query.mortgageApplicationNum;
    var mortgageBrockerApiUrl = req.query.mortgageBrockerApiUrl;
    var employeeId = req.query.employeeId;

    Employer.find({empID: employeeId}).exec(function(err, result) {
      if (err) {
        res.send(500, { error: "Database Error when retrieving info about employee with ID " + employeeId});
      }

      if(0 == result.length) {
        res.send("Failed to authenticate the employee with the ID " + employeeId);
      }

      result[0].applicationNumber = mortgageApplicationNum;

      request.get({ 
        type: "POST",
        // url: mortgageBrockerApiUrl,
        url: 'https://b00806895-cloud-a3-backend.herokuapp.com/students/students-and-books895',
        data: JSON.stringify(result[0]),
        contentType: "application/json; charset=utf-8",
        dataType: "json"},
        function(error, response, body) {
          if (error) {
            console.log(error);
          }
          else {
            res.send(response);
          }
      })
    });
  }
};
