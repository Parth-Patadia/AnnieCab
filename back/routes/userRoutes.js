const userController = require("../controller/userController");
const upload = require("../middleware/imageUpload");
const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch("/updateUser/:id", userController.updateUser);
router.patch("/updatePassword/:id", userController.updatepassword);
router.delete("/delete/:id", userController.deleteUser);
router.get("/getAlldata", userController.getAlldata);
router.get("/userdata/:id", userController.getUserByID);
router.get("/loginstatus/:id", userController.userBlock);
router.post(
  "/profileUpdate/:id",
  upload.upload.single("profile"),
  userController.updateProfile
);

exports.router = router;
