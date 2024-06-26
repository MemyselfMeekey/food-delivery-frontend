import { Button } from "react-bootstrap";


const SingleMenuGrid = ({ menuDetail, AddtoCart }) => {
    return (
        <div className="col-sm-3">
            <div className="card">
                <img
                    className="card-img-top img-fluid custom-card-img"
                    src={`${import.meta.env.VITE_IMAGE_URL}menu/${menuDetail.images[0]}`}
                    alt={menuDetail.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{menuDetail.name}</h5>
                    <p className="card-text">
                        {menuDetail.discount ? menuDetail.afterDiscount : menuDetail.price}
                    </p>
                    <a href="#" className="btn btn-primary">View Detail</a>
                    <Button className="btn btn-warning mx-2" onClick={() => AddtoCart(menuDetail._id)}>
                        <i className="fa-solid fa-cart-shopping"></i> Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SingleMenuGrid;
