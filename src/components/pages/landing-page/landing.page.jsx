import {  useEffect, useState } from "react"

import HomeSlider from "../home/slider/home-slider.jsx"
import SingleMenuGrid from "./singleMenugrid.jsx"
import { toast } from "react-toastify"
import MenuSvc from "../admin/menu/menu-service.js"
import OrderSvc from "../admin/order/order-service.js"

const LandingPage=()=>{
    
    let [menuList,setmenuList]=useState()
    // let [loading,setLoading]=useState(false)
    
   
    const MenuHomeList=async()=>{
        try{
            const response=await MenuSvc.homeList()
            setmenuList(response.result)
        }
        catch(exception){
            toast.warn(exception.message)
            console.log("exception",exception)
        }
    }

    const AddtoCart=async(id)=>{
        try{
            const payload={
                menuId:id,
                quantity:1
            }
            console.log("payload",payload)
            const response=await OrderSvc.create(payload)
            toast.success(response.message)
            // const response=await OrderSvc.create()
            

        }
        catch(exception){
            toast.exception(exception.message)
            console.log("exception",exception)
        }
    }

    useEffect(()=>{
        MenuHomeList()
    },[])
    return(
        <>
        <HomeSlider/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center">Menu List</h4>
                </div>
                </div>
           
                <div className="col-12">
                    <div className="row">
                        {
                            menuList && menuList.map((items,ind)=>(
                                
                               <SingleMenuGrid key={ind} menuDetail={items} AddtoCart={AddtoCart}/>
                            
                            ))
                        }
                    </div>
                </div>
                </div>
                
        
        </>
    )
}
export default LandingPage