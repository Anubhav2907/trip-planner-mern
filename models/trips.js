const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tripSchema = new Schema({
  destination: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Trip", tripSchema);
