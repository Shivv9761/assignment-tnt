const express = require("express")
const router = express.Router()

const {
        createStatus
      } = require("../controllers/Status")


const { auth, isTransporter } = require("../middleware/auth")

router.post("/createStatus",auth,isTransporter,createStatus)




module.exports = router