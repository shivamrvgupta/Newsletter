    const express = require("express");
    const bodyParser = require("body-parser");
    const request = require("request");
    const nodemailer = require('nodemailer');
    const https = require("https");
    const app = express();

    const apiKey = "b6865ac4875820f75700a6ebda101417-us21";
    const audienceKey = "96e137b33e";


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shivamrvgupta@gmail.com',
          pass: 'vryonzxsfexgzihc'
        }
      });

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static("public"));

    app.get("/", function (req, res) {
        res.sendFile(__dirname + "/signup.html");
    });


    app.post("/", function (req, res) {
        var firstName = req.body.Fname;
        var lastName = req.body.Lname;
        var email = req.body.Email;
    
        const mailOptions = {
            from: 'shivamrvgutpa@gmail.com',
            to: email ,
            subject: 'Hello from The Yellow Strawberry',
            text: 'This is the plain text version of the email',
            html: '<p>This is the HTML version of the email</p>'
          };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error occurred:', error.message);
              res.sendFile(__dirname + "/failure.html")
            } else {
              console.log('Email sent successfully!');
              res.sendFile(__dirname + "/success.html")
              console.log('Message ID:', info.messageId);
            }
          });
    });


    app.post("/failure", function(req,res) {
        res.redirect("/")
    })

    app.listen(3000, function () {
        console.log("server is listening");
    });
