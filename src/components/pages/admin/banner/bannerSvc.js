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
   
    getDataById=async(id)=>{
        try{    
            const response=await this.getRequest(
                   `banner/${id}`,
                    {auth:true}
            )
            return response
        }   
        catch(exception){
            throw exception
        }
    
    }

    update=async(data,id)=>{
        try{
            console.log("data in update",data)
            const response=await this.putRequest(
                `banner/${id}/edit`,
                data,
                {
                    auth:true,
                    file:true
                }
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }

    homeListing=async()=>{
        try{
            const response=await this.getRequest(
                'banner/home/list',
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }

    deleteData=async(id)=>{
        try{
            const response=await this.deleteRequest(
                `banner/${id}`,
                {auth:true}
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