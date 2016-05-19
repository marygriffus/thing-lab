var mongoose = require("./connection");
var thingData = require("./seeds");

var Thing = mongoose.model("Thing");

Thing.remove({}).then(function(){
  Thing.collection.insert(thingData)
  .then(function(){
    process.exit();
  })
})
