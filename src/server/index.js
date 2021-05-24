let projectData = {};
var path = require('path')
const express = require('express')


const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//cors
const cors = require("cors");
app.use(cors());
app.use(express.static('src/client'))
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
app.get("/getData", (req, res) => {
    res.send(projectData);
  });
  
  app.post("/addWeather", (req, res) => {
    console.log(req.body);
    projectData = req.body;
    res.send(projectData);
  });