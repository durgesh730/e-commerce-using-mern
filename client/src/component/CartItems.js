import React, { useEffect, useState } from 'react'
import { serverhost } from '../host';
import { AiOutlineStar } from 'react-icons/ai';

const CartItems = ({ item }) => {
    const [cartdata, setcartData] = useState();
    const GetCartData = async () => {
        const response = await fetch(`${serverhost}/forcartitems/${item}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();
        setcartData(json);
    }

    useEffect(() => {
        GetCartData();
    }, [])

    return (
        <>
            {
                cartdata?.map((items, index) => {
                    return (
                        <>
                            <div className=' det cartdet d-flex  align-item-center '>

                                <div className='details' >
                                    <img src={items?.image} alt='img' />
                                </div>

                                <div>
                                    <div className='my-1' >
                                        <small href="#">{items.title}</small><br />
                                    </div>

                                    <div className='my-2' >
                                        <small href="#" className='rating' >{items?.rating?.rate} <AiOutlineStar /> </small>
                                    </div>

                                    <div className='my-1' >
                                        <small href="#" className='price' >₹  {items?.price}</small><br />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }

        </>
    )
}

export default CartItems
