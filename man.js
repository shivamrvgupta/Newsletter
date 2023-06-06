const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

const apiKey = "b6865ac4875820f75700a6ebda101417-us21";
const audienceKey = "96e137b33e";
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.Fname;
  var lastName = req.body.Lname;
  var email = req.body.Email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const urlData = `https://us21.api.mailchimp.com/3.0/lists/96e137b33e`;
  const options = {
    method: "POST",
    auth:"shivam1:b6865ac4875820f75700a6ebda101417-us21",
  };
  const request = https.request(urlData, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("server is listening");
});
