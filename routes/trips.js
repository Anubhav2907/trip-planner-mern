const express = require("express");
const router = express.Router();
const Trip = require("../models/trips");
const tripController = require("../controller/trips");
const { requireLogin } = require("../middleware");

router.get("/", requireLogin, (req, res) => {
  console.log("trips.js: /");
  res.send("reip");
});
router.post("/:id/addtrip", requireLogin, tripController.addTrip);
router.post("/:id/removetrip", requireLogin, tripController.removeTrip);
router.post("/:id/updatetrip", requireLogin, tripController.updateTrip);
module.exports = router;
