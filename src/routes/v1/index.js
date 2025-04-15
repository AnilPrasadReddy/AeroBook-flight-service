const express = require('express');
const router = express.Router();

const AeroplaneRoutes = require('./aeroplane-routes')
const CityRoutes = require('./city-routes');
const AirportRoutes = require('./airport-routes');
const FlightRoutes = require('./flight-routes')

router.use('/aeroplane',AeroplaneRoutes);
router.use('/city',CityRoutes);
router.use('/airport',AirportRoutes);
router.use('/flight',FlightRoutes);

module.exports=router;