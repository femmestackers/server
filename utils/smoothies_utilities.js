const Smoothie = require("../models/smoothie")

const getAllSmoothies = function(req){
    return Smoothie.find()
}
  
  const postSmoothie = function(req) {
    return new Smoothie(req.body)
  }
  
  const getSmoothieById = function(req) {
    return Smoothie.findById(req.params.id)
  }
  
  const deleteSmoothie = function(id) {
    return Smoothie.findByIdAndRemove(id)
  }
  
  const updateSmoothie = function(req) {
    return Smoothie.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
  }
  

module.exports = {getAllSmoothies, postSmoothie, getSmoothieById, deleteSmoothie, updateSmoothie}