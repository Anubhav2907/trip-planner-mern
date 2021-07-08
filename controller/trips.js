const User = require("../models/users");
const Trip = require("../models/trips");
module.exports.addTrip = async (req, res) => {
  const { id } = req.params;
  const { comment, description, start_date, end_date } = req.body;
  const user = await User.findById(id);
  const trip = new Trip({
    comment,
    description,
    start_date,
    end_date,
  });
  await trip.save();
  user.trips.push(trip._id);
  res.json({
    message: "Trip successfully created!",
    trip,
  });
};
module.exports.gettrips = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    message: "Trip successfully created!",
    trips: user.trips,
  });
};
module.exports.updateTrip = async (req, res) => {
  const { id } = req.params;
  const { comment, description, start_date, end_date } = req.body;
  const trip = await Trip.findById(id);
  trip.comment = comment;
  trip.description = description;
  trip.start_date = start_date;
  trip.end_date = end_date;
  await trip.save();
  res.json({
    message: "Trip successfully updated!",
    trip,
  });
};
module.exports.removeTrip = async (req, res) => {
  const { id } = req.params;
  const trip = await Trip.findById(id);
  await trip.remove();
  res.json({
    message: "Trip successfully deleted!",
  });
};
