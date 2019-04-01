const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('successfully connected to database');

}).catch(err => {
    console.log('could not connect to database');
});
require('./routes/app.routes.js')(app);

app.listen(3000);
console.log('server is running');
