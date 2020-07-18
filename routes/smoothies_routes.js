const express = require("express")
const router = express.Router()
const {getSmoothies, getSmoothie, postSmoothie, changeSmoothie, removeSmoothie} = require("../controllers/smoothies_controller")
//READ 
//GET on "/smoothies"
//returns all smoothies
router.get("/", getSmoothies)

router.get("/:id", getSmoothie)


router.post("/", postSmoothie)


router.delete("/:id", removeSmoothie)


router.put("/:id", changeSmoothie)



module.exports = router