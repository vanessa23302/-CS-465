const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1/travlr';

mongoose.connect(dbURI)
  .then(() => console.log(`Mongoose connected to ${dbURI}`))
  .catch(err => console.log('Mongoose connection error:', err));

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = mongoose;
