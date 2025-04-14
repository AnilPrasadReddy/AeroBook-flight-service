const express = require('express');
const router = express.Router();

const AeroplaneRoutes = require('./aeroplane-routes')
const CityRoutes = require('./city-routes');
const AirportRoutes = require('./airport-routes');
router.use('/aeroplane',AeroplaneRoutes);
router.use('/city',CityRoutes);
router.use('/airport',AirportRoutes);

module.exports=router;