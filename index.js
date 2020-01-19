const fs = require('fs-extra')
const data = fs.readJsonSync('./flat.json');
module.exports = data;
