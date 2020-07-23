const express = require("express")
const router = express.Router()
const {getSmoothies, getSmoothie, postSmoothie, changeSmoothie, removeSmoothie, getComments, makeComment, removeComment, verifyOwner, verifyCommentOwner, userAuthenticated} = require("../controllers/smoothies_controller")
//READ 
//GET on "/smoothies"
//returns all smoothies
router.get("/", getSmoothies)

router.get("/:id", getSmoothie)

router.use(userAuthenticated)
router.post("/", postSmoothie)


router.delete("/:id", verifyOwner, removeSmoothie)


router.put("/:id", verifyOwner, changeSmoothie)





router.get("/comments/:smoothieId", getComments)

router.post("/comments/:smoothieId", makeComment)

router.delete("/comments/:id", verifyCommentOwner, removeComment)


module.exports = router