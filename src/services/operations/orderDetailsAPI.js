import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import {ordersendpoints} from "../apis"

const {
  CREATE_ORDER_API,
  GET_USER_ORDERS_API,
  GET_ORDER_DETAILS_API,
  DELETE_ORDER_API,
  GET_ALL_ORDERS_API,
  MARK_AS_DELIVERED_API,
  MARK_AS_APPROVED_API,
} = ordersendpoints


export const createOrder = async (data,userId,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_ORDER_API, {data,userId}, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE ORDER API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Order")
    }
    toast.success("Order Created")
    result = response?.data
  } catch (error) {
    console.log("CREATE ORDER API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getUserOrders = async (userId,token,setOrders) => {
  let result = {}
  const toastId = toast.loading("Loading...")
  try {
//    console.log("userId",userId,token)
    const response = await apiConnector("POST", GET_USER_ORDERS_API, {id:userId}, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_USER_ORDERS_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch User Orders")
    }
    result = response
    setOrders(response?.data?.data)
    toast.success("Orders Fetched")
  } catch (error) {
    console.log("GET_USER_ORDERS_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getOrderDetails = async (orderId,token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    console.log("orderId",orderId,token)
    const response = await apiConnector("GET", `${GET_ORDER_DETAILS_API}/${orderId}`,{}, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_ORDER_DETAILS_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Order Details")
    }
    result = response?.data
    toast.success("Order Details Fetched")
  } catch (error) {
    console.log("GET_ORDER_DETAILS_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteOrder = async (orderId,userId,token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_ORDER_API, {orderId,userId}, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE_ORDER_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Order")
    }
    toast.success("Order Deleted")
  } catch (error) {
    console.log("DELETE_ORDER_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

export const getAllOrders = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET", GET_ALL_ORDERS_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_ALL_ORDERS_API API RESPONSE............", response,response?.data?.success)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch All Orders")
    }
    result = response?.data
  } catch (error) {
    console.log("GET_ALL_ORDERS_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const markAsDelivered = async (orderId,token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET", `${MARK_AS_DELIVERED_API}/${orderId}`,{}, {
      Authorization: `Bearer ${token}`,
    })
    console.log("MARK_AS_DELIVERED_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Mark Order As Delivered")
    }
    toast.success("Order Marked As Delivered")
  } catch (error) {
    console.log("MARK_AS_DELIVERED_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

export const markAsApproved = async (orderId,token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET", `${MARK_AS_APPROVED_API}/${orderId}`,{}, {
      Authorization: `Bearer ${token}`,
    })
    console.log("MARK_AS_APPROVED_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Mark Order As Approved")
    }
    toast.success("Order Marked As Approved")
  } catch (error) {
    console.log("MARK_AS_APPROVED_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

