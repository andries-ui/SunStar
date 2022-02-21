import React, { useEffect, useState } from 'react';
import './userlist.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined, EditSharp, PersonAddAltRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UserList() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'names', headerName: 'Names', width: 180 },
        { field: 'username', headerName: 'Username', width: 180 },
        { field: 'email', headerName: 'E-mail', width: 180 },
        { field: 'contact', headerName: 'Contact', width: 180 },
        { field: 'type', headerName: 'System', width: 100 },
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

      const [users, setusers] = useState([]);

      useEffect(() => {
        
          axios.get(`${process.env.REACT_APP_API_URL}user/`)
          .then(( user_res)=>{
            const userdata = [];
            user_res.data.forEach((user) => {

                axios.get(`${process.env.REACT_APP_API_URL}account/${user._id}`).then((account_res) => {

                    const data = {
                      id: user._id,
                       names: user.names,
                       email: user.email,
                       contact: user.contact,
                       type: user.type,
                       username: user.username,
                       active: account_res.data.blocked
                    }

                    userdata.push(data);
                    setusers([...userdata]);
                    console.log(userdata);
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

   
      

  return (
    <div className="userslist">

        <button className="create"><PersonAddAltRounded className="createicon"/> Create User</button>
      <DataGrid
      className="grid"
        rows={users}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick={true}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
