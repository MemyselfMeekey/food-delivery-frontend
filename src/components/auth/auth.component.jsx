import { useEffect, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import AuthSvc from "../pages/auth/auth.service"
import { toast } from "react-toastify"
import { Col, Container, Row,Spinner } from "react-bootstrap"

const AuthComponent=({role,children})=>{
    const [userDetail,setUserDetail]=useState()
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    
    const getLoggedInUser=async()=>{
        try{
            const response=await AuthSvc.getLoggedInUser()
            localStorage.setItem("_user",JSON.stringify(response.result))
           
            setUserDetail(response.result)
        }
        catch(exception){
            toast.error("Please login again")
            localStorage.removeItem("_user")
            localStorage.removeItem("_act")
            localStorage.removeItem("_rft")
            navigate('/')
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const token=localStorage.getItem("_act") || null
        if(!token){
            toast.error("Please login first")
            navigate("/")
        }
        else{
            getLoggedInUser()
        }
    },[])

    if(loading){
        return(
            <>
           
                <Container>
                    <Row>
                        <Col sm={12} className="my-5 text-center">
                            <Spinner variant="black"></Spinner>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    else if(userDetail && userDetail.role===role){
    
        return children
    }
    else{
        toast.warn("You donot have permission to this panel")
        console.log(userDetail.role)
        return <Navigate to={'/'+userDetail.role}></Navigate>
    }

    
}
export default AuthComponent