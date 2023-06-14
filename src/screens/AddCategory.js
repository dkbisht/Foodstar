import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
export default function AddCategory() {
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({ categoryname: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/addcategory", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ categoryname:credentials.categoryname})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
          alert("Successful")    
           navigate('/editcategory')
        }
        else {
          alert("Error")
        }
      }
    
    
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div style={{backgroundImage: 'url("https://as2.ftcdn.net/v2/jpg/03/78/97/59/1000_F_378975954_G39M4ptXAjxKy80gbBIEo0wqBkk89gBF.jpg")', height: '100vh', backgroundSize: 'cover', paddingTop:'50px' }}>
    <div>
      <Navbar />
    </div>
    <div className='container'>
      <form className='w-50 m-auto mt-5 border bg-dark  rounded' onSubmit={handleSubmit}>
        <div className="m-2">
          <label htmlFor="exampleInputEmail1" className="form-label">Category Name</label>
          <input type="text" className="form-control" name='categoryname' value={credentials.categoryname} onChange={onChange}  />
          </div>
        <button type="submit" className="m-3 btn " style={{backgroundColor:"#C172E9"}}>Submit</button>
      </form>

    </div>
  </div>
  )
}
