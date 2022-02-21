import React, { useEffect, useRef, useState } from 'react';
import './verify.css';
import lottie from 'lottie-web';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import env from "react-dotenv";
import Indicator from '../../sharebles/indicator/Indicator';


const Verify =( props ) => {

    const [load, setload] = useState(false);
    const key = props.id;
    console.log(props,key);

    const handleSubmit = (values) => {
        setload(true);
        axios.post(`${process.env.REACT_APP_API_URL}hotel/verify/${key}`, values).then((res) => {
            alert(res.data.message);
            setload(false);
            console.log(res.data.message);
            
        }).catch((err) => {
            alert( err);
            console.log(err);
            setload(false);
        })
    }

    const formik = useFormik({
        initialValues: {
            pin: ''
        },
        validationSchema: Yup.object({
            pin: Yup.string().min(5).max(6).required().matches(/[0-9]{5,6}/, "Invalid pin")

        }),
        onSubmit: values => {
            handleSubmit(values)
        }
    })

    const container = useRef(null)
    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/lottiefiles/89911-3d-persona-header.json'),
        });
        
        console.log(props.params + '=----');
    }, []);

    return (
        <div className="verify">


            <div className="form-container">

                <div className="container" ref={container} />
                <div className="formupdate">
                    <span className="title">Comfirm your email.</span>

                    <form className="form" onSubmit={formik.handleSubmit}>

                            <div className="formshowtop">
                                <span className="hint">Confirm</span>
                                <div className="item">
                                    <input onChange={formik.handleChange} value={formik.values.pin} type={"text"} name='pin' id='pin' placeholder='Pin' className='pininput' /><br />
                                    {formik.errors.pin ? <span className='error'>{formik.errors.pin}</span> : null}
                                </div>
                            </div>

                            <button type='submit' className="btnupdate">Create profile</button>
                    </form>
                </div>
                {load ? <div className='indicator' >
                    <Indicator />
                </div> : null}
            </div>
        </div>
    )
}

export default Verify;