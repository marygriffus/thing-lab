var express = require("express");
var hbs = require("express-handlebars");
var parser = require("body-parser");
var mongoose = require("./db/connection");

var Thing = mongoose.model("Thing")

var app = express();

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "views",
  layoutsDir: "views",
  defaultLayout: "main"
}));

app.use("/public", express.static("public"));
app.use(parser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/things", function(req, res){
  Thing.find({}).then(function(things){
    res.render("things-index", {
      things: things
    });
  });
});

app.get("/things/:thing", function(req, res){
  Thing.findOne({thing: req.params.thing})
  .then(function(thing){
    res.render("thing-show", {
      thing: thing
    })
  })
})

app.post("/things", function(req, res){
  Thing.create(req.body.thing)
  .then(function(thing){
    res.redirect("/things/" + thing.thing);
  });
});

app.post("/things/:thing/add", function(req, res){
  Thing.findOne({thing: req.params.thing}).then(function(thing){
    thing.nestedThings.push({thing: req.body.subthing.thing})
    thing.save().then(function(thing){
      res.redirect("/things/" + thing.thing)
    })
  });
});

app.post("/things/:thing", function(req, res){
  Thing.findOneAndUpdate({thing: req.params.thing}, req.body.thing, {new: true})
  .then(function(thing){
    res.redirect("/things/" + thing.thing);
  });
});

app.listen(3001, function(){
  console.log("Connected");
});
