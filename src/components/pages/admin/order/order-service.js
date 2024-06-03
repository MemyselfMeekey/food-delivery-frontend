import HttpServer from "../../../../services/axios.service"

class OrderService extends HttpServer {
    create = async (data) => {
        try {
            const response = await this.postRequest(
                'cart/create',
                data,
                { auth: true }
            )
            return response

        }
        catch (exception) {
            throw exception
        }
    }

    getOrderList = async () => {
        try {
            const response = await this.getRequest(
                'cart/list',
                { auth: true }
            )
            return response

        }
        catch (exception) {
            throw exception
        }
    }

    getOrderById=async(id)=>{
        try{
            
        }
        catch(exception){
            throw exception
        }
    }

    deleteOrder = async (id) => {
        try {
            const response = await this.deleteRequest(
                'cart/' + id,
                { auth: true }
            )
            return response
        }
        catch (exception) {
            throw exception
        }
    }


}
const OrderSvc = new OrderService()
export default OrderSvc