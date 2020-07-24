const {getAllSmoothies, getSmoothieById, addSmoothie, deleteSmoothie, updateSmoothie, getAllComments, addComment, deleteComment} = require("../utils/smoothies_utilities");


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
	req.body.username = req.user.username
	console.log(req.body)
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

const removeSmoothie = function (req, res){
	if (req.error){
		res.status(req.error.status)
		return res.send(req.error.message)
	}
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

// Middleware functions
const verifyOwner = function(req, res, next) {
	/*
	if (req.user.role === "admin") {
		console.log("have admin user in middleware")
		next()
	} else {
    */
		getSmoothieById(req.params.id).exec((err, smoothie) => {
			console.log("req.user", req.user)
			console.log("smoothie", smoothie)
				if (err || !smoothie) {
				req.error = {
					message: "Sorry, there is no such smoothie!",
					status: 404
				}
				return next()
			}
			
			if (!req.user || (req.user.username !== smoothie.username)) {
				req.error = {
					message: "You do not have permission to modify/delete this smoothie",
					status: 403
				}
			}
			next()
		})
    }
    
    const Smoothie = require("../models/smoothie")

const getComments = function(req, res) {
	// Check for error from middleware
	if (req.error) {
		res.status(req.error.status)
		res.send(req.error.message)
	} else {
		// resolve the promise from getAllComments
		getAllComments(req)
			.then(comments => {
				res.status(200)
				res.send(comments)
			})
			.catch(err => {
				res.status(500)
				res.json({
					error: err.message
				})
			})
	}
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

// delete a comment on a post
const removeComment = function(req, res) {
	// Check for error from middleware
	if (req.error) {
		res.status(req.error.status)
		res.send(req.error.message)
	} else {
		deleteComment(req)
			.then(() => {
				res.sendStatus(204)
			})
			.catch(err => {
				res.status(500)
				res.json({
					error: err.message
				})
			})
	}
}
const verifyCommentOwner = function(req, res, next) {
	/*if (req.user.role === "admin") {
		console.log("have admin user in middleware")
		next()
	} else {
		*/
		let smoothie = Smoothie.findOne({
			"comments._id": req.params.id
		}).exec((err, smoothie) => {
			if (err) {
				req.error = {
					message: "The smoothie was not found",
					status: 404
				}
				next()
			}
            console.log("smoothie:", smoothie)
            
			let comment = smoothie.comments.id(req.params.id)
			if (req.user.username !== comment.username) {
				req.error = {
					message: "You do not have permission to modify this comment",
					status: 403
				}
			}
			next()
		})
	}


const userAuthenticated = function (req, res, next) {
    console.log("This is the user:", req.user)
    if (req.isAuthenticated()){
      next()
    } else {
      res.sendStatus(403);
    }
  }
  

module.exports = {getSmoothies, getSmoothie, postSmoothie, removeSmoothie, changeSmoothie, getComments, makeComment, removeComment, verifyOwner, verifyCommentOwner, userAuthenticated}
