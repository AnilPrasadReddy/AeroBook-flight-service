const express = require('express');
const { CityController } = require('../../controllers');
const router = express.Router();

router.post('/',CityController.createCity);
router.get('/',CityController.getAllCities);
router.get('/:id',CityController.getCity);
router.put('/:id',CityController.updateCity);
router.delete('/:id',CityController.deleteCity);

module.exports=router;