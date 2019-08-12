var express = require("express");
var app = express();
var port = 3004;
 
var path = require('path');
var bodyParser = require('body-parser');

app.use('/node_modules',express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/scripts'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/Calculator");
var conn = mongoose.createConnection("mongodb://localhost:27017/Calculator",{ useNewUrlParser: true });
 
var schema = new mongoose.Schema({
    num1: Number,
    num2: Number,
    multiply: Number
   });

  
var Results = conn.model("Results", schema);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   })


app.get("/getData",async(req,res) => { 
    try{
 var result = await   Results.findOne().sort({ field: 'asc', _id: -1 }).limit(1);

 res.status(200).send(result);
    }catch(e){
        res.status(500).json({
            message: 'Error Occured While Processing the Request',
            error: e.message,
          });
    }
})

app.post("/saveData", (req, res) => {
  
    
    var data = new Results(req.body);
    data.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });

   });

   app.listen(port, () => {
    console.log("Server listening on port " + port);
   });
   