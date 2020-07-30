const express = require("express")
const router = express.Router()
const { register, login, logout, authenticatedUser} = require("../controllers/auth_controller")

router.post("/register", register)

router.get("/user", authenticatedUser)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router
