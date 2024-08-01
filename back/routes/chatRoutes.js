const chatController = require("../controller/chatController");
const express = require("express");
const router = express.Router();
const app = express();

router.post("/sendMessage", chatController.sendMessage);
router.post("/getchatByUser", chatController.getMessageByUser);
router.post("/getchatByVender", chatController.getMessageByVender);
router.post("/unreadMessage", chatController.getUnreadMessage);
router.post("/readMessage", chatController.updateReadMessage);
router.get("/getList/:id", chatController.getList);
router.post('/userChatList' , chatController.userGetList)
    
exports.router = router;
