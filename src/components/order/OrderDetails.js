import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderActions';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { Fragment } from 'react';


const OrderDetails = () => {
    const alert = useAlert();
    const { id } = useParams();
    console.log(id)

    const dispatch = useDispatch();

    const { loading, error, order } = useSelector(state => state.orderDetails);
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(id))
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert, id])
  

    const shippingDetails = shippingInfo && `${shippingInfo.address},
         ${shippingInfo.city},${shippingInfo.postalCode},${shippingInfo.country}`;

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

    return (
        <Fragment>
            <MetaData title={'Order Details'} />
            {
                loading ? <Loader /> :

                    <>
                        <div className="row d-flex mx-5 justify-content-between">
                            <div className="col-12 col-lg-8 mt-5 order-details">

                                <h2 className="my-5">Order # {order && order._id}</h2>

                                <h4 className="mb-4">Shipping Info</h4>
                                <p><b>Name:</b> {user && user.name}</p>
                                <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                <p className="mb-4"><b>Address:</b>{shippingDetails && shippingDetails}</p>
                                <p><b>Amount:</b> ₹{totalPrice}</p>

                                <hr />

                                <h4 className="my-4">Payment</h4>
                                <p className={isPaid ? "greenColor" : "redColor"} ><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>


                                <h4 className="my-4">Order Status:</h4>
                                <p className={orderStatus && String(orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{order && order.orderStatus}</b></p>


                                <h4 className="my-4">Order Items:</h4>

                                <hr />
                                <div className="cart-item my-1">
                                    {orderItems && orderItems.map(item => (
                                        <div key={item.product} className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-5">
                                                <Link to={`/Shopping/products/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>₹{item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>

                                    ))}

                                </div>
                                <hr />
                            </div>
                        </div>
                    </>
            }
        </Fragment>
    )

}

export default OrderDetails