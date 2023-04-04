const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db,{
    ssl:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => winston.info("the pursuit of happyness!!!!!!!!"))
.catch((err)=>{
  winston.info("could not connect to mongodb atlas.");
  winston.info(err);
})
}