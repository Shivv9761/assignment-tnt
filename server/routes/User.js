const express = require("express")
const router = express.Router()
const { auth, isAdmin } = require("../middleware/auth")
const {
        login,
        signup,
        sendotp,
      } = require("../controllers/Auth")

const {
  deleteUser,
  getAllUsers
      }= require("../controllers/User")



router.post("/login", login)

router.post("/signup", signup)

router.post("/sendotp", sendotp)

router.post("/delete-user",auth,isAdmin,deleteUser )

router.get("/get-all-users", auth,isAdmin, getAllUsers);


module.exports = router