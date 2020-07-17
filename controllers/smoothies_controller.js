const {getAllSmoothies, getSmoothieById, postSmoothie, deleteSmoothie, updateSmoothie} = require("../utils/smoothies_utilities")

const getSmoothies = function (req, res){
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

const addSmoothie = function(req, res) {
    postSmoothie(req.body).save((err, smoothie) => {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status(201)
        res.send(smoothie)
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
        res.sendStatus(204)
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
        res.status(200)
        res.send(smoothie)
    })
}



module.exports = {getSmoothies, getSmoothie, addSmoothie, removeSmoothie, changeSmoothie}