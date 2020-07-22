const express = require("express")
const router = express.Router()
const {getSmoothies, getSmoothie, postSmoothie, changeSmoothie, removeSmoothie, makeComment,
    verifyOwner,
    validUser} = require("../controllers/smoothies_controller")
const {
        userAuthenticated
    } = require('../utils/common_utilities');

// For post, delete, put -require authenticated user
router.use(userAuthenticated)


    //READ 
//GET on "/smoothies"
//returns all smoothies
router.get("/", getSmoothies)

router.get("/:id", getSmoothie)


router.post("/", postSmoothie)


router.delete("/:id", verifyOwner, removeSmoothie)


router.put("/:id", verifyOwner, changeSmoothie)

// For post, delete, put, post comment -require authenticated, valid user
router.use(userAuthenticated, validUser);
// CREATE
// POST on '/posts'
// Creates a new post
router.post('/', makePost);

// CREATE
// POST on '/posts/:postId/comments'
// Adds a comment to a post with postId
router.post('/:postId/comments', makeComment);



module.exports = router