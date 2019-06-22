/**
 * EmployerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var request = require('request');

module.exports = {

  create: function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var designation = req.body.designation;
    var salary = req.body.salary;
    var password = req.body.password;
    var tenure = req.body.tenure;
    var empID = Math.random() * Math.floor(1);
    Employer.create({
      empID: empID,
      email: email,
      fullName: name,
      designation: designation,
      salary: salary,
      tenure: tenure,
      password:password
    }).exec(function(err) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
    });
    res.redirect("https://company-portal-frontend.herokuapp.com/employee/results?empID="+empID);
  },
//BONUS
  list: function(req, res) {
    console.log("sdfsdfsdfsdfsd");
    Employer.find({fullname:"Devanshu Srivastava"}).exec(function(err,emp) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.send(emp);
    });
  },

  authenticateUser: function (req, res) {
    var password=req.body.password;
    var employeeId = req.body.empID;
     Employer.find({empID: employeeId}).exec(function(err, result) {
       var data = result[0];
       if (err) {
         res.send(500, { error: "Database Error when retrieving info about employee with ID " + employeeId});
       }

       if(0 == result.length) {
         res.send("Failed to authenticate the employee with the ID " + employeeId);
       }
         if(data.password === password){
            res.redirect("https://company-portal-frontend.herokuapp.com/employee/authenticate?authenticated=true&empID="+employeeId);
         }
         else{
          res.redirect("https://company-portal-frontend.herokuapp.com/employee/authenticate?authenticated=false");
       }
      })
    },

    supplyMBRinfo:function(req, res) {
      var employeeId = req.body.empID;
      console.log("sdfsdfsdfsdfsd=>"+ employeeId);

      Employer.find({empID: employeeId}).exec(function(err, result) {
        var data = result[0];
        console.log(data)
        var name = data.fullName;
        var tenure = data.tenure;
        var designation = data.designation;
        var salary = data.salary;
        var email = data.email;
        var mbrID = 1;

        if (err) {
          res.send(500, { error: "Database Error when retrieving info about employee with ID " + employeeId});
        }
        var endpointURL = "https://cloud-mortgage-web-service.herokuapp.com/verify?name="+name+"&email="+email+"&id="+mbrID+"&tenure="+tenure+"&salary="+salary+"";
        console.log("URL -> "+endpointURL);
        res.redirect(endpointURL);
       })
    },

    authenticateUser: function (req, res) {
      var password=req.body.password;
      var employeeId = req.body.empID;
      Employer.find({empID: employeeId}).exec(function(err, result) {
        var data = result[0];
        if (err) {
          res.send(500, { error: "Database Error when retrieving info about employee with ID " + employeeId});
        }

        if(0 == result.length) {
          res.send("Failed to authenticate the employee with the ID " + employeeId);
        }
          if(data.password === password){
            res.redirect("https://company-portal-frontend.herokuapp.com/employee/authenticate?authenticated=true&empID="+employeeId);
          }
          else{
            res.redirect("https://company-portal-frontend.herokuapp.com/employee/authenticate?authenticated=false");
          }
      })
    },
};
