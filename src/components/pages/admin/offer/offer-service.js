import HttpServer from "../../../../services/axios.service";

 
class OfferService extends HttpServer{

    createOffer=async()=>{
        try{

        }
        catch(exception){
            throw exception
        }
    }

    getAllOffer=async({page,limit})=>{
        try{
            const response=await this.getRequest(
                `offer?page=${page}&limit=${limit}`,
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

    getOfferById=async()=>{
        try{

        }
        catch(exception){
            throw exception
        }
    }

    updateOffer=async()=>{
        try{

        }
        catch(exception){
            throw exception
        }
    }

    deleteOffer=async(id)=>{
        try{
            const response=await this.deleteRequest(
                'offer/'+id,
                {auth:true}
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }



}
const OfferSvc=new OfferService()
export default OfferSvc