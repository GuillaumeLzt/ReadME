
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.post = require("./post.js");
db.photo = require("./photo.js");
db.user = require("./user.js");
db.role = require("./role.js");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;