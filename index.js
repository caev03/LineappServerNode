/**
 * Created by caev03 on 3/27/16.
 */
var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');
    bodyParser = require("body-parser");
    methodOverride = require("method-override");
    require("./models/usuario.js");
    require("./models/turno.js");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


app.get('/', function(req, res) {
    res.send("Dis the server!");
});

usuarios = require("./controllers/usuarios")(app);
turnos = require("./controllers/turnos")(app);
mongoose.connect('mongodb://localhost/');

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});


