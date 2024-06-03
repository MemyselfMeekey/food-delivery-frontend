import HttpServer from "../../../../services/axios.service";


class CategoryService extends HttpServer{
    categoryCreate=async(data)=>{
        try{
           
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

    getDataById=async(id)=>{
        try{
            const response=await this.getRequest(
                `/category/${id}`,
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
            const response=await this.putRequest(
                `category/${id}/edit`,
                data,
                {auth:true}
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }

    homeList=async()=>{
        try{
            const response=await this.getRequest(
                'category/home/list'
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
                `/category/${id}/edit`,
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