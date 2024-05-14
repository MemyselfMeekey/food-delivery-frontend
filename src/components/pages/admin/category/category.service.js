import HttpServer from "../../../../services/axios.service";


class CategoryService extends HttpServer{
    categoryCreate=async(data)=>{
        try{
            console.log("I am being submitted")
            const response=await this.postRequest(
                '/category',
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
    listAll=async({limit,page})=>{
        try{
            const response=await this.getRequest(
                `/category?limit=${limit}&page=${page}`,
                {auth:true}
            )
            return response
            
        }
        catch(exception){
            throw exception
        }

    }
}
const CategorySvc=new CategoryService()
export default CategorySvc