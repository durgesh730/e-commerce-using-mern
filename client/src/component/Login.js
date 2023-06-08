import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import '../style/login.css';
import logimg from "../images/Mobile login-rafiki.png";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Footer from '../component/Footer'
import Navbar from './Navbar';
import { serverhost } from '../host';

const Login = () => {
    const navigate = useNavigate()
    const [passShow, setPassshow] = useState(false);

    const [inpval, setInpval] = useState({
        email: '',
        password: '',
    })

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    const loginuser = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;
        if (email === "") {
            toast("Please Enter the email", {
                autoClose: 3000,
            })
        } else if (!email.includes('@')) {
            toast("Please Enter the valid email", {
                autoClose: 3000,
            })
        } else if (password === " ") {
            toast("Please Enter  Your password", {
                autoClose: 3000,
            })
        } else if (password.length < 6) {
            toast("Password must be 6 characters", {
                autoClose: 3000,
            })
        } else {
            const data = await fetch(`${serverhost}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });
            const res = await data.json();
            console.log(res, "res")
            if (res.status === (201)) {
                toast("Logged In successfully", {
                    autoClose: 3000,
                })
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
                localStorage.setItem("type", res.user.type);
                if (res.user.type === "user") {
                    navigate("/");
                } else {
                    navigate("/admin");
                }
                setInpval({ ...inpval, email: " ", password: "" })
            } else if (res.status !== (201)) {
                toast("Please Enter correct Details", {
                    autoClose: 3000,
                })
            }
        }
    }

    return (
        <>
            <Navbar />
            <section className='container login'>
                <div className='loginimg'>
                    <h2>Welcome to Login</h2>
                    <p>Hi, we are you glad you are back.<br /> Please login</p>
                    <img src={logimg} alt="img"></img>
                </div>
                <div className='form_data'>
                    <form>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name="email" value={inpval.email} id='email' placeholder='Enter Your Email Address' onChange={setVal} />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input type={!passShow ? "password" : "text"} value={inpval.password} name="password" id='password' placeholder='Enter Your password' onChange={setVal} />
                                <div className='showpass' onClick={() => setPassshow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser} >Login</button>
                        <p>Don't have an Account? <Link to="/signup"> Sign Up</Link></p>
                        <p>Forgot Password: <a href='#' > Click Here</a></p>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Login
