const express = require('express');
const { ServerConfig } = require('./config');
const app = express();

const apiRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//api routes utilization
app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`Server is running on port ${ServerConfig.PORT}`);
    console.log(`http://localhost:${ServerConfig.PORT}`);
});
