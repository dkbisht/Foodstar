const express = require('express')
const User = require('../models/User')
const foodCategory = require('../models/foodCategory')
const foodItems= require('../models/foodItems')
const Order = require('../models/Orders')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const axios = require('axios')
const fetch = require('../middleware/fetchdetails');
const jwtSecret = "HaHa"

// var foodItems= require('../index').foodData;
// require("../index")
//Creating a user and storing data to MongoDB Atlas, No Login Requiered

router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            // password: req.body.password,  first write this and then use bcryptjs
            password: securePass,
            email: req.body.email,
            location: req.body.location
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
})

router.post('/additems',[
    body('name').isLength({min:3})
], async(req, res)=>{
    let success=false;
    const errors = validationResult(req);
    const type= req.body.type.split(" ")
    const price= req.body.price.split(" ")
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    try {
        await foodItems.create({
            CategoryName: req.body.categoryname,
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            type:type,
            price:price
            // password: req.body.password,  first write this and then use bcryptjs
        }).then(user => {
            success = true

            global.foodData = require('../db')(function call(err, data, CatData) {
                // console.log(data)
                if (err) console.log(err);
                global.foodData = data;
                global.foodCategory = CatData;
            })
            res.json({ success })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter Correct value." })
            })
    } catch (error) {
        console.error(error.message)
    }
})


router.post('/addcategory', [
    body('categoryname').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    try {
        await foodCategory.create({
            CategoryName: req.body.categoryname,
            // password: req.body.password,  first write this and then use bcryptjs
        }).then(user => {
            success = true

            global.foodData = require('../db')(function call(err, data, CatData) {
                // console.log(data)
                if (err) console.log(err);
                global.foodData = data;
                global.foodCategory = CatData;
            })
            res.json({ success })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
})


// Authentication a User, No login Requiered
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

router.post('/foodData', async (req, res) => {
    try {
        // console.log( JSON.stringify(global.foodData))
        // const userId = req.user.id;
        // await database.listCollections({name:"food_items"}).find({});
        res.send([global.food_items, global.food_category])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

router.post('/userdata', async (req, res) => {
    try {
        // console.log( JSON.stringify(global.foodData))
        // const userId = req.user.id;
        // await database.listCollections({name:"food_items"}).find({});
        res.send([global.users])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

router.post('/deletecategory', async (req, res) => {
    var id = req.body.id;
    foodCategory.findByIdAndDelete(id)
        .then(() => {
            success = true
            global.foodData = require('../db')(function call(err, data, CatData) {
                // console.log(data)
                if (err) console.log(err);
                global.foodData = data;
                global.foodCategory = CatData;
            })
            res.json({ success })
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" });
        });
})

router.post('/deleteuser', async (req, res) => {
    var id = req.body.id;
    User.findByIdAndDelete(id)
        .then(() => {
            success = true
            global.foodData = require('../db')(function call(err, data, CatData) {
                // console.log(data)
                if (err) console.log(err);
                global.foodData = data;
                global.foodCategory = CatData;
            })
            res.json({ success })
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" });
        });
})

router.post('/deleteitems', async (req, res) => {
    var id = req.body.id;
    foodItems.findByIdAndDelete(id)
        .then(() => {
            success = true
            global.foodData = require('../db')(function call(err, data, CatData) {
                // console.log(data)
                if (err) console.log(err);
                global.foodData = data;
                global.foodCategory = CatData;
            })
            res.json({ success })
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" });
        });
})


router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({ orderData: eId })
    } catch (error) {
        res.send("Error", error.message)
    }


});

module.exports = router