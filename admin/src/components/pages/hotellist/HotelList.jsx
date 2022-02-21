import React, { useEffect, useState } from 'react';
import './hotellist.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined, EditSharp, PersonAddAltRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import env from "react-dotenv";
import axios from 'axios';

export default function HotelList() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Hotel Name', width: 180 },
        { field: 'city', headerName: 'City', width: 180 },
        { field: 'Province', headerName: 'Province', width: 180 },
        { field: 'email', headerName: 'E-mail', width: 180 },
        { field: 'contact', headerName: 'Contact', width: 100 },
        { field: 'active', headerName: 'Active', width: 90 },
        { field: 'action', headerName: 'Action', width: 90, renderCell: (props)=>{
            return(
                <>
                <Link to={"/user/"+ props.row.id}>
                <EditSharp className='edit'/>
                </Link>
                
                <Link to={"/user/"+ props.row.id}>
                <DeleteOutlined className='delete'/>
                </Link>
                </>
            )
        }  },
      ];
      

      const [hotels, sethotels] = useState([]);

      useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API_URL}hotel/`)
        .then(( hotel_res)=>{
          const hoteldata = [];
          hotel_res.data.forEach((hotel) => {

              axios.get(`${process.env.REACT_APP_API_URL}account/${hotel._id}`).then((account_res) => {

                  const data = {
                    id:hotel._id,
                     name: hotel.name,
                     email: hotel.email,
                     contact: hotel.contact,
                     active: account_res.data.active,
                  }

                  hoteldata.push(data);
                  sethotels([...hoteldata]);
                  console.log(account_res.data);
                })
                  .catch((err) => {
                      console.log(err);
                  })
          });
          
        })
        .catch((err)=>{
          console.log(err);
        })
      }, [])

      const rows = [
        { id: 1, name: 'Snow', Province: 'Jon', age: 35 },
        { id: 2, name: 'Lannister', Province: 'Cersei', age: 42 },
        { id: 3, name: 'Lannister', Province: 'Jaime', age: 45 },
        { id: 4, name: 'Stark', Province: 'Arya', age: 16 },
        { id: 5, name: 'Targaryen', Province: 'Daenerys', age: null },
        { id: 6, name: 'Melisandre', Province: null, age: 150 },
        { id: 7, name: 'Clifford', Province: 'Ferrara', age: 44 },
        { id: 8, name: 'Frances', Province: 'Rossini', age: 36 },
        { id: 9, name: 'Roxie', Province: 'Harvey', age: 65 },
      ];
      

  return (
    <div className="userslist">

<Link to="/hotelform/">
        <button className="create"><PersonAddAltRounded className="createicon"/> Create User</button>
        </Link>
      <DataGrid
      className="grid"
        rows={hotels}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick={true}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
