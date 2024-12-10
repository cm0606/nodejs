const mongoose = require('mongoose');
async function connectMongoDb(url) {
    mongoose.connect(url).then(() => console.log("Database Connected!"));
}
module.exports = { connectMongoDb };