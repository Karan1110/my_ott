const winston = require('winston');
// require("@innova/winston-pg")
require('express-async-errors');

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  winston.add(winston.transports.File, { filename: 'logfile.log' });
  // winston.add(winston.transports.Pg, { 
  //   connectionString: config.get("dbURL"),
  //   maxPool: 5,
  //   level: 'error',
  //   tableName: 'errors',
  //  });

  // NOTE : there is no need of logging into a database while we are already logging errors in thefile
}