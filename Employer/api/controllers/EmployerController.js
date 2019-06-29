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
    var empID = Math.floor(Math.random() * 200);
    console.log(empID)
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
        // writeLogs("Database Error")
        res.send(500, { error: "Database Error" });
      }
      var log = "Data sent from company."
      var timestamp = new Date().getTime();
        Logger.create({time:timestamp,log:log}).exec(function(err){
          if(err){
              res.send(500,{error:'Database Error'});
          }
      res.redirect("https://company-portal-frontend.herokuapp.com/employee/results?empID="+empID);
      });
    });

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
  supplyMBRinfo:function(req, res) {
    var employeeId = req.body.empID;
    var address = req.body.address;
    var mbrID = req.body.mbrID;

    console.log("sdfsdfsdfsdfsd=>"+ employeeId);

    Employer.find({empID: employeeId}).exec(function(err, result) {
      var data = result[0];
      console.log(data)
      var name = data.fullName;
      var tenure = data.tenure;
      // var designation = data.designation;
      var salary = data.salary;
      var email = data.email;
      console.log(mbrID + "Hello");

      if (err) {
        // writeLogs( "Database Error when retrieving info about employee with ID " + employeeId)
        res.send(500, { error: "Database Error when retrieving info about employee with ID " + employeeId});
      }
      var endpointURL = address+"?name="+name+"&email="+email+"&id="+mbrID+"&tenure="+tenure+"&salary="+salary+"";
      // writeLogs("MBR-id: "+mbrID )

      request.get({
        url: endpointURL
      },
        function(error, response, body) {
          // writeLogs(endpointURL);

          if (error) {
            // writeLogs(error);
          }
          else {
            // writeLogs(body);
            // writeLogs(response);
            // writeLogs(endpointURL);

            var bodyObject = JSON.parse(body);
            var status = bodyObject.status;

            if("success" == status) {
              res.send("<h2>We have successfully forwarded your application.</h2> <h2>Please check MBR portal for the application progress.</h2>");
            }
            else {
              res.send("<h2>We have forwarded your application, but some error happened on the MBR side.</h2> <h2> MBR response is: "+body + "</h2>");
            }
          }
      })
    });
  },

  authenticateUser: function (req, res) {
    var password=req.body.password;
    var employeeId = req.body.empID;
    Employer.find({empID: employeeId}).exec(function(err, result) {
      var data = result[0];
      console.log("debanshusdajfbnasdkjfbaljks"+data);
      if (err) {
        // writeLogs("Database Error when retrieving info about employee with ID ")
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
    // writeLogs: function(log) {
    //   var timestamp = new Date().getTime();
    //   Logger.create({time:timestamp,log:log}).exec(function(err){
    //     if(err){
    //         res.send(500,{error:'Database Error'});
    //     }
    // });
    // },
};
