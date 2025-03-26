const express = require('express');
const router = express.Router();

const AeroplaneRoutes = require('./aeroplane-routes')

router.use('/aeroplane',AeroplaneRoutes);

module.exports=router;