const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
}

// Order ENDPOINTS
export const ordersendpoints = {
 CREATE_ORDER_API: BASE_URL + "/order/createOrder",
  GET_USER_ORDERS_API: BASE_URL + "/order/getUserOrders",
   GET_ORDER_DETAILS_API: BASE_URL + "/order/getOrderDetails",
  DELETE_ORDER_API: BASE_URL + "/order/deleteOrder",
  GET_ALL_ORDERS_API: BASE_URL + "/order/getAllOrders",
  MARK_AS_DELIVERED_API: BASE_URL + "/order/markAsDelivered",
  MARK_AS_APPROVED_API: BASE_URL + "/order/markAsApproved",
}

// Status ENDPOINTS
export const statusendpoints = {
  CREATE_STATUS_API: BASE_URL + "/status/createStatus",
}

// User ENDPOINTS
export const userendpoints = {
  DELETE_USER_API: BASE_URL + "/auth/delete-user",
  GET_ALL_USERS_API: BASE_URL + "/auth/get-all-users",
}

