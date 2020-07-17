const {getAllSmoothies, getSmoothieById, addSmoothie, deleteSmoothie, updateSmoothie} = require("../utils/smoothies_utilities");

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



module.exports = {getSmoothies, getSmoothie, postSmoothie, removeSmoothie, changeSmoothie}