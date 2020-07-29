const express = require("express");
const request = require("request")
const bodyParser = require("body-parser")
const https = require("https")

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                stats: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName

                }
            }
        ]
    }

    const url = "https://us10.api.mailchimp.com/3.0/lists/836ae44284"

    const options = {
        method: "POST",
        auth: "tim1:3d3ed52c0352a8912912b5700f6a7f60-us10"
    }

    const jsonData = JSON.stringify(data)

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();

})

app.listen(process.env.PORT || 3000, function(){
    console.log("server running on port 3000")
})

// Key
// 3d3ed52c0352a8912912b5700f6a7f60-us10

// list ID
// 836ae44284

