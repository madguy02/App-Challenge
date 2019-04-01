const mongoose = require('mongoose');

const AppSchema = mongoose.Schema({
    username: String,
    password: String,
    title: String,
    story: String,
    role: String,
    story_state: String,
},
{
    timestamps: true  
});

module.exports = mongoose.model('inkredo', AppSchema);