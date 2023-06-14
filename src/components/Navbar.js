/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar(props) {

    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        console.log(localStorage.getItem('admin'))
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
             <nav className="navbar navbar-expand-lg navbar-dark "
                style={{ boxShadow: "0px 10px 20px black", backgroundColor:'#C172E9', filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%", top:"0" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Foodstar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                             {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="navbar-brand fs-5" to="/login">Login</Link>
                                <Link className="navbar-brand fs-5" to="/createuser">Signup</Link>
                            </form> :
                            <form className='d-flex'>
                                {(localStorage.getItem("admin"))?
                                <Link className="navbar-brand fs-5" to="/edit">Edit</Link>
                                :""}
                                    
                                <div className="navbar-brand mx-3 fs-5 " onClick={loadCart}>
                                    <Badge color="secondary" style={{cursor: "pointer"}} badgeContent={items.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                                <button onClick={handleLogout}  className="navbar-brand fs-5" style={{cursor: "pointer",  border: "0px solid #3498db", backgroundColor: "transparent", height: "40px"}} >Logout</button></form>}
                    </div>
                </div>
            </nav>
    )
}