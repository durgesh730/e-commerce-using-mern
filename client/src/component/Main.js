import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Footer from './Footer'
import UserPage from './UserPage'
import { serverhost } from '../host'
// import durge from 'module


const Main = () => {

    const [alldata, setAlldata] = useState();

    const getallProduct = () => {
        fetch(`${serverhost}/items`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setAlldata(json);
            });
    }

    const handleSearch = () => {
    }

    useEffect(() => {
        getallProduct();
    }, [])

    return (
        <>
            <Navbar />
            <div className='container' >
                <Search placeholder={"Search"} handleSearch={handleSearch} />
            </div>
            <UserPage alldata={alldata} />
            <Footer />
        </>
    )
}

export default Main
