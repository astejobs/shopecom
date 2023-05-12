import React, { useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteReview, getProductReviews } from '../../actions/productActions'
import { useState } from 'react'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

const ProductReviews = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productId, setProductId] = useState('')

    const { loading, error, reviews } = useSelector(state => state.productReviews)
    const { isDeleted } = useSelector(state => state.review)
    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
        if (productId !== '') {

            dispatch(getProductReviews(productId))
        }
        if (isDeleted) {
            alert.success('Review Deleted Successfully')
            navigate('/Shopping/admin/users');
            dispatch({ type: DELETE_REVIEW_RESET })

        }


    }, [dispatch, error, alert, isDeleted, navigate, productId])

    const deleteHandler = (id) => {
        dispatch(deleteReview(id, productId))

    }
    const submitHandler = (e) => {

        e.preventDefault();
        dispatch(getProductReviews(productId))


    }



    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: ' SNO',
                    field: 'sno',
                    sort: 'asc'
                },
                {
                    label: ' Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: ' Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },

                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },


                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        reviews && reviews.forEach((review, index) => {
            data.rows.push({
                sno: index + 1,
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <>

                        <Link className=' ml-2 py-1 px-2'><i className='fa fa-trash text-danger' onClick={() => deleteHandler(review._id)}></i></Link>
                    </>
            })

        })
        return data
    }
    return (
        <>
            <MetaData title={'Product Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input type="text" id="email_field" className="form-control" value={productId} onChange={(e) => setProductId(e.target.value)} />
                                    </div>

                                    <button id="search_button" type="submit" className="btn btn-primary btn-block py-2">
                                        SEARCH
                                    </button>
                                </form>
                            </div>
                        </div>
                        {reviews && reviews.length > 0 ? (
                            <>
                                {loading ? <Loader /> : (
                                    <MDBDataTable
                                        data={setReviews()}
                                        className='px-3'
                                        bordered
                                        striped
                                        hover
                                        noBottomColumns={true}
                                    />)

                                }
                            </>
                        ) : (
                            <>
                                <p className="mt-5 text-center">No Reviews</p>

                            </>
                        )
                        }


                    </>
                </div>

            </div>
        </>


    )
}

export default ProductReviews