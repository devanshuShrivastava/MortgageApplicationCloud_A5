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
    res.redirect("http://localhost:1337/employee/results?empID="+empID);
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
            res.redirect("http://localhost:1337/employee/authenticate?authenticated=true&empID="+employeeId);
         }
         else{
          res.redirect("http://localhost:1337/employee/authenticate?authenticated=false");
       }
      })
    },
    supplyMBRinfo:function(req, res) {
      // console.log("sdfsdfsdfsdfsd");
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

        // if(0 == result.length) {
        //   res.send("Failed to authenticate the employee with the ID " + employeeId);
        // }
        //   if(data.password === password){
        //      res.redirect("https://cloud-mortgage-web-service.herokuapp.com/verify?name=Nirav&email=niravs200@dal.ca&id=1&tenure=2&salary=35000");
        //   }
        //   else{
        //    res.redirect("http://localhost:1337/employee/authenticate?authenticated=false");
        // }
       })
    },
// ,
//   'authenticate-and-send-info-to-broker': function (req, res) {
//    // var mortgageApplicationNum =
//    // var mortgageBrockerApiUrl = req.body.password;
//    var password=req.body.password;
//    console.log(password);
//     var employeeId = req.body.empID;

//     Employer.find({empID: employeeId}).exec(function(err, result) {
//       if (err) {
//         res.send(500, { error: "Database Error when retrieving info about employee with ID " + employeeId});
//       }

//       if(0 == result.length) {
//         res.send("Failed to authenticate the employee with the ID " + employeeId);
//       }
//       else{
//         res.redirect("http://localhost:1337/supply");
//       }
//       result[0].applicationNumber = mortgageApplicationNum;

//       request.get({
//         type: "POST",
//         // url: mortgageBrockerApiUrl,
//         url: 'https://b00806895-cloud-a3-backend.herokuapp.com/students/students-and-books895',
//         data: JSON.stringify(result[0]),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json"},
//         function(error, response, body) {
//           if (error) {
//             console.log(error);
//           }
//           else {
//             res.send(response);
//           }
//       })
//     });
//   }
};
