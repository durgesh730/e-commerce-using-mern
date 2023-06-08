import React, { useState } from 'react'
import '../style/user.css'
import '../style/main.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const UserPage = ({ alldata }) => {
    const [show, setShow] = useState(12);
    AOS.init({
        offset: 120,
        delay: 0,
        duration: 1700,
    });

    const handleIncrease = () => {
        let a = show + 8;
        setShow(a);
    }

    return (
        <>
            <div className='container' >
                <div className='heads text-center'>
                    <span>Featured Product <hr /> </span>
                </div>
                {alldata?.length === 0 || alldata === undefined ? (
                    <div class="loader my-4 "></div>
                ) : (
                    <div className='vehicleOthers'>
                        {
                            alldata?.map((item, index) => {
                                return (
                                    <>
                                        {index < show && item.status !== "Booked" ?
                                            <Link key={index} to={'/details'} state={item} className="card my-2 ">
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
                                            </Link>
                                            : ("")
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                )}
            </div>

            <div className='showMore' >
                <button onClick={handleIncrease} className='btn-more'>More</button>
            </div>
        </>
    )
}

export default UserPage
