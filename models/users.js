const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  trips: [
    {
      type: Schema.Types.ObjectId,
      ref: "trips",
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
