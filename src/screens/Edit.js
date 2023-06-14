import React from 'react'
import Navbar from '../components/Navbar'
import IMG1 from './Images/menu.png'
import IMG2 from './Images/images.png'
import IMG3 from './Images/user.jpg'
import './Edit.css'
import { Link } from 'react-router-dom'
export default function Edit() {
    return (
        <div style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/271681.jpg")', height: '100vh', backgroundSize: 'cover', paddingTop: '50px' }} className='back' >
            <Navbar />
            <div className='container experience__container ' >
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img src={IMG1} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">Edit Categories</h5>
                        {/* <p className="card-text">This is some random text. This is description.</p> */}
                        <div className='buttn'>
                            <hr></hr>
                            <Link className={`btn  text-center m`} style={{backgroundColor:"#C172E9"}} to='/editcategory'>Edit</Link>
                            <Link className={`btn  justify-center ms-2 `} style={{backgroundColor:"#C172E9"}} to='/addcategory'>Add</Link>
           
                        </div>
                    </div>
                </div>
                
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img src={IMG2} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">Edit Food Items</h5>
                        {/* <p className="card-text">This is some random text. This is description.</p> */}

                        <div className='buttn'>
                            <hr></hr>
                            <Link className={`btn  justify-center ms-2 `} style={{backgroundColor:"#C172E9"}} to='/edititems'>Edit</Link>
                            <Link className={`btn  justify-center ms-2 `} style={{backgroundColor:"#C172E9"}} to='/additems'>Add</Link>
    
                        </div>
                    </div>
                </div>
                
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img src={IMG3} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">Edit User</h5>
                        {/* <p className="card-text">This is some random text. This is description.</p> */}

                        <div className='buttn'>
                            <hr></hr>
                            <Link className={`btn  justify-center ms-2 `} style={{backgroundColor:"#C172E9"}} to="/edituser">Edit</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
