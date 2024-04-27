const SingleMenuGrid = ({ menuDetail }) => {
    return (
        <>

                    <div className="col-sm-3">
                <div className="card">
                        <img className="card-img-top" src={menuDetail.image} />
                        <div className="card-body">
                            <h5 className="card-title">{menuDetail.title}</h5>
                            <p className="card-text">{menuDetail.price}</p>
                            <a href="#" className="btn btn-primary">View Detail</a>
                        </div>
                    </div>
                    </div>
             
        
        </>
    )
}
export default SingleMenuGrid