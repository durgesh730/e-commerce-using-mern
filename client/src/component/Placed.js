import React, { useEffect, useState } from 'react'
import { serverhost } from '../host';

const Placed = ({ item }) => {

    const [alldata, setcartData] = useState();
    const getallProduct = () => {
        fetch(`${serverhost}/forcartitems/${item}`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setcartData(json);
            });
    }

    useEffect(() => {
        getallProduct();
    }, [])

    return (
        <>
            <div className='container' >
                {/* {alldata?.length === 0 || alldata === undefined ? (
                    <div class="loader my-4 "></div>
                ) : ( */}
                    <div className='vehicleOthers'>
                        {
                            alldata?.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="card my-2 ">
                                            <div className="card-body">
                                                <img src={item.image} alt='img' />

                                                <div className='loadCapacity my-3'>

                                                    <div>
                                                        <span href="#" className=" mx-3 ">{item?.title.slice(0, 25)}</span>
                                                    </div>
                                                </div>

                                                <div className='loadCapacity my-2'>
                                                    <div>
                                                        <span href="#" className=" mx-3 ">Form ₹ {item?.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                {/* )} */}
            </div>

        </>
    )
}

export default Placed
