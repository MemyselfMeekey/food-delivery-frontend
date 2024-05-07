import HttpServer from "../../../../services/axios.service";

class BannerService extends HttpServer{
     bannerCreate=async(data)=>{
        try{
            const response=await this.postRequest(
                'banner',
                data,
                {
                    auth:true,file:true
                }
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }
    listBanner=async({limit,page})=>{
        try{
    
            const response=await this.getRequest(
                `banner?limit=${limit}&page=${page}`,
                
                {
                    auth:true
                }
            )
            
          
            return response
        }
        catch(exception){
            throw exception
        }
    }
}
const BannerSvc=new BannerService()
export default BannerSvc