import React, { useState } from 'react'
import "../style/navbar.css"
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { BsArrowReturnLeft, BsFillPersonFill, BsBoxArrowRight } from 'react-icons/bs';

const Navbar = () => {
  var [isShown] = useState(false);
  const navigate = useNavigate()

  const handleClick = () => {
    if (isShown === false) {
      document.getElementById('SideNav').style.width = "170px"
      isShown = true;
    } else {
      document.getElementById('SideNav').style.width = "0px"
      isShown = false;
    }
  };

  const CloseNav = () => {
    document.getElementById('SideNav').style.width = "0px"
  }

  const token = localStorage.getItem('token');
  const type = localStorage.getItem('type');
  const userData = localStorage.getItem('user');
  const users = JSON.parse(userData);


  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
    toast("You are Logged Out successfully", {
      autoClose: 3000,
    })
  }

  return (
    <>
      <div className='Navbar'>
        <div className='container'>
          <nav>
            <div className='logo'><Link to="/" >e-commerce</Link></div>
            <div className='RightNav'>
              {
                type === "admin" ?
                  <>
                    <Link className='newtab' to='/placed'>Placed Orders</Link>
                    <Link className='newtab' to='/admin'>Count</Link>
                    <Link className='newtab' to='/' onClick={handleLogout} >Logout</Link>
                  </>
                  :
                  <>
                    {type === "user" ?
                      <>
                        <Link className='newtab' to='/cart'>Cart</Link>
                        <Link className='newtab' to='/' onClick={handleLogout} >Logout</Link>
                      </>
                      : ("")}
                    {(!token) ?
                      <>
                        <Link to='/login' className='logintab' >Login</Link>
                        <Link to='/signup' className='signuptab' state={"user"} > Signup <BsBoxArrowRight /> </Link>
                        <Link to='/signup' className='logintab' state={"admin"} > Admin <BsBoxArrowRight /> </Link>
                      </> : ('')}
                  </>
              }
              <span className='avtar' to='/signup'><BsFillPersonFill /><small >{users ? users.name : "No Login "} </small> </span>
              <span className='Bars' onClick={handleClick}><FaBars /></span>
            </div>
          </nav>
        </div >

        <div className='Sidenav' id='SideNav'>
          <span onClick={CloseNav} id="Close" style={{ fontSize: "1.5rem" }} ><BsArrowReturnLeft /></span>
          <Link to='/signup'><BsFillPersonFill /><small >{users ? users.fname : "No Login "}</small> </Link>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
          <Link onClick={handleLogout} id='logout' >Logout</Link>
        </div>
      </div >
    </>
  )
}

export default Navbar
