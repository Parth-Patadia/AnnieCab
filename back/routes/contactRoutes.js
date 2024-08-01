const contactController = require('../controller/contactController');
const express = require('express');
const app = express();
const router = express.Router();

router.post('/sendContact' , contactController.sendContact);
router.get('/getContact' , contactController.getContact);

exports.router = router ;