const SingleMenuGrid = ({ menuDetail }) => {
    return (
        <>

                    <div className="col-sm-3">
                <div className="card">
                        <img className="card-img-top" src={import.meta.env.VITE_IMAGE_URL + "menu/" + menuDetail.images[0]} />
                        <div className="card-body">
                            <h5 className="card-title">{menuDetail.name}</h5>
                            <p className="card-text">{menuDetail.discount?menuDetail.afterDiscount:menuDetail.price}</p>
                            <a href="#" className="btn btn-primary">View Detail</a>
                        </div>
                    </div>
                    </div>
             
        
        </>
    )
}
export default SingleMenuGrid