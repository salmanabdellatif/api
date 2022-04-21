const { MongoClient } = require('mongodb');
// Connection URI
const uri = 'mongodb://localhost:27017';
// Create a new MongoClient
const client = new MongoClient(uri);
const mongoClient = async () => {
  await client.connect();
  // Establish and verify connection
  await client.db('admin').command({ ping: 1 });
  console.log('connected successfully to mongoDB...');
  return client;
};

module.exports = mongoClient;
