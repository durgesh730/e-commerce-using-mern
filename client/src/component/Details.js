import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineStar } from 'react-icons/ai';
import { serverhost } from '../host';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Details = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const cartDat = {
        ItemId: data?.id,
        Count: data?.rating?.count

    }
    const token = localStorage.getItem('token');

    const handleCart = async () => {
        if (token) {
            const cartData = await fetch(`${serverhost}/addcartitem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify(cartDat)
            })
            const res = await cartData.json();
            if (res.status === 200) {
                toast("Item added into cart successfully", {
                    autoClose: 1500,
                })
                navigate("/cart");
            }
        } else (
            navigate("/login")
        )
    }

    const handleform = () => {
        if (token) {
            navigate("/form", { state: { data } });
        } else {
            navigate("/login")
        }
    }

    return (
        <>
            <Navbar />
            <div className='container align-item-center ' >
                <div className=' det d-flex justify-content-center align-item-center '>
                    <div className='details' >
                        <img src={data?.image} alt='img' />
                    </div>

                    <div>
                        <div className='my-1' >
                            <small href="#">{data.title}</small><br />
                        </div>

                        <div className='my-2' >
                            <small href="#" className='rating' >{data?.rating?.rate} <AiOutlineStar /> </small>
                        </div>

                        <div className='my-1' >
                            <small href="#" className='price' >₹  {data?.price}</small><br />
                        </div>

                        <div className='my-1' >
                            <h4> Description</h4>
                            <small href="#" >{data.description}</small><br />
                        </div>

                        <div className='my-4' >
                            <button onClick={handleCart} className='btn-user' exact >Add to cart</button>
                            <button onClick={handleform} className='btn-user mx-4' exact >Order</button>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Details
