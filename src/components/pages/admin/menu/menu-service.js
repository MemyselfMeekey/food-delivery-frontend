import HttpServer from "../../../../services/axios.service";


class MenuService extends HttpServer{

    storeMenu=async(data)=>{
        try{
            const response=await this.postRequest(
                'menu',
                data,
                {auth:true,file:true}
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
                'menu/'+id,
                {auth:true}
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }


    getAllData=async({page,limit})=>{
        try{
            const response=await this.getRequest(
                `menu?page=${page}&limit=${limit}`,
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
                `menu/${id}/edit`,
                data,
                {auth:true,file:true}
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }

    deleteMenu=async(id)=>{
        try{
            const response=await this.deleteRequest(
                `menu/${id}`,
                {auth:true}
            )
            return response
        }
        catch(exception){
            throw exception
        }
    }


}
const MenuSvc=new MenuService()
export default MenuSvc