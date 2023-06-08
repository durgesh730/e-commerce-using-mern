import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Footer from './Footer'
import { serverhost } from '../host';
import Placed from './Placed';

const PlacedItems = () => {

    const [cartdata, setcartData] = useState();

    const GetCartData = async () => {
        const response = await fetch(`${serverhost}/palcedItems`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
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

            {cartdata === undefined || cartdata?.length === 0 ?
                <div class="loader my-4 "></div>
                :
                cartdata?.map((item, index) => {
                    return (
                        <Placed key={index} item={item.id} />
                    )
                })
            }
            <Footer />
        </>
    )
}

export default PlacedItems
