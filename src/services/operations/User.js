import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';

import { userendpoints} from "../apis"

const {
        DELETE_USER_API, GET_ALL_USERS_API
      }
        = userendpoints


export const deleteUser = async (userId,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", DELETE_USER_API, {userId}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_USER_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete User")
        }
        toast.success("User Deleted")
        result = response?.data
    } catch (error) {
        console.log("DELETE_USER_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getAllUsers = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", GET_ALL_USERS_API, {}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_ALL_USERS_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Users")
        }
        result = response?.data
        toast.success("Users Fetched")
    } catch (error) {
        console.log("GET_ALL_USERS_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

