const express = require('express');
const router  = express.Router();
const {AeroplaneController} = require('../../controllers');
const { AeroplaneMiddleware } = require('../../middlewares');

router.post('/',AeroplaneMiddleware.isValidCreateReq,AeroplaneController.createAeroplane);
router.get('/',AeroplaneController.getAllAeroplanes);
router.get('/:id',AeroplaneController.getAeroplane);
router.put('/:id',AeroplaneController.updateAeroplane);
router.delete('/:id',AeroplaneController.deleteAeroplane);
module.exports=router;