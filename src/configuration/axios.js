import axios from "axios"
import { toast } from "react-toastify"

const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout:50000,
    timeoutErrorMessage:"Server timed out.Please try again",
    responseType:"json",
    headers:{
        "Content-Type":"application/json"
    }
})
axiosInstance.interceptors.response.use((axiosResponse)=>{
    return axiosResponse.data
},
(axiosError) => {
    //401:login failed , 403: permission denied , 404: not found,
    if (Object.hasOwnProperty(axiosError.response) && axiosError.response.status === 401) {
        toast.error("Login failed")
    }
    else if (Object.hasOwnProperty(axiosError.response) &&axiosError.response.status === 403) {
        toast.error("Permission denied")
    }
    else {
        toast.error("User not found")
    }
    throw axiosError?.response
}
)
export default axiosInstance