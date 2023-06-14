
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  let priceOptions = props.price;
  let type= props.type;
  let foodItem = props.item;
  const dispatch = useDispatchCart();
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
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === type[size]) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== type[size]) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: type[size],img: props.ImgSrc })
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(priceOptions[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ width: "19rem", maxHeight: "860px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20  text-white rounded" style={{ select: "#C172E9" , backgroundColor:"#C172E9"}} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20  text-white rounded" style={{ select: "#FF0000", backgroundColor:"#C172E9" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
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
          <button className={`btn  justify-center ms-2 `} style={{backgroundColor:"#C172E9"}} onClick={handleAddToCart}>Add to Cart</button>
          </div>
          :""}
          </div>
      </div>
    </div>
  )
}
//