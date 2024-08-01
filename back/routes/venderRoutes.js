const venderController = require("../controller/venderController");
const express = require("express");
const app = express();
const router = express.Router();
const upload = require("../middleware/imageUpload");

router.post("/register", venderController.venderSingup);
router.post("/login", venderController.login);
router.patch("/update/:id", venderController.updateVender);
router.post("/updatePassword/:id", venderController.updatepassword);
router.delete("/deleteVender/:id", venderController.deleteVender);
router.get("/allVenders", venderController.getAllvenders);
router.get("/getVender/:id", venderController.getVenderByID);
router.post(
  "/venderProfile/:id",
  upload.upload.single("venderProfile"),
  venderController.updateProfile
);
router.get("/loginstatus/:id", venderController.venderBlock);
router.post(
  "/uploadDocument/:id",
  upload.upload.fields([
    { name: "aadharimg", maxCount: 2 },
    { name: "lienceImg", maxCount: 2 },
  ]),
  venderController.uploadDocument
);
router.post("/documentApproved/:id", venderController.approved);

exports.router = router;
