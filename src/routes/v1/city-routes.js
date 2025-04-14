const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddleware } = require('../../middlewares');
const router = express.Router();

router.post('/',CityMiddleware.isValidCity,CityController.createCity);
router.get('/',CityController.getAllCities);
router.get('/:id',CityController.getCity);
router.put('/:id',CityMiddleware.isValidCity,CityController.updateCity);
router.delete('/:id',CityController.deleteCity);

module.exports=router;