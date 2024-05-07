import HttpServer from "../../../services/axios.service";

class AuthService extends HttpServer{
    loginRequest=async(data)=>{
        try{
            const response= await this.postRequest(
                'auth/login',
                data
            )
         
        //    console.log(response.data.result.userWithotp)
            localStorage.setItem("_usr",response.result.userWithotp.email)
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
          
            localStorage.removeItem("_usr")
            localStorage.setItem("_act",response.result.accessToken)
            localStorage.setItem("_rft",response.result.refreshToken)
            localStorage.setItem("_user",JSON.stringify(response.result.userDetail))
            return response
        }
        catch(exception){
              throw exception
        }
    }
    register=async(data)=>{
        try{
            const response=await this.postRequest(
                'auth/registration',
                data,
                {
                    file:true
                }
         
            )
            return response
        }   
        catch(exception){
            throw exception
        }
    }
    tokenVerification=async(token)=>{
        try{
           
            const response=await this.getRequest(
                'auth/verification/'+token
            ) 
            return response  
        }   
        catch(exception){
            console.log("errror in token verificaiton")
            throw exception
        }
    }
    userActivation=async(data,token)=>{
        try{
        const response=await this.postRequest(
           'auth/activation/'+token,
           data 
        )
        return response
    }
    catch(exception){
        throw exception
    }
    }
    resendVerification=async(data)=>{
        try{
            const response=await this.postRequest(
                'auth/resendverification/',
                data
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
    getLoggedInUser=async()=>{
        try{
            const response=await this.getRequest(
                'auth/dashboard',
                {auth:true}
            )
    
            return response
        }
        catch(exception){
            throw exception
        }
    }
}
const AuthSvc=new AuthService()
export default AuthSvc