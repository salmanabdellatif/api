const fs = require('fs');
const path = require('path');
const { MONGO_URI } = process.env;

module.exports.set = () => {
  if (fs.existsSync(path.join(__dirname, '../data'))) return;
  fs.writeFileSync(
    path.join(__dirname, '../data'),
    JSON.stringify({ users: [], posts: [] })
  );
};

module.exports.getData = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../data')));
};

module.exports.savaData = data => {
  return fs.writeFileSync(
    path.join(__dirname, '../data'),
    JSON.stringify(data)
  );
};

// const { MongoClient } = require("mongodb");
// // Connection URI
// const uri =
//   "mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";
// // Create a new MongoClient
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
