module.exports = (app) => {
    const story = require('../controllers/app.controllers.js');
   
    app.post('/story/addstory', story.create);
    app.get('/story/findstory',story.findAll);
    app.put('/story/:storyId',story.update);
    app.delete('/story/:storyId', story.delete);

}