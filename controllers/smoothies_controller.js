const {getAllSmoothies, getSmoothieById, addSmoothie, deleteSmoothie, updateSmoothie, addComment} = require("../utils/smoothies_utilities");

const userAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.sendStatus(403)
    }
}

const getSmoothies = function(req, res){
    getAllSmoothies(req).exec((err, smoothies) => {
        if (err){
            res.status(500)
            return res.json ({
                error: err.message
            })
        }
      res.send(smoothies) 
    })
}
 
const getSmoothie = function(req, res){
    getSmoothieById(req.params.id).exec((err, smoothie) => {
        if (err) {
            res.status(404)
            return res.send("Smoothie not found")
        }
        res.send(smoothie)
    })
}

const postSmoothie = function(req, res) {
    addSmoothie(req.body).save((err, smoothie) => {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status=201
        res.send("You have succesfully posted your smoothie!")
    })
}

// make a comment on a post
const makeComment = function (req, res) {
    // Check for error from middleware
    if (req.error) {
        res.status(req.error.status);
        res.send(req.error.message);
    } else {
        // resolve the promise from addComment
        // Add username to the request from the session
        req.body.username = req.user.username;
        addComment(req).then((post) => {
            res.status(200);
            res.send(post);
        }).catch((err) => {
            res.status(500);
            res.json({
                error: err.message
            });
        });
    }
}

const removeSmoothie = function (req, res){
    deleteSmoothie(req.params.id).exec((err)=> {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status=204
        res.send("Your smoothie has been deleted")
    })
}

const changeSmoothie = function(req, res){
    updateSmoothie(req).exec((err, smoothie) => {
        if (err){
            res.status(500)
            return res.json ({
                error: err.message
            })
        }
        res.status=200
        res.send("Your smoothie has been updated!")
    })
}



module.exports = {getSmoothies, getSmoothie, postSmoothie, removeSmoothie, changeSmoothie, makeComment}