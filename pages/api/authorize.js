require("dotenv").config();
const request = require("request");

export default async function (req, res) {
  // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
  if (!req.query.code) {
    res.status(500);
    res.send({ Error: "Something went wrong!" });
    console.log("Something went wrong! Looks like we're not getting code.");
  } else {
    // If it's there...

    var options = {
      uri:
        "https://slack.com/api/oauth.v2.access?code=" +
        req.query.code +
        "&client_id=" +
        process.env.SLACK_CLIENT_ID +
        "&client_secret=" +
        process.env.SLACK_CLIENT_SECRET +
        "&redirect_uri=" +
        process.env.SLACK_REDIRECT_URI,
      method: "GET",
    };

    request(options, (error, response, body) => {
      var JSONresponse = JSON.parse(body);
      if (!JSONresponse.ok) {
        console.log(JSONresponse);
        res
          .send("Error encountered: \n" + JSON.stringify(JSONresponse))
          .status(200)
          .end();
      } else {
        console.log(JSONresponse);
        res.send(
          "<p>Success! <a href='../'>Click here</a> to go back to the homepage if you are not redirected automatically.</p> <meta http-equiv='refresh' content='3;url=../' />"
        );
      }
    });
  }
}
