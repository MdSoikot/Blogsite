import React from 'react';
import { useState } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import axios from 'axios';
// import swal from '@sweetalert/with-react';



export default function Register(props) {
    const testData = {
        username: "",
        email: "",
        password: ""
    }
    const [register, addRegister] = useState(testData);

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [showSignUp, setshowSignUp] = useState(false);
    const [succesSignin, setsuccesSignin] = useState(false);

    const enableSignUp = () => {
        setshowSignUp(true);
        // setshowSignIn(false)

    }
    const enableSignIn = () => {
        // setshowSignIn(true);
        setshowSignUp(false);

    }

    const signUphandleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        addRegister({ ...register, [name]: value });

    }


    const signInhandleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });

    }

    const history = useHistory();
    const registerUrl = "http://127.0.0.1:8000/api/storeuser"
    const signUp = (e) => {
        e.preventDefault();
        axios.post(registerUrl, register)
            .then(res => {
                if (res.status === 200) {
                    // setshowSignIn(true);
                    setshowSignUp(false);
                    console.log(res)
                }
                else {
                    return "failed"
                }
            })
            .catch(error => {
                console.log(error)

            })

    }

    // const signinUrl = "http://blogsite.test/api/auth/authLogin";
    // const signinUrl = instance.defaults.baseURL;

    const signin = (e) => {
        e.preventDefault();
        setsuccesSignin(false);

        axios.post('api/auth/authLogin', loginData)
            .then(res => {
                setsuccesSignin(true);
                if (res.data.access_token) {
                    // swal.close()
                    history.push("HomePage");
                    const token = res.data.access_token;
                    props.authenticateUser(token);

                }
                else {

                    return "failed"

                }
            })
            .catch(error => {
                console.log(error)

            })

    }
    if (props.isAuthenticated && props.location.state !== undefined) {
        return (
            <Redirect to={props.location.state.from} />
        );
    }
    return (
        <>
            <div className="main">
                <div className="register">
                    {showSignUp ?
                        <div className="signup">
                            <form className="form" onSubmit={signUp}>
                                <h2 className="mb-10">Sign Up</h2>
                                <label className="title_label mb-10">Username:</label>
                                <input className="br-10" type="text" name="username" onChange={signUphandleChange}></input>

                                <label className="title_label mb-10 mt-10">Email:</label>
                                <input className="br-10" type="email" name="email" onChange={signUphandleChange}></input>

                                <label className="title_label mb-10 mt-10">Password:</label>
                                <input className="br-10" type="password" name="password" onChange={signUphandleChange}></input>
                                {/* <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span> */}

                                <label className="title_label mb-10 mt-10">Confirm Password:</label>
                                <input className="br-10" type="password" name="cpassword" onChange={signUphandleChange}></input>

                                <button type="submit" className="save_btn mt-10 br-10">Register</button>

                            </form>
                            <div className="footer ">
                                <button type="button" onClick={enableSignIn} className="mb-20">Sign In</button>
                            </div>

                        </div>
                        :
                        // : props.isAuthenticated ?"already logged in":
                        <div className="signin">
                            <form className="form login" onSubmit={signin}>
                                <h2 className="mb-10">Sign In</h2>

                                <label className="title_label mb-10 mt-10">Email:</label>
                                <input className="br-10" type="email" name="email" onChange={signInhandleChange} required></input>

                                <label className="title_label mb-10 mt-10">Password:</label>
                                <input className="br-10" type="password" name="password" onChange={signInhandleChange} required></input>

                                <button type="" className="save_btn mt-10 br-10">Log In</button>

                            </form>
                            {succesSignin ?"Successfully logged in"
                            //  swal({
                            //     title: "Good job!",
                            //     text: "Successfully logged in",
                            //     icon: "success",
                            //     buttons:false

                        
                            // }) 
                            : ""}

                            <div className="footer ">
                                <button className="mb-10">Forgot Password</button>
                                <button className="mb-20 mt-5" onClick={enableSignUp}>Sign Up</button>
                            </div>
                        </div>

                    }
                </div>
            </div>
        </>
    )
}
