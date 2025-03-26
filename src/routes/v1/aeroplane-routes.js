const express = require('express');
const router  = express.Router();
const {AeroplaneController} = require('../../controllers');
const { AeroplaneMiddleware } = require('../../middlewares');

router.post('/',AeroplaneMiddleware.isValidCreateReq,AeroplaneController.createAeroplane);

module.exports=router