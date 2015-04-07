var express = require('express');
var router = express.Router();

//var auth = require('./auth.js');
var info = require('./info.js');

router.get('/exportValueToday', info.exportValueToday);
//router.get('/exportMeetwaarden/:meetopstelling', info.exportMeetwaarden);
router.get('/getDaily', info.getDaily);
router.get('/getMonthly', info.getMonthly);
router.get('/getYearly', info.getYearly);

router.post('/insertValue', info.insertValue);

module.exports = router;
