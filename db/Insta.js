const mongoose = require('mongoose');

const instaSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    contact: Number,
    instagram_username: String,
});

module.exports = mongoose.model("early_access_instagram", instaSchema);