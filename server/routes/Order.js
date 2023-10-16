const express = require("express")
const router = express.Router()

const {
        createOrder,
        getUserOrders,
        getOrderDetails,
        deleteOrder,
        getAllOrders,
        markAsDelivered,
        markAsApproved
      } = require("../controllers/Order")


const { auth, isTransporter, isCustomer, isAdmin } = require("../middleware/auth")

router.post("/createOrder",auth,isCustomer,createOrder)

router.post("/getUserOrders", auth, isCustomer, getUserOrders)

router.get("/getOrderDetails/:orderId", auth, getOrderDetails)

router.post("/deleteOrder", auth, isCustomer, deleteOrder)

router.get("/getAllOrders", auth, isTransporter, getAllOrders)

router.get("/markAsDelivered/:orderId", auth, isTransporter, markAsDelivered)


router.get("/markAsApproved/:orderId", auth, isTransporter, markAsApproved)


module.exports = router