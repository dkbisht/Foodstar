import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
export default function AddItems() {
    const [foodCat, setFoodCat] = useState("")
    const [foodItems, setFoodItems] = useState([])
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({ categoryname: "", name:"", img:"", description:"",type:"",price:""})
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("cat=",foodCat)
        const response = await fetch("http://localhost:5000/api/auth/additems", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ categoryname:foodCat, name:credentials.name, img: credentials.img, description: credentials.description, type:credentials.type, price:credentials.price})
        });
        const json = await response.json()
        if (json.success) {
          alert("Successful")    
          navigate('/')
        }
        else {
          alert("Error")
        }
      }
    
    
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    // console.log(response[1][0].CategoryName)
    setFoodItems(response[1])
  }

  const handleOptions = (e) => {
    setFoodCat(e.target.value);
  }


  useEffect(() => {
    loadFoodItems()
  }, [])

  

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover', paddingTop:'50px' }}>
    <div>
      <Navbar />
    </div>
    <div className='container'>
      <form className='w-50 m-auto mt-5 border bg-dark  rounded' onSubmit={handleSubmit}>
      <div className="m-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Category Name</label>
          <select className="m-2 h-100 w-20  text-white rounded" style={{ select: "#FF0000",backgroundColor:"#C172E9" }} onChange={handleOptions}>
            <option>Select</option>
              {foodItems.map((i) => {
                return <option key={i.CategoryName} value={i.CategoryName}>{i.CategoryName}</option>
              })}
            </select>
          </div>
          <div className="m-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Food Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}  />
          </div>
          <div className="m-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
          <input type="text" className="form-control" name='img' value={credentials.img} onChange={onChange}  />
          </div>
          <div className="m-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
          <input type="text" className="form-control" name='description' value={credentials.description} onChange={onChange}  />
          </div>
          <div className="m-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Type{" (Item1 Item2 etc)"}</label>
          <input type="text" className="form-control" name='type' value={credentials.type} onChange={onChange}  />
          </div>
          <div className="m-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Price{" (Item1Price Item2Price etc)"}</label>
          <input type="text" className="form-control" name='price' value={credentials.price} onChange={onChange}  />
          </div>
          <button type="submit" className="m-3 btn" style={{backgroundColor:"#C172E9"}}>Submit</button>
      </form>

    </div>
  </div>
  )
}
