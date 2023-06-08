import React, { useState } from 'react'
import '../style/form.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';


const Form = () => {
  const location = useLocation()
  const dat = location.state.data;

  const navigate = useNavigate()
  const [inVal, setInpval] = useState({
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: ""
  })

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inVal,
        [name]: value
      }
    })
  }

  const handleform = async (e) => {
    e.preventDefault();
    const { phone,
      address,
      pincode,
      city,
      state } = inVal;

    if (phone === '') {
      toast("Enter Your Phone number", {
        autoClose: 3000,
      })
    } else if (phone.length < 10) {
      toast("Enter Your Correct Phone number", {
        autoClose: 3000,
      })
    } else if (address === "") {
      toast("Enter Your Address", {
        autoClose: 3000,
      })
    } else if (pincode === "") {
      toast("Enter Your Pincode", {
        autoClose: 3000,
      })
    } else {
      navigate("/order", { state: { inVal, dat } })
    }
  }

  return (
    <>

      <Navbar />
      <div className='container formfields '>
        <form >
          <h2 className='text-center my-4'>Add Your Details</h2>

          <div className='inputs'>
            <div className="form-group p-3 ">
              <input type="phonenumber" className="form-control" name="phone" value={inVal.phone} id="phonenumber" placeholder="Phone Number" onChange={setVal} minlength="10" />
            </div>
          </div>

          <div className='px-4 ' style={{ fontSize: "1.5rem", padding: "1rem" }} ><small className='text-center my-4'>Enter Your Address Details  </small></div>

          <div className='inputs'>
            <div className="form-group p-3 ">
              <input type="choice1" className="form-control" id="choice1" name="address" value={inVal.address} aria-describedby="emailHelp" placeholder="Address" onChange={setVal} />
            </div>

            <div className="form-group p-3 ">
              <input type="choice2" className="form-control" id="choice2" name="pincode" value={inVal.pincode} placeholder="Address Pincode" onChange={setVal} />
            </div>

            <div className="form-group p-3 ">
              <input type="choice1" className="form-control" id="choice1" name="city" value={inVal.city} aria-describedby="emailHelp" placeholder="City" onChange={setVal} />
            </div>

            <div className="form-group p-3 ">
              <input type="choice1" className="form-control" id="choice1" name="state" value={inVal.state} aria-describedby="emailHelp" placeholder="State" onChange={setVal} />
            </div>
          </div>

          <div className='formbutton my-4'>
            <button type="submit" onClick={handleform} className="btn">Save and Deliver Here</button></div>
        </form>
      </div>

      <Footer />

      <ToastContainer />
    </>
  )
}

export default Form
