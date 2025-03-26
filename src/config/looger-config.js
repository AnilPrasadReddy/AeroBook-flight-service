const {format,transports,createLogger} = require('winston');
const {label,combine,prettyPrint,timestamp,printf} =format;

const myformat = printf(({level,message,timestamp})=>{
    return `${timestamp} ${level}: ${message}`;
});

const logger  = createLogger({
    format:combine(
        timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        myformat,
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename:'combined.log'}),
    ]
});

module.exports=logger;