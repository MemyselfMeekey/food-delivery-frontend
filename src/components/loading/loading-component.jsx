import { Spinner } from "react-bootstrap"

const LoadingComponent=()=>{
    return(
        <>
            <div className="my-3 text-center">
                <Spinner variant="danger" size="lg"/>
            </div>
        </>
    )
}
export default LoadingComponent