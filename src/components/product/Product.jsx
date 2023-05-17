import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3" >
            <div className="card c1 p-3 rounded">
                    <img
                        className="card-img-top mx-auto"
                        src={product.images[0] && product.images[0].url}
                        alt='img' />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/Shopping/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.reviews && product.reviews.length} Reviews)</span>
                    </div>
                    <p className="card-text">&#8377;{product.price}</p>
                    <Link to={`/Shopping/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
        )
}

export default Product