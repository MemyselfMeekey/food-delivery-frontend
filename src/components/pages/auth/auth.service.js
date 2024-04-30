import HttpServer from "../../../services/axios.service";

class AuthService extends HttpServer{
    loginRequest=async(data)=>{
        try{
            const response= await this.postRequest(
                'auth/login',
                data
            )
        //    console.log(response)
        //    console.log(response.data.result.userWithotp)
            localStorage.setItem("_usr",response.data.result.userWithotp.email)
            return response
        }
        catch(exception){
            throw exception
        }
    }
    otpRequest=async(data)=>{
        try{
            const response=await this.postRequest(
                'auth/verify-otp',
                data
            )
         
            localStorage.setItem("_act",response.data.result.accessToken)
            localStorage.setItem("_rft",response.data.result.refreshToken)
            localStorage.setItem("_usr",JSON.stringify(response.data.result.userDetail))
            return response
        }
        catch(exception){
            throw exception
        }
    }
}
const AuthSvc=new AuthService()
export default AuthSvc