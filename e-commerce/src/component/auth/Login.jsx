import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import '../../assert/css/auth.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './auth';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setSuccess(data.message);
                    localStorage.setItem('token', data.token);
                  
                    localStorage.setItem('email', user.email); // Store email in local storage
                    localStorage.setItem('cart', JSON.stringify([])); // Initialize cart as an empty array
                   
                    toast.success(data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    login();
                    navigate('/')
                } else {
                    setError(data.message);
                    toast.error(data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setSuccess(null);
                }
            })
            .catch(error => {
                setError('Internal Server Error');
                setSuccess(null);
            });
    };
    const handleGoogleLogin = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential);

      
        if (decoded) {
         
            localStorage.setItem('token', credentialResponse.credential);
          
            login();
          
            navigate('/');
        } else {
            console.log('Google login failed');
        }
    };
    return (
        <div>
            <ToastContainer />
            <div className="container">
                <div className="row py-5 mt-4 align-items-center">

                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                        <h1>Login your Account</h1>
                        <p className="font-italic text-muted mb-0">"Revolutionizing industries with innovative solutions, our company pioneers cutting-edge technologies to empower businesses and enhance customer experiences globally."</p>
                        {/* <p className="font-italic text-muted">Snippet By <a href="https://bootstrapious.com" className="text-muted">
                            <u>Bootstrapious</u></a>
                        </p> */}
                    </div>


                    <div className="col-md-7 col-lg-6 ml-auto">
                        <form action="#" >



                            <div className="input-group col-lg-12 mb-4">
                                <div className="input-group-prepend">
                                    <span className="icon input-group-text bg-white px-4 border-md border-right-0">
                                        <MdOutlineEmail />
                                    </span>
                                </div>
                                <input type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    required className="form-control bg-white border-left-0 border-md" />
                            </div>









                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="icon input-group-text bg-white px-4 border-md border-right-0">
                                        <RiLockPasswordLine />
                                    </span>
                                </div>
                                <input type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange} className="form-control bg-white border-left-0 border-md" />
                            </div>




                            <div className="form-group col-lg-12 mx-auto mb-0">
                                <a href="#" onClick={handleSubmit} className="btn btn-primary btn-block py-2">
                                    <span className="font-weight-bold">Login</span>
                                </a>
                            </div>


                            <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                                <div className="border-bottom w-100 ml-5"></div>
                                <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                                <div className="border-bottom w-100 mr-5"></div>
                            </div>


                            <div className="form-group col-lg-12 mx-auto">
                                <a href="#" className="btn btn-primary btn-block py-2 btn-facebook">

                                    <span className="font-weight-bold">
                                          <GoogleLogin
                                            onSuccess={handleGoogleLogin}
                                            onError={() => console.log('Google login failed')}
                                        />
                                        {/* Continue with Google */}
                                        </span>
                                </a>
                                <a href="#" className="btn btn-primary btn-block py-2 btn-twitter">
                                    <FaTwitter />
                                    <span className="font-weight-bold">Continue with Twitter</span>
                                </a>
                            </div>


                            <div className="text-center w-100">
                                <p className="text-muted font-weight-bold">Are you Registered? <a href="/singup" className="text-primary ml-2">Signup</a></p>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
            {/* <Form onSubmit={handleSubmit}>
     
        <Form.Group classNameName="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <Form.Text classNameName="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group classNameName="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group classNameName="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form> */}
        </div>
    );
};

export default Login;