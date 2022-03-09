import React, { useState } from 'react';
import './reset.css';
import { Link } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
//import env from "react-dotenv";
//import lottie from 'lottie-web';
import { useFormik } from 'formik';
import axios from 'axios';
import Indicator from '../../components/sharebles/indicator/Indicator';

export default function Reset() {

  const [authorized, setauthorized] = useState(true);
  const [comfirmation, setcomfirmation] = useState(false);
  const [reset, setreset] = useState(false);
  const [key, setkey] = useState(null)

  const [load, setload] = useState(false);
  // const [key, setkey] = useState(null);

  const handleAuthorize = () => {
    setcomfirmation(true);
    setauthorized(false);
    setreset(false);
  }

  const handleComfirmation = () => {
    setcomfirmation(false);
    setauthorized(false);
    setreset(true);
  }

  const handleReset = () => {
    setcomfirmation(true);
    setauthorized(false);
    setreset(false);
    return (<Link to={'/'}></Link>)
  }

  const handleConfirm = (values) => {

    setload(true);
    axios.post(`${process.env.REACT_APP_API_URL}hotelLogin/verify/${key}`, values).then((res) => {

      if (res.data.status === "Success") {
        
          setcomfirmation(false);
          setauthorized(false);
          setreset(true);
          setload(false);
        
      } else {
        alert(res.data.message);
        console.log(res.data.details);
      }

    }).catch((err) => {
      alert(err);
      console.log(err);
      setload(false);
    })
  }

  const handleAuth = (values) => {
    setload(true);
    axios.post(`${process.env.REACT_APP_API_URL}hotelLogin/comfirm`, values).then((res) => {

      if (res.data.status === "Pending") {
        setcomfirmation(true);
        setauthorized(false);
        setreset(false);
        setkey(res.data.key);
        setload(false);
      } else {
        setload(false);
        console.log(res.data);
      }


    }).catch((err) => {
      alert(err + '--');
      console.log(err);
      setload(false);
    })
  }

  const handleReseting = (values) => {
if(values.password == values.comfirmPassword){
    setload(true);
    axios.patch(`${process.env.REACT_APP_API_URL}hotel/${key}`, {password:values.password}).then((res) => {

      if (res.data.status === "Success") {
        
          setload(false);
          return (<Link to={'/'}></Link>)
       
      } else {
        alert(res.data.message);
      }

    }).catch((err) => {
      alert(err+".");
      console.log(err);
      setload(false);
    })
  }else{
    console.log("password must match");
  }
  }

  const formikAuthorize = useFormik({
    initialValues: {
      email: '',
      companyId: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().max(60).required().email(),
      companyId: Yup.string().min(6).required()
    }),
    onSubmit: (values) => {
      console.log(values);
      handleAuth(values)
    }
  })

  const formikComfirm = useFormik({
    initialValues: {
      pin: '',

    },
    validationSchema: Yup.object({
      pin: Yup.string().min(5).max(6).required().matches(/[0-9]{5,6}/, "Invalid pin"),

    }),
    onSubmit: (values) => {

      handleConfirm(values)
    }
  })

  const formikReset = useFormik({
    initialValues: {
      password: '',
      comfirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().max(60).required(),
      comfirmPassword: Yup.string().min(6).required()
    }),
    onSubmit: (values) => {

      handleReseting(values)
    }
  })

  return (
    <div className="reset">
      <div className="fade"></div>
      <div className="container">
        <span className="span-header">Reset Password</span>
        <div className="form-container">
          {reset ?
            <form onSubmit={formikReset.handleSubmit}>
              <div >
                <div>
                  <div className="input">
                    <span className="span-text">New password</span><br />
                    <input onChange={formikReset.handleChange} value={formikReset.values.password} id='password' name="password" className="field" type={'password'} placeholder={'Password'} />
                  </div> <br />
                  {formikReset.errors.password ? <span className='error'>{formikReset.errors.password}</span> : null}
                </div>
                <div>
                  <div className="input">
                    <span className="span-text">Comfirm pasword</span><br />
                    <input onChange={formikReset.handleChange} value={formikReset.values.comfirmPassword} id='comfirmPassword' name="comfirmPassword" className="field" type={'password'} placeholder={'Comfirm password'} />
                  </div>
                  {formikReset.errors.comfirmPassword ? <span className='error'>{formikReset.errors.comfirmPassword}</span> : null}
                </div>

                <button type='submit' className="btn-submit">Reset</button>
              </div>
            </form> : null}

          {authorized ?
            <form onSubmit={formikAuthorize.handleSubmit}>
              <div >
                <div>
                  <div className="input">
                    <span className="span-text">E-mail</span><br />
                    <input onChange={formikAuthorize.handleChange} value={formikAuthorize.values.email} id='email' name="email" className="field" type={'email'} placeholder={'E-mail'} />
                  </div>  <br />
                  {formikAuthorize.errors.email ? <span className='error'>{formikAuthorize.errors.email}</span> : null}
                </div>
                <div>
                  <div className="input">
                    <span className="span-text">company ID</span><br />
                    <input onChange={formikAuthorize.handleChange} value={formikAuthorize.values.companyId} id='companyId' name="companyId" className="field" type={'text'} placeholder={'company id/CK number'} />
                  </div> <br />
                  {formikAuthorize.errors.companyId ? <span className='error'>{formikAuthorize.errors.companyId}</span> : null}
                </div>

                <button type='submit' className="btn-submit">Identify</button>
              </div>
            </form> : null}

          {comfirmation ?
            <form onSubmit={formikComfirm.handleSubmit}>
              <div >
                <div>
                  <div className="input">
                    <span className="span-text">OTP</span><br />
                    <input onChange={formikComfirm.handleChange} value={formikComfirm.values.pin} id='pin' name="pin" className="field" type={'number'} placeholder={'pin'} />
                  </div> <br />
                  {formikComfirm.errors.pin ? <span className='error'>{formikComfirm.errors.pin}</span> : null}
                </div>

                <button type='submit' className="btn-submit">Comfirm</button>
              </div>
            </form> : null}
        </div>

        {load ? <div className='indicator' >
          <Indicator />
        </div> : null}
      </div>


    </div>
  )
}
