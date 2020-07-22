const Smoothie = require("../models/smoothie")


  const getAllSmoothies = function(req){
    return Smoothie.find()
  }
  
  const getSmoothieById = function(id) {
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

   // Add a comment to a post
// returns a promise (because it is async)
    /* 
    const addComment = async function (req) {
    let post = await Post.findById(req.params.postId);

    let newComment = {
      username: req.body.username,
      comment: req.body.comment
  };
      post.comments.push(newComment);
      return Post.findByIdAndUpdate(req.params.postId, post, {
      new: true
  });
} 
  }
*/
module.exports = {getAllSmoothies, addSmoothie, getSmoothieById, deleteSmoothie, updateSmoothie}