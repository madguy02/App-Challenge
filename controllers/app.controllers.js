const inkredo = require('../models/app.models.js');

exports.create = (req, res) => {
const content = new inkredo({
    title: req.body.title,
    story: req.body.story
});

content.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || 'Some error occured while saving files'
    });
});

}

