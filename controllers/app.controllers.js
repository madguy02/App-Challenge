const inkredo = require('../models/app.models.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config.js')
//register API

exports.register = (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new inkredo ({
        username: req.body.username,
        password: hashedPassword
    });

    user.save()
    .then(data => {
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
          });
        res.status(200).send({ auth: true, token: token, data: data });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while registering"
        });
    });
    
}

// login API

exports.login = (req,res) => {
   inkredo.findOne({"username": req.body.username}, (err,user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({ auth: true, token: token });
   })

}

// create API 
exports.create = (req, res) => {

const content = new inkredo({
    title: req.body.title,
    story: req.body.story,
    username: req.body.username,
    role: req.body.role,
    story_state: req.body.story_state,
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
    inkredo.find({"username": req.params.username}).limit(5).sort({updatedAt:1})
    .then(stories => {
        res.send(stories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while retrieving files'
        });
    });
}

exports.find = (req,res) => {
    inkredo.find({"role": "Author"}).limit(5).sort({updatedAt: 1})
    .then(stories => {
        res.send(stories);
    }).catch(err => {
        res.send(500).send({
            message: err.message || 'error occured'
        })
    })
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


