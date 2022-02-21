import React, {
    useEffect,
    useState
} from 'react';
import './property.css';
import env from "react-dotenv";
import {
    LocalParking,
    PhoneSharp,
    Publish,
    Wifi,
    Security,
    Tv
} from '@mui/icons-material';
import {
    Divider
} from '@mui/material';
import Featuredinforroom from '../../sharebles/featuredinforroom/Featuredinforroom';
import axios from 'axios';

export default function Property() {

    const [rooms, setrooms] = useState([]);

    const GetRooms = () => {
        axios.get(`${process.env.REACT_APP_API_URL}room`).then((room_res) => {

            const roomdata = [];
            room_res.data.forEach((room) => {

                axios.get(`${process.env.REACT_APP_API_URL}property/${room._id}`).then((property_res) => {

                    const data = {
                        type: room.type,
                        price: room.price,
                        status: room.status,
                        floor: room.floor,
                        roomNumber: room.roomNumber,
                        hotelId: room.hotelId,
                        bedtype: property_res.data.bedType,
                        tv: property_res.data.tv,
                        wifi: property_res.data.wifi,
                        parking: property_res.data.parking,
                        numberOfBed: property_res.data.numberOfBed,
                        desc: property_res.data.desc,
                        images: property_res.data.images,
                        roomId: property_res.data.roomId,
                    }

                    roomdata.push(data);
                    setrooms([...roomdata]);
                })
                    .catch((err) => {
                        console.log(err);
                    })
            });


        })
            .catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        GetRooms()
    }, [])

    return (
        <div className="user" >
            <Featuredinforroom />

            <h2 > Registered rooms </h2>
            <div className='grid' > {
                rooms.map(room => < div className='room-frame' > < img className='image-frame'
                    src={room.images[2]} />
                    <span className='room-type' > {room.type} </span><br />
                    <span className='room-type' > room no: {room.roomNumber} </span><br />
                    <span className='room-type' > floor  : {room.floor} </span> 

                    <div className='features' >
                        <div>
                            <span > < LocalParking style={{ color: room.parking === 'true' ? "#6DA319" : "#FD1717" }} /></span >
                            <span > < Wifi style={{ color: room.wifi === 'true' ? "#6DA319" : "#FD1717" }} /></span >
                            <span > < Security style={{ color: "#6DA319" }} /></span >
                            <span > < Tv style={{ color: room.tv === 'true' ? "#6DA319" : "#FD1717" }} /></span >
                        </div>
                        <div>
                            <span className='room-price' > R {room.price} </span>
                        </div>
                    </div>
                </div>)}
            </div >
            <h2 > Registered rooms </h2>
        </div >
    )
}