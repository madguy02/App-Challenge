module.exports = (app) => {
    const story = require('../controllers/app.controllers.js');
   
    app.post('/addstory', story.create);

}