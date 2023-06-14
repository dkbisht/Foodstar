const mongoose = require('mongoose');
const mongoURI='mongodb+srv://dkbisht:dkbisht@cluster1.g2wrauz.mongodb.net/gofood?retryWrites=true&w=majority'
const mongoDB=async()=>{
await  mongoose.connect(mongoURI)
.then(async ()=> {
    console.log('Connected');
    try {
        const fetched_data=  mongoose.connection.db.collection("fooditems").find({});
        const results= await fetched_data.toArray();
        global.food_items=results;    
    } catch (error) {
        console.log(error);
    }
    try {
        const fetched_data=  mongoose.connection.db.collection("users").find({});
        const result2= await fetched_data.toArray();
        global.users=result2;    
    } catch (error) {
        console.log(error);
    }
    try {
        const fetch_category= mongoose.connection.db.collection("foodcategories").find({});
        const result1= await fetch_category.toArray();
        global.food_category=result1;
     } catch (error) {
        console.log(error);
    }
        
})
.catch((error)=> console.log(error,'did not connect'));
}

module.exports = mongoDB;