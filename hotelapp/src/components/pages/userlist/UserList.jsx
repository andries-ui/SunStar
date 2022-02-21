import React from 'react';
import './userlist.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined, EditSharp, PersonAddAltRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function UserList() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First name', width: 180 },
        { field: 'lastName', headerName: 'Last name', width: 180 },
        { field: 'email', headerName: 'E-mail', width: 180 },
        { field: 'contact', headerName: 'Contact', width: 180 },
        { field: 'userType', headerName: 'User Type', width: 100 },
        { field: 'warnings', headerName: 'Warnings', width: 90 },
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
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
      

  return (
    <div className="userslist">

        <button className="create"><PersonAddAltRounded className="createicon"/> Create User</button>
      <DataGrid
      className="grid"
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick={true}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
