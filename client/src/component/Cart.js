import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { serverhost } from '../host'
import CartItems from './CartItems'

const Cart = () => {
    const [cartdata, setcartData] = useState();
    const GetCartData = async () => {
        const response = await fetch(`${serverhost}/getcartItem`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        })
        const json = await response.json();
        setcartData(json);
    }

    useEffect(() => {
        GetCartData();
    }, [])

    return (
        <>
            <Navbar />
            <div className='container' >
                {cartdata?.length === 0 || cartdata === undefined ?
                    <div class="loader my-4 "></div>
                    :
                    <>
                        {
                            cartdata?.map((ite, ind) => {
                                return (
                                    <>
                                        <CartItems key={ind} item={ite} GetCartData={GetCartData} />
                                    </>
                                )
                            })
                        }

                    </>
                }
            </div>
            <Footer />
        </>
    )
}

export default Cart
