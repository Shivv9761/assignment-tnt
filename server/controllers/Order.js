const User = require('../models/User');
const Order=require('../models/Order');
const Status=require('../models/Status');

exports.createOrder=async (req,res)=>{
 try {
    const {name,Description,weight,Source,Destination}=req.body.data;
    const {userId}=req.body;
//    console.log("userId",userId,req.body)
   console.log("userId",userId)
   console.log("name",name)
    console.log("Description",Description)
    console.log("weight",weight)
    console.log("Source",Source)
    console.log("Destination",Destination)

    if(!name || !Description || !weight || !Source || !Destination){
        return res.status(400).json({msg:"Please fill all fields"})
    }

    const newStatus=await Status.create({
      desc:"Order Created",
      title:"Order Created"
    })

   const newOrder=await Order.create({
        name,
        Description,
        weight,
        Source,
        Destination,
        createdBy:userId,
        Status:newStatus._id
   });

   const user = await User.findById(userId);
   if (!user) {
     return res.status(404).json({ msg: "User not found" });
   }
   user.orders.push(newOrder._id);
   await user.save();

    res.status(201).json({msg:"Order created successfully",success:true,data:newOrder,user:user})
 } catch (error) {

   console.error(error);
   res.status(500).json({
     success: false,
     message: "Failed to create Order",
     error: error.message,
   });
 }
}

exports.getUserOrders=async (req,res)=>{
  try {
    const {id}=req.body;
    console.log("customer Id",id)
    const user = await User.findById(id).populate({
      path: 'orders',
      populate: {
        path: 'Status',
        model: 'Status',
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    res.status(200).json({msg:"Orders fetched successfully",success:true, data:user.orders})
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Orders",
      error: error.message,
    });
  }
}

exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('Status');

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId, userId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    await Order.findByIdAndRemove(orderId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.orders.pull(orderId);
    await user.save();

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
}

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('Status')

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


exports.markAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.delivered = true;

    await order.save();

    res.status(200).json({ success: true, message: 'Order marked as delivered', data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

exports.markAsApproved = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.Approved = true;

    await order.save();

    res.status(200).json({ success: true, message: 'Order marked as delivered', data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};