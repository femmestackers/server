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
  }
  

module.exports = {getAllSmoothies, addSmoothie, getSmoothieById, deleteSmoothie, updateSmoothie}