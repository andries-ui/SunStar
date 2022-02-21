import React, { useEffect, useRef, useState } from 'react';
import './hotelform.css';
import { PhoneSharp, Publish } from '@mui/icons-material';
import { Divider } from '@mui/material';
import lottie from 'lottie-web';
import Indicator from '../../../sharebles/indicator/Indicator';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import env from "react-dotenv";
import Verify from '../../verify/Verify';
import { Link } from 'react-router-dom';




export default function HotelForm() {

    const [load, setload] = useState(false);
    const [key, setkey] = useState(null);
    const [verify, setverify] = useState(false);

    const handleSubmit = (values) => {

        setload(true);
        axios.post(`${process.env.REACT_APP_API_URL}hotel/`, values).then((res) => {

            setkey(res.data.key);

            axios.post(`${process.env.REACT_APP_API_URL}account/`, { userId: res.data.key }).then((results) => {
                alert(results.data.message);
                setload(false);
                setverify(true);
                console.log(results.data.key);
            }).catch((err) => {
                alert(err);
            })

        }).catch((err) => {
            alert(err);
            console.log(err);
            setload(false);
        })
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            taxNumber: '',
            contact: '',
            email: '',
            companyId: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(30).required().matches(/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/, "Invalid Hotel name"),
            taxNumber: Yup.string().max(30).required().length(10),
            contact: Yup.string().max(30).required().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Invalid contact"),
            email: Yup.string().max(30).required().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
            companyId: Yup.string().max(30).required().matches(/^((19|20)[\d]{2}[/][\d]{6}[/][\d]{2})$/, "This value is invalid")
        }),
        onSubmit: values => {
            handleSubmit(values)
        }
    })
    const container = useRef(null);



    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../../assets/lottiefiles/67986-business-deal.json'),
        });

        console.log(key + '====');
    }, [])


    return (
        <div className="form">

            <div className="formcontainer">

                <div className="formupdate">
                    <span className="title">Create hotel profile</span>

                    <form className="form" onSubmit={formik.handleSubmit}>

                        <div>
                            <div className="update">
                                <div className="left">
                                    <div className="formshowtop">
                                        <span className="hint">Hotel Name</span>
                                        <div className="item">
                                            <input onChange={formik.handleChange} value={formik.values.name} type={"text"} name='name' id='name' placeholder='Sunstar hotel' className='input' /><br />
                                            {formik.errors.name ? <span className='error'>{formik.errors.name}</span> : null}
                                        </div>

                                    </div>
                                    <div className="formshowtop">
                                        <span className="hint">Company ID/CK number</span> <br />
                                        <div className="item">
                                            <input onChange={formik.handleChange} value={formik.values.companyId} type={"text"} name='companyId' id='companyId' placeholder='CK number' className='input' />
                                            {formik.errors.companyId ? <span className='error'>{formik.errors.companyId}</span> : null}
                                        </div>

                                    </div>
                                    <div className="formshowtop">
                                        <span className="hint">Tax number</span> <br />
                                        <div className="item">
                                            <input onChange={formik.handleChange} value={formik.values.taxNumber} type={"number"} name='taxNumber' id='taxNumber' placeholder='Tax number' className='input' />
                                            {formik.errors.taxNumber ? <span className='error'>{formik.errors.taxNumber}</span> : null}
                                        </div>

                                    </div>
                                    <div className="formshowtop">
                                        <span className="hint">E-mail</span> <br />
                                        <div className="item">
                                            <input onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' placeholder='names' className='input' />
                                            {formik.errors.email ? <span className='error'>{formik.errors.email}</span> : null}
                                        </div>

                                    </div>
                                    <div className="formshowtop">
                                        <span className="hint">Contact</span> <br />
                                        <div className="item">
                                            <input onChange={formik.handleChange} value={formik.values.contact} type="number" name='contact' id='contact' placeholder='names' className='input' />
                                            {formik.errors.contact ? <span className='error'>{formik.errors.contact}</span> : null}
                                        </div>

                                    </div>
                                </div>
                                <div className="right">

                                    <div className="frame" ref={container}>

                                    </div>
                                </div>
                            </div>
                            <button type='submit' className="btnupdate">Create profile</button>
                        </div>
                    </form>
                </div>
                {load ? <div className='indicator' >
                    <Indicator />
                </div> : null}

                {verify ? <div className="verify">
                    <Verify id={key} />
                </div> : null}

            </div>

        </div >
    )
}
