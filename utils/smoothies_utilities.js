const Smoothie = require("../models/smoothie")


  const getAllSmoothies = function(req){
    return Smoothie.find()
  }
  
  const getSmoothieById = function(id) {
    console.log(id)
    return Smoothie.findById(id)
  }

  const addSmoothie = function(smoothie) {
    return new Smoothie(smoothie)
  }

  
  
  const deleteSmoothie = function(id) {
    return Smoothie.findByIdAndRemove(id)
  }
  
  const updateSmoothie = function(req) {
    return Smoothie.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
  }


// Get all comments for a post
// returns a promise (because it is async)
const getAllComments = async function (req) {
  let smoothie = await Smoothie.findById(req.params.smoothieId);

  return smoothie.getAllComments();
};

// Add a comment to a post
// returns a promise (because it is async)
const addComment = async function (req) {
  let smoothie = await Smoothie.findById(req.params.smoothieId);

  let newComment = {
      username: req.body.username,
      comment: req.body.comment
  };
  smoothie.comments ? smoothie.comments.push(newComment) : (smoothie.comments = [newComment]);
  return Smoothie.findByIdAndUpdate(req.params.smoothieId, smoothie, {
      new: true
  });
};

// Deletes a comment from a post
// returns a promise (because it is async)
const deleteComment = async function (req) {
  return await Smoothie.findOneAndUpdate({
      "comments._id": req.params.id
  }, {
      $pull: { //deletes a nested object 
          comments: {
              _id: req.params.id
          }
      }
  }, {
      new: true
  });
};
  

module.exports = {getAllSmoothies, addSmoothie, getSmoothieById, deleteSmoothie, updateSmoothie,  getAllComments,
addComment, deleteComment}
