const inkredo = require('../models/app.models.js');

// create API 
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
// find all API for stories

exports.findAll = (req, res) => {
    inkredo.find().limit(5).sort({updatedAt:1})
    .then(stories => {
        res.send(stories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while retrieving files'
        });
    });
}

// update API

exports.update = (req, res) => {
    
    inkredo.findByIdAndUpdate(req.params.storyId, {
        title: req.body.title,
        story: req.body.story
    }, {new: true})
    .then(stories => {
        if(!stories) {
            return res.status(404).send({
                message: 'Story not found with id ' + req.params.storyId
            });
        }
        res.send(stories);

    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Story not found with id ' + req.params.storyId
            });                
        }
        return res.status(500).send({
            message: 'Error updating story with id ' + req.params.storyId
        });
    });

}

// delete API
exports.delete = (req, res) => {
    inkredo.findByIdAndRemove(req.params.storyId)
    .then(stories => {
        if(!stories) {
            return res.status(404).send({
                message: 'Story not found with id ' + req.params.storyId
            });
        }
        res.send({message: 'Story deleted successfully!'});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: 'Story not found with id ' + req.params.storyId
            });                
        }
        return res.status(500).send({
            message: 'Could not delete story with id ' + req.params.storyId
        });
    });

}


