import React, { useEffect, useState } from 'react';
import './transactions.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined, EditSharp, PersonAddAltRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Transactions = ()=>{
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'names', headerName: 'Names', width: 180 },
    { field: 'username', headerName: 'Username', width: 180 },
    { field: 'email', headerName: 'E-mail', width: 180 },
    { field: 'status', headerName: 'Status', width: 180 },
    { field: 'amount', headerName: 'Amount', width: 100 },
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

  const [payments, setpayments] = useState([]);

  useEffect(() => {
    
      axios.get(`${process.env.REACT_APP_API_URL}payment/`)
      .then((results)=>{
        let i = 0
        let data ;
        for(i ; i < results.data.length; i++ ){
           setpayments([...payments,{...results.data[i], id: i}]); 
        }
        
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
    rows={payments}
    columns={columns}
    pageSize={5}
    disableSelectionOnClick={true}
    rowsPerPageOptions={[5]}
    checkboxSelection
  />
</div>
)
}

export default Transactions