import React, { useEffect, useState } from 'react'
import { serverhost } from '../host';
import { AiOutlineStar } from 'react-icons/ai';

const CartItems = ({ item, GetCartData }) => {
    const [cartdata, setcartData] = useState();
    const CartData = async () => {
        const response = await fetch(`${serverhost}/forcartitems/${item?.ItemId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();
        setcartData(json);
    }

    const handledelete = async () => {
        const response = await fetch(`${serverhost}/deletecartItem/${item._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();
        if (json.status === 200) {
            GetCartData();
        } else {
            console.log("Some error occured");
        }
    }

    useEffect(() => {
        CartData();
    }, [])

    return (
        <>
            {
                cartdata?.map((items, index) => {
                    return (
                        <>
                            <div className='d-flex det justify-content-between' >

                                <div className=' det cartdet d-flex  align-item-center'>
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

                                <div>
                                    <button onClick={() => { handledelete(items._id) }} className='btn-del mx-4' exact >Delete</button>
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
