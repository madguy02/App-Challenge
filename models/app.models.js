const mongoose = require('mongoose');

const AppSchema = mongoose.Schema({
    title: String,
    story: String,
},
{
    timestamps: true  
});

module.exports = mongoose.model('inkredo', AppSchema);