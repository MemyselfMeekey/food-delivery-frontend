import { Outlet } from "react-router-dom"
import HomeFooter from "../home/footer/home-footer"
import HomeHeader from "../home/header/home-header"


const MainLayout=()=>{
    return(
        <>
          <HomeHeader/>
        <Outlet/>
        <HomeFooter/>
        </>
    )
}
export default MainLayout