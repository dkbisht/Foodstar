import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CardEditItem from '../components/CardEditItem'

export default function EditItems() {
    const [foodCat, setFoodCat] = useState([])
    const [foodItems, setFoodItems] = useState([])
   
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
        setFoodItems(response[0])
        setFoodCat(response[1])
        console.log(foodCat)
    }


    useEffect(() => {
        loadFoodItems()
    }, [])
    return (
        <div>
            <Navbar />
            <div className='container' style={{ paddingTop: "100px" }}> {/* boootstrap is mobile first */}
            {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(160, 32, 240),rgb(245, 245, 245))" }} />
                  {foodItems !== [] ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) )
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItems.url)}
                          <CardEditItem foodName={filterItems.name} item={filterItems} type={filterItems.type} price={filterItems.price} ImgSrc={filterItems.img} id={filterItems._id}></CardEditItem>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
     
            </div>
        </div>
    )
}
