const router = require('express').Router();

const { authN } = require('../../middelwares/authN');
const { getReadings, getReading } = require('./reading.controllers');

router.get('/reads', getReadings);
router.get('/read/:id', authN, getReading);

module.exports = router;
