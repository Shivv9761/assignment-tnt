const User = require('../models/User');
const Order=require('../models/Order');
const Status=require('../models/Status');

exports.createStatus = async (req, res) => {
  try {
    const { statusTitle, statusDesc, orderId } = req.body;
    console.log("orderId",orderId);

    if (!orderId || !statusTitle || !statusDesc) {
      return res.status(400).json({ success: false, message: "Please provide all details" });
    }
    const newStatus = new Status({
      title: statusTitle,
      desc: statusDesc,
    });

    await newStatus.save();

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.Status.push(newStatus._id);
    await order.save();

    res.status(200).json({ success: true, message: "Status created and added to order successfully", data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create status and add to order",
      error: error.message,
    });
  }
};



