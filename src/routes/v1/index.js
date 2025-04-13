const express = require('express');
const router = express.Router();

const AeroplaneRoutes = require('./aeroplane-routes')
const city = require('./city-routes');

router.use('/aeroplane',AeroplaneRoutes);
router.use('/city',city);

module.exports=router;