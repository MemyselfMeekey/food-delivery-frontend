import { useState } from "react"
import daraz1 from "../../../../assets/images/daraz1.jpg"
import daraz2 from "../../../../assets/images/daraz2.png"
import daraz3 from "../../../../assets/images/daraz3.jpg"
import "./home-slider.css"
import { toast } from "react-toastify"
import { useEffect } from "react"
import BannerSvc from "../../admin/banner/bannerSvc"
import { Spinner } from "react-bootstrap"


const HomeSlider = () => {

    const [loading, setLoading] = useState(false)

    const [bannerList, setBannerList] = useState()

    const BannerList = async () => {
        try {
            setLoading(true)
            const response = await BannerSvc.homeListing()

            setBannerList(response.result)

        }
        catch (exception) {
            toast.warn(exception.message)
            console.log("exception", exception)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        BannerList()
    }, [])


    return (
        <>
            <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        {
          bannerList && bannerList.map((banner, inx) => (
            <div className="carousel-item active" key={inx}>
              <a href={banner.url}>
              <img src={import.meta.env.VITE_IMAGE_URL+"banner/"+banner.image} className="d-block w-100" alt="..." />
              </a>
            </div>


          ))
        }

      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
        </>
    )
}
export default HomeSlider