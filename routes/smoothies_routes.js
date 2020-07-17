const express = require("express")
const router = express.Router()
const {getSmoothies, addSmoothie, getSmoothie, removeSmoothie, changeSmoothie} = require("../controllers/smoothies_controller")

//READ 
//GET on "/smoothies"
//returns all smoothies
router.get("/", getSmoothies)


router.post("/", addSmoothie)


router.get("/:id", getSmoothie)


router.delete("/:id", removeSmoothie)


router.put("/:id", changeSmoothie)



module.exports = router