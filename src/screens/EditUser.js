import React, { useEffect, useState } from 'react'

import Delete from '@mui/icons-material/Delete'
import Navbar from '../components/Navbar';

export default function EditUser() {
    const [Users, setUsers] = useState([])
    const loadUsers = async () => {
        let response = await fetch("http://localhost:5000/api/auth/userdata", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json()
        // console.log(response[1][0].CategoryName)
        setUsers(response[0])
    }

    const handleDelete = async (id) => {
        const response = await fetch("http://localhost:5000/api/auth/deleteuser", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })

        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            alert("Done")
            window.location.reload()
        }
        else {
            alert("Enter Valid Credentials")
        }
    }



    useEffect(() => { loadUsers() }, [])

    return (
        <div style={{backgroundImage: 'url("https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?cs=srgb&dl=pexels-cats-coming-1907227.jpg&fm=jpg")', height: '100vh', backgroundSize: 'cover' }}>
            <Navbar />
            <div className='container' style={{ paddingTop: "100px" }}> {/* boootstrap is mobile first */}
                <table className='table table-hover '>
                    <thead className=' text-white fs-3'>
                        <tr>
                            <th scope='col'>Sr No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {Users.map((data, index) => (
                        <tr className='fs-5' >
                            <th scope='row' >{index + 1}</th>
                            <td >{data.name}</td>
                            <td>{data.email}</td>
                            <td ><button type="button" className="btn p-0"><Delete onClick={() => { handleDelete(data._id) }} /></button> </td></tr>
                    ))}
                </table>
            </div>

        </div>
    )
}
