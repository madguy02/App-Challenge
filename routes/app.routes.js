module.exports = (app) => {
    const story = require('../controllers/app.controllers.js');
   
    app.post('/register',story.register);
    app.post('/login',story.login);
    app.post('/story/addstory', story.create);
    app.get('/story/findstory/:username',story.findAll);
    app.get('/story/findAuthoredstory', story.find);
    app.get('/story/finddrafttories/:username', story.Draft);
    app.put('/story/:storyId',story.update);
    app.delete('/story/:storyId', story.delete);

}