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
        var log = "Database Error";
        var timestamp = new Date().getTime();
        var server = "Company"
        Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
            if(err){
                res.send(500,{error:'Database Error'});
            }
        res.send(500, { error: "Database Error" });
        });
      }
      var log = "Packet is complete.";
      var timestamp = new Date().getTime();
      var server = "Company"
      Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
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
    Employer.find({empID: employeeId}).exec(function(err, result) {
      var data = result[0];
      var name = data.fullName;
      var tenure = data.tenure;
      // var designation = data.designation;
      var salary = data.salary;
      var email = data.email;

      if (err) {
        res.send(500, { error: "Database Error when retrieving info about employee with ID " + employeeId});
      }
      var endpointURL = address+"?name="+name+"&email="+email+"&id="+mbrID+"&tenure="+tenure+"&salary="+salary+"";
      var log = "MBR id = "+mbrID;
      var timestamp = new Date().getTime();
      var server = "Company"
      Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                  if(err){
              res.send(500,{error:'Database Error'});
          }
      });
      request.get({
        url: endpointURL
      },
        function(error, response, body) {

          if (error) {
            var log = "Something went wrong";
            var timestamp = new Date().getTime();
            var server = "Company"
            Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                              if(err){
                    res.send(500,{error:'Database Error'});
                }
            });
          }
          else {
            var log = "body,response,enpoint=>"+body+response+endpointURL;
            var timestamp = new Date().getTime();
            var server = "Company"
            Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                              if(err){
                    res.send(500,{error:'Database Error'});
                }
            });

            var bodyObject = JSON.parse(body);
            var status = bodyObject.status;

            if("success" == status) {
              res.send("<h2><center>We have successfully forwarded your application.</h2> <h2><center>Please check MBR portal for the application progress.</center></center></h2>");
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
      if (err) {
        var log = "Database Error when retrieving info about employee with ID "
        var timestamp = new Date().getTime();
        var server = "Company"
        Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                      if(err){
                res.send(500,{error:'Database Error'});
            }
        });
        res.send(500, { error: "Database Error when retrieving info about employee with ID " + employeeId});
      }

      if(0 == result.length) {
        res.send("Failed to authenticate the employee with the ID " + employeeId);
      }
          if(data.password === password){
            var log = "Authentic user."
            var timestamp = new Date().getTime();
            var server = "Company"
            Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                              if(err){
                    res.send(500,{error:'Database Error'});
                }
            });
            res.redirect("https://company-portal-frontend.herokuapp.com/employee/authenticate?authenticated=true&empID="+employeeId);
          }
          else{
            var log = "Not authentic user."
            var timestamp = new Date().getTime();
            var server = "Company"
            Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                              if(err){
                    res.send(500,{error:'Database Error'});
                }
            });
            res.redirect("https://company-portal-frontend.herokuapp.com/employee/authenticate?authenticated=false");
          }
      })
    },
};

