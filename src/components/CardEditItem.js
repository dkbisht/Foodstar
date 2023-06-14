import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function CardEditItem(props) {

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  let priceOptions = props.price;
  let type= props.type;
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
    console.log(size)
  }
  const handleDelete = async (id) => {
    console.log("id=", id)
    const response = await fetch("http://localhost:5000/api/auth/deleteitems", {
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


  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  let finalPrice = qty * parseInt(priceOptions[size]);   //This is where Price is changing
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20  text-white rounded" style={{ backgroundColor:"#C172E9" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {type.map((x,y) => {
                return <option key={x} value={y}>{x}</option>
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
            </div>
          </div>
          {(localStorage.getItem("token"))?
          <div>
          <hr></hr>
          <button className={`btn btn-danger justify-center ms-2 `} onClick={()=>{handleDelete(props.id)}}>Delete</button>
          </div>
          :""}
          </div>
      </div>
    </div>
  )
}
//