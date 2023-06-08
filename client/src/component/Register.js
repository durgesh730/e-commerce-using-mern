import React, { useState } from 'react';
import '../style/ragister.css';
import ragimg from "../images/Mobile login-pana.png"
import Footer from '../component/Footer'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Navbar';
import { serverhost } from '../host';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [passShow, setPassshow] = useState(false);
    const [cpassShow, setCPassshow] = useState(false);
    const location = useLocation();
    const typeUser = location.state;
    const type = typeUser;

    const [inpval, setInpval] = useState({
        fname: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === '') {
            toast("Enter Your Name", {
                autoClose: 1500,
            })
        } else if (email === "") {
            toast("Enter Your Email Id", {
                autoClose: 1500,
            })
        } else if (!email.includes('@')) {
            toast("Please Enter valid email", {
                autoClose: 1500,
            })
        } else if (password === " ") {
            toast("Enter Your Password", {
                autoClose: 1500,
            })
        } else if (password.length < 6) {
            toast("Password must be 6 characters", {
                autoClose: 1500,
            })
        } else if (cpassword === " ") {
            alert('')
            toast("Please Enter Your Confirm password", {
                autoClose: 1500,
            })
        } else if (cpassword.length < 6) {
            toast("Password must be 6 characters", {
                autoClose: 1500,
            })
        } else if (password !== cpassword) {
            toast("Password no match", {
                autoClose: 1500,
            })
        } else {
            const data = await fetch(`${serverhost}/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, type
                })
            });

            const res = await data.json();
            if (res.status === (201) && "u") {
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
                localStorage.setItem("type", res.user.type);
                toast("Registration done successfully", {
                    autoClose: 1500,
                })
                setInpval({ ...inpval, fname: " ", email: " ", password: "", cpassword: "" })
                if(res.user.type === "user"){
                    navigate("/");
                }else{
                    navigate("/admin");
                }
            } else {
                toast("Please Enter Correct Details!", {
                    autoClose: 1500,
                })
            }
        }
    }

    return (
        <>
            <Navbar />
            <section className='container ragister'>

                <div className='ragisterimg'>
                    {typeUser === "user" ?
                        <h2>Looks like you're <br></br> new here!</h2>
                        :
                        <h1>Admin</h1>
                    }
                    <span>Sign up with your Email <br /> to get started</span> <br /> <br />
                    <img src={ragimg} alt="img" ></img>
                </div>

                <div className='form_data'>
                    <form>
                        <div className='form_input'>
                            <label htmlFor='fname'>Name</label>
                            <input type='text' onChange={setVal} value={inpval.fname} name="fname" id='fname' placeholder='Enter Your Name' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' onChange={setVal} value={inpval.email} name="email" id='email' placeholder='Enter Your Email Address' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two' >
                                <input onChange={setVal} type={!passShow ? "password" : "text"} value={inpval.password} name="password" id='password' placeholder='Enter Your passsword' />
                                <div className='showpass' onClick={() => setPassshow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className='form_input'>
                            <div className='two' >
                                <input onChange={setVal} type={!cpassShow ? "password" : "text"} name="cpassword" value={inpval.cpassword} id='cpassword' placeholder='Confirm Password' />
                                <div className='showpass' onClick={() => setCPassshow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata} >Continue</button>
                        <p>Signup as Admin:? <Link to="/signup"> Sign Up</Link></p>
                    </form>
                </div>
            </section>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default Register
