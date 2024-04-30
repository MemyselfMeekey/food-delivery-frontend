import { useCallback, useEffect, useState } from "react"

import HomeSlider from "../home/slider/home-slider.jsx"
import SingleMenuGrid from "./singleMenugrid.jsx"


const LandingPage=()=>{
    let [menuList,setmenuList]=useState()
    let [loading,setLoading]=useState(false)
    const handleFunction=useCallback(async()=>{
        const response={
            result:[
                {
                    _id:"123",
                    title:"BreakFast",
                    slug:"menu-name",
                    categories:[{_id:"321",title:"Category One"}],
                    price:1000,
                    disocunt:10,
                    afterDiscount:900
                },
                {
                    _id:"123",
                    title:"Dinner",
                    slug:"menu-name-two",
                    categories:[{_id:"456",title:"Category two"}],
                    price:1000,
                    disocunt:10,
                    afterDiscount:900
                }
            ],
            message:"",
            meta:null
        }
        setmenuList(response.result)
    },[loading])
    useEffect(()=>{
        handleFunction()
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
                                
                               <SingleMenuGrid key={ind} menuDetail={items}/>
                            
                            ))
                        }
                    </div>
                </div>
                </div>
                
        
        </>
    )
}
export default LandingPage