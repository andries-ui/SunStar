import React, { useEffect, useRef, useState } from 'react';
import './form.css';
import { ImageRounded, KingBed, LocalParking, Park, ParkOutlined, PhoneSharp, PictureAsPdf, PictureInPictureAlt, Publish, Security, Tv, Wifi } from '@mui/icons-material';
import { Divider } from '@mui/material';
import lottie from 'lottie-web';
import Indicator from '../../../sharebles/indicator/Indicator';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import env from "react-dotenv";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Form() {

    const container = useRef(null);

    const [load, setload] = useState(false);
    const [key, setkey] = useState(null);
    const [verify, setverify] = useState(false);

    const [parking, setparking] = useState(false);
    const [wifi, setwifi] = useState(false);
    const [secured, setsecured] = useState(true);
    const [tv, settv] = useState(false);
    const [images, setimages] = useState([]);
    const [base64, setbase64] = useState([]);
    const [imageurl, setimageurl] = useState([]);
    const handleParking = () => {

        parking ? setparking(false) : setparking(true);

    }

    const handleWifi = () => {

        wifi ? setwifi(false) : setwifi(true);
    }
    const handleSecured = () => {

        secured ? setsecured(false) : setsecured(true);
    }

    const handleTv = () => {

        tv ? settv(false) : settv(true);
    }
    const onImageChange = (e) => {
        setimages([...e.target.files]);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    }


    const handleSubmit = async (values) => {

        let key = await localStorage.getItem("key");
        console.log(imageurl);
        setload(true);


        const data = {
            type: values.type,
            price: values.price,
            floor: values.floor,
            roomNumber: values.roomNumber,
            hotelId: key
        }
        axios.post(`${process.env.REACT_APP_API_URL}room`, data).then((res) => {

            setkey(res.data.key);

            if (res.data.status == "Success") {
                const property_data = {
                    bedtype: values.bedtype,
                    tv: tv,
                    wifi: wifi,
                    parking: parking,
                    desc: { item: "item" },
                    images: imageurl,
                    numberOfBed: 1,
                    roomId: res.data.key

                }

                axios.post(`${process.env.REACT_APP_API_URL}property/`, property_data).then((results) => {
                    alert(results.data.message);
                    setload(false);
                    setverify(true);
                    console.log(results.data);
                }).catch((err) => {
                    alert(err + "==");
                })
            } else {

            }

        }).catch((err) => {
            alert(err);
            console.log(err);
            setload(false);
        })
    }

    const formik = useFormik({
        initialValues: {
            type: '',
            roomNumber: '',
            floor: '',
            price: '',
            bedtype: '',

        },
        validationSchema: Yup.object({
            type: Yup.string().min(2).max(30).required(),
            roomNumber: Yup.string().min(2).max(4).required(),
            floor: Yup.string().min(2).max(4).required(),
            price: Yup.string().min(2).max(10).required(),
        }),
        onSubmit: values => {
            console.log(values);
            handleSubmit(values)
        }
    })

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: require('../../../../assets/lottiefiles/33886-check-okey-done.json'),
        });

    })

    useEffect(() => {
        if (images.length < 1) return;

        const newImageUrl = [];
        images.forEach(async (image) => {
            const base64 = await convertBase64(image);
            newImageUrl.push(base64);

        });
        setimageurl(newImageUrl);
        
    }, [images]);

    return (
        <div className="form">

            <div className="formcontainer">

                <div className="formupdate">
                    <h2 className="title">Add a room</h2>
                    <form onSubmit={formik.handleSubmit}>

                        <div>
                            <div className="row">
                                <div className="formshowtop">
                                    <span className="hint">Room type</span>
                                    <div className="item">
                                        <input onChange={formik.handleChange} value={formik.values.type} type={"text"} name='type' id='type' placeholder='Room Type' className='input' /><br />
                                        <div className='error-container'>
                                            {formik.errors.type ? <p className='error'>{formik.errors.type}</p> : null}
                                        </div>
                                    </div>

                                </div>
                                <div className="formshowtop">
                                    <span className="hint">Room Number</span>
                                    <div className="item">
                                        <input onChange={formik.handleChange} value={formik.values.roomNumber} type={"text"} name='roomNumber' id='roomNumber' placeholder='Room Number' className='input' /><br />
                                        <div className='error-container'>
                                            {formik.errors.roomNumber ? <p className='error'>{formik.errors.roomNumber}</p> : null}
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="row">
                                <div className="formshowtop">
                                    <span className="hint">Floor</span>
                                    <div className="item">
                                        <input onChange={formik.handleChange} value={formik.values.floor} type={"text"} name='floor' id='floor' placeholder='Floor' className='input' /><br />

                                        {formik.errors.floor ? <p className='error'>{formik.errors.floor}</p> : null}
                                    </div>
                                </div>
                                <div className="formshowtop">
                                    <span className="hint">Price</span>
                                    <div className="item">
                                        <input onChange={formik.handleChange} value={formik.values.price} type={"number"} name='price' id='price' placeholder='R0.000,00 /N' className='input' />
                                        <div className='error-container'>
                                            {formik.errors.price ? <p className='error'>{formik.errors.price}</p> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="formshowtop">
                                <span className="hint">Bed Type</span>
                                <select onChange={formik.handleChange} value={formik.values.bedtype} name='bedtype' id='bedtype' className='input' >
                                    <option className='input' value="Twing">Twing</option>
                                    <option className='input' value="Twin XL"> Twin XL</option>
                                    <option className='input' value="Full">Full</option>
                                    <option className='input' value="Cal King">Cal King</option>
                                    <option className='input' value="Queen">Queen</option>
                                    <option className='input' value="King">King</option>
                                    <option className='input' value="Rocking Bed">Rocking Bed</option>
                                    <option className='input' value="Traditional Canopy Bed">Traditional Canopy Bed</option>
                                    <option className='input' value="Round Bed">Round Bed</option>
                                </select>

                            </div>
                            <div className="formshowtop">
                                <span className="hint">Price</span>
                                <div className="item">
                                    <input onChange={formik.handleChange} value={formik.values.price} type="number" name='contact' id='contact' placeholder='names' className='input' />
                                    {formik.errors.contact ? <p className='error'>{formik.errors.contact}</p> : null}
                                </div>

                            </div>

                            <div className='offers'>
                                <div onClick={handleParking} className='offer'>
                                    {parking ? <div ref={container} className="check"></div> : null}
                                    <div className="icon"><LocalParking style={{ color: parking ? "#6DA319" : "#FD1717" }} /></div>
                                </div>
                                <div onClick={handleWifi} className='offer'>
                                    {wifi ? <div ref={container} className="check"></div> : null}
                                    <div className="icon"><Wifi style={{ color: wifi ? "#6DA319" : "#FD1717" }} /></div>
                                </div>
                                <div onClick={handleSecured} className='offer'>
                                    {secured ? <div ref={container} className="check"></div> : null}
                                    <div className="icon"><Security style={{ color: secured ? "#6DA319" : "#FD1717" }} /></div>
                                </div>
                                <div onClick={handleTv} className='offer'>
                                    {tv ? <div ref={container} className="check"></div> : null}
                                    <div className="icon"><Tv style={{ color: tv ? "#6DA319" : "#FD1717" }} /></div>
                                </div>

                            </div>

                            <div className='images'>
                                <div className='imagelist'>
                                    {imageurl.map(imageSrc => <img className='imageframe' src={imageSrc} />)}
                                </div>
                                <div className='picker'>
                                    <input style={{ height: 80, width: 80, backgroundColor: '#674ede', border: 0, }} className='picker' type="file" multiple accept="image/*" onChange={onImageChange} />
                                </div>
                            </div>
                            <button type='submit' className="btnupdate">Register room</button>
                        </div>
                    </form>
                </div>

                {load ? <div className='indicator' >
                    <Indicator />
                </div> : null}

                {verify ? <div className="verify">
                    {/* <Verify id={key} /> */}
                </div> : null}

            </div>

        </div >
    )
}
