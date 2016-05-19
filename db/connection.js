var mongoose = require("mongoose");

var SubThingSchema = new mongoose.Schema(
  {
    thing: String
  }
)

var ThingSchema = new mongoose.Schema(
  {
    thing: String,
    nestedThings: [SubThingSchema]
  }
);


mongoose.model("Thing", ThingSchema);
mongoose.model("SubThing", SubThingSchema);
mongoose.connect("mongodb://localhost/thingnester");

var seedData = require("./seeds.json");

module.exports = mongoose;
