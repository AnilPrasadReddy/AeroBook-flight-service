const { FlightController } = require('../../controllers');
const {  FlightMiddleware } = require('../../middlewares');
const express = require('express');
const router = express.Router();

router.post('/',FlightMiddleware.isValidFlight,FlightController.createFlight);
router.get('/',FlightController.getAllFlights);


module.exports=router;