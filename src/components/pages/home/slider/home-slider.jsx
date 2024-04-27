import Banner1 from "../../../../assets/images/Banner1.jpeg"
import Banner2 from "../../../../assets/images/Banner2.png"
import Banner5 from "../../../../assets/images/Banner5.jpeg"
import "./home-slider.css"
const HomeSlider = () => {
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide mt-3">
                <div className="carousel-indicators" >
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" ></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner mx-2 w-100">
                    <div className="carousel-item active c-item">
                        <img src={Banner1} style={{maxWidth:"100", height:"auto",maxHeight:"100%"}} />
                    </div>
                    <div className="carousel-item c-item">
                        <img src={Banner2} className="d-block img-fluid c-img"  />
                    </div>
                    <div className="carousel-item c-item">
                        <img src={Banner5} className="d-block c-img" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}
export default HomeSlider