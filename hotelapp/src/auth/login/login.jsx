import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import env from "react-dotenv";
//import lottie from 'lottie-web';
import axios from 'axios';
import Indicator from '../../components/sharebles/indicator/Indicator';

export default function Login({ loggingin }) {

    const [load, setload] = useState(false);
    const [key, setkey] = useState(null);
    const [reset, setreset] = useState(false);
    const [login, setlogin] = useState(true);

    const handleSubmit = (values) => {

        console.log(values);
        setload(true);
        axios.post(`${process.env.REACT_APP_API_URL}hotelLogin/`, values).then(async (res) => {

            console.log(values);
            if (res.data.status === "Success") {
                await localStorage.setItem("key", res.data.key);
                setkey(res.data.key);
                if (res.data.updatedAt == null) {
                    setreset(true);
                    setlogin(false);
                    setload(false);
                } else {
                    //setkey(res.data.key);
                    loggingin();
                    setload(false);
                    setlogin(false);
                }
            } else {
                alert(res.data.message);
            }

        }).catch((err) => {
            alert(err);
            console.log(err);
            setload(false);
        })
    }


    const handleReset = (values) => {

        console.log(values);
        setload(true);
        axios.patch(`${process.env.REACT_APP_API_URL}hotel/${key}`, {password:values.password}).then(async (res) => {

            if (res.data.status === "Success") {

                //setkey(res.data.key);
                loggingin();
                setload(false);
                await localStorage.setItem("key", res.data.key);
                console.log(localStorage.getItem('key'));

            } else {
                alert(res.data.message);
            }

        }).catch((err) => {
            alert(err);
            console.log(err);
            setload(false);
        })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().max(60).required().email(),
            password: Yup.string().min(6).required()
        }),
        onSubmit: (values) => {

            handleSubmit(values)
        }
    })

    const formikReset = useFormik({
        initialValues: {
            c_password: '',
            password: ''
        },
        validationSchema: Yup.object({
            c_password: Yup.string().max(60).required(),
            password: Yup.string().min(6).required()
        }),
        onSubmit: (values) => {

            if (values.password == values.c_password) {
                handleReset(values)
            } else {
                alert("password must match");
            }
        }
    })
    // const container = useRef(null);

    return (
        <div className="login">
            <div className="fade"></div>
            <div className="container">
                <span className="span-header">Log in</span>
                <div className="form-container">

                    {login ? <form onSubmit={formik.handleSubmit} >
                        <div >

                            <div>
                                <div className="input">
                                    <span className="span-text">E-mail</span><br />
                                    <input onChange={formik.handleChange} value={formik.values.email} className="field" id='email' name="email" type={'email'} placeholder={'E-mail'} />
                                </div> <br />
                                {formik.errors.email ? <span className='error'>{formik.errors.email}</span> : null}
                            </div>

                            <div>
                                <div className="input">
                                    <span className="span-text">Password</span><br />
                                    <input onChange={formik.handleChange} value={formik.values.password} id='password' name="password" className="field" type={'password'} placeholder={'Password'} />
                                </div> <br />
                                {formik.errors.password ? <span className='error'>{formik.errors.password}</span> : null}
                            </div>
                            <Link className="link" to={'/reset'}>
                                <p className="span-reset">Reset password</p><br />
                            </Link>

                            <button onClick={formik.handleSubmit} type='submit' className="btn-submit">Log in</button>

                        </div>
                    </form> : null}

                    {reset ?
                        <form onSubmit={formikReset.handleSubmit}>
                            <div >
                                <div className="input">
                                    <span className="span-text">New password</span><br />
                                    <input onChange={formikReset.handleChange} value={formikReset.values.password} id='password' name="password" className="field" type={'password'} placeholder={'Password'} />
                                    {formikReset.errors.password ? <span className='error'>{formikReset.errors.password}</span> : null}
                          </div>
                                <div className="input">
                                    <span className="span-text">Comfirm pasword</span><br />
                                    <input onChange={formikReset.handleChange} value={formikReset.values.c_password} id='c_password' name="c_password" className="field" type={'password'} placeholder={'Comfirm password'} />
                                    {formikReset.errors.c_password ? <span className='error'>{formikReset.errors.c_password}</span> : null}
                          </div>

                                    <button onClick={formikReset.handleSubmit} type='submit' className="btn-submit">Reset</button>
                                
                            </div>
                        </form> : null
                    }
                </div>

                <p className="span-notice">Be alert that this system is strictly for the registered  hotels within the SunStar administration.</p>


            </div>

            {load ? <div className='indicator' >
                <Indicator />
            </div> : null}
        </div>
    )
}
