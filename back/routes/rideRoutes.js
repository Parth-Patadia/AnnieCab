const rideController = require("../controller/rideController");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/imageUpload");

router.post("/addRide", upload.upload.single("car"), rideController.addRide);
router.get("/getAllRides", rideController.getAllRide);
router.get("/getOneRide/:id", rideController.getOneRide);
router.post("/seachRide", rideController.searchRide);
router.post("/deleteRide", rideController.deleteRide);
router.post("/demo", rideController.demo);
router.get('/venderInquiry/:id' , rideController.venderInquiry);

exports.router = router;
