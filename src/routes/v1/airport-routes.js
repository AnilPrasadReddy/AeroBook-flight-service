const express = require('express');
const router = express.Router();
const {AirportController} = require('../../controllers');
const { AirportMiddleware } = require('../../middlewares');

router.post('/',AirportMiddleware.isValidAirport,AirportController.createAirport);
router.get('/',AirportController.getAirports);
router.get('/:id',AirportController.getAirport);
router.put('/:id',AirportController.updateAirport);
router.delete('/:id',AirportController.deleteAirport);

module.exports=router;