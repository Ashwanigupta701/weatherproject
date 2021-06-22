const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();
let y;
var c;
app.use(bodyparser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req1, res1) {
  y = req1.body.city;

  const url = "https://api.openweathermap.org/data/2.5/weather?appid=efac8617a1eba9b12ecee6bc83a2168c&units=imperial&q=" + y;
  https.get(url, function(response) {
    console.log(response.statusCode);
     c=response.statusCode;
     if(c==404)
     {
       res1.sendfile(__dirname +"/failure.html");   
     }
     else {
       response.on("data", function(data) {

        const w = JSON.parse(data)
        console.log(w.main.temp);
        const img = w.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/" + img + "@2x.png";
        res1.write("<h1>The temperature of " + y + " is " + w.main.temp + " f.</h1>");
        res1.write("<h1>The Weather discription is " + w.weather[0].description + "</h1>");
        res1.write("<h1>Image discription </h1><img src=" + imgurl + ">");
        res1.send();
      });
     }


  });

});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT||3002, function() {
  console.log("server is running on port 3002");
});
