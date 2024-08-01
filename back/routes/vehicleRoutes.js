const vehicleController = require("../controller/vehicleController");
const express = require("express");
const app = express();
const router = express.Router();
const upload = require("../middleware/imageUpload");

router.post(
  "/vehicleAdd",
  upload.upload.fields([
    { name: "vehicleImg", maxCount: 2 },
    { name: "puc", maxCount: 2 },
    { name: "vehicleInsurance", maxCount: 2 },
    { name: "vehicleRC", maxCount: 2 },
  ]),
  vehicleController.addVehicle
);
router.get("/getVehicles", vehicleController.getAllvehicles);
router.post("/getVehicleId", vehicleController.getVehicleByVenderId);
router.delete("/deleteVehicle/:id", vehicleController.deleteVehicel);

exports.router = router;
