import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';

import {statusendpoints} from "../apis"

const {
        CREATE_STATUS_API,
      }
        = statusendpoints


export const createOrderStatus = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_STATUS_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_STATUS_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Status")
        }
        toast.success("Status Created")
        result = response?.data
    } catch (error) {
        console.log("CREATE_STATUS_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}