import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function EditCategory() {
    let navigate = useNavigate()
    const [foodCat, setFoodCat] = useState([])
    const handleDelete = async (id) => {
        console.log("id=",id)
        const response = await fetch("http://localhost:5000/api/auth/deletecategory", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id:id })
    
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
        setFoodCat(response[1])
        console.log(foodCat)
      }
    
      
  useEffect(() => {
    loadFoodItems()}, [])
    return (
    <div>
      <Navbar/>
      <div className='container' style={{paddingTop:"100px"}}> {/* boootstrap is mobile first */}
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-5 m-3'>
                    {data.CategoryName}
                    <button className={`btn btn-danger justify-center ms-2 text-white`} onClick={()=> handleDelete(data._id) }>Delete</button>
                  </div>
                  <hr  style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(160, 32, 240),rgb(245, 245, 245))" }} />
                  </div>
              )
            })
            : ""}
            </div>
 
    </div>
  )
}
