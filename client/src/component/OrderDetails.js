import React from 'react'
import { AiOutlineStar } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { serverhost } from '../host';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const OrderDetails = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const items = location.state.inVal;
    const data = location.state.dat;

    const token = localStorage.getItem('token');
    const count = data?.rating?.count;

    const AddAllData = async () => {
        const da = await fetch(`${serverhost}/SaveOrderDetails`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ items, data })
        });
        const res = await da.json();
        if (res.status === (200)) {
            toast("Order Placed successfully", {
                autoClose: 2000,
            })
            navigate("/")
        }
    }

    const updateCount = async () => {
        const reducecount = count - 1;
        const da = await fetch(`${serverhost}/updatecount/${data._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({reducecount, data})
        });
        const res = await da.json();
    }

    const handleOrder = () => {
        if (token) {
            AddAllData();
            updateCount();
        } else {
            navigate('/login');
        }
    }


    return (
        <>
            <Navbar />
            <div className='container align-item-center ' >
                <div className='det' >
                    <div className='text-center' >
                        <h2>Order Details</h2>
                    </div>
                    <div className=' od d-flex justify-content-center' >

                        <div className='details' >
                            <img src={data?.image} alt='img' />
                        </div>
                        <div>
                            <div className='my-1' >
                                <small href="#">{data?.title}</small><br />
                            </div>

                            <div className='my-2' >
                                <small href="#" className='rating' >{data?.rating.rate} <AiOutlineStar /> </small>
                            </div>

                            <div className='my-1' >
                                <small href="#" className='price' >₹  {data?.price}</small><br />
                            </div>

                            <div className='my-1' >
                                <h4> Description</h4>
                                <small href="#" >{data?.description}</small><br />
                            </div>
                        </div>
                    </div>
                    <div className='address' >
                        <h5>Address Details</h5>
                        <div>
                            {items.address}, {items.city}, {items.state}, {items.pincode}
                        </div>
                    </div>
                </div>

                <div className='my-4 buttonsoerder text-center' >
                    <button onClick={handleOrder} className='btn-user' exact >Order Know</button>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default OrderDetails
