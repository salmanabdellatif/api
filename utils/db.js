const fs = require('fs');
const path = require('path');

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
