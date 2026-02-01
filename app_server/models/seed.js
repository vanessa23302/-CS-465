const fs = require('fs');
const path = require('path');
const mongoose = require('./db');

// Register the model with mongoose
require('./travlr');

// Pull the model from mongoose (guaranteed to be a Model)
const Trip = mongoose.model('Trip');

const seedFile = path.join(__dirname, '..', '..', 'data', 'trips.json');

mongoose.connection.once('connected', async () => {
  try {
    console.log('Connected to MongoDB, starting seed...');

    const data = JSON.parse(fs.readFileSync(seedFile, 'utf8'));

    await Trip.deleteMany({});
    await Trip.insertMany(data);

    console.log(`Seeded ${data.length} trips successfully`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
});
