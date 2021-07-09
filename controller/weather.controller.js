// const express = require('express') 
// const app = express() 
// const cors = require('cors');
// app.use(cors()) 
// require('dotenv').config();
// let PORT=process.env.PORT||8080
// console.log(PORT)

'use strict'
const dataWe = require('../data/weather.json')



const weatherController=(req,res)=> {
  
    let lat=req.query.lat
    let lon=req.query.lon
    let searchQuery=req.query.searchQuery
      
    try{
    let findData=()=>{
      
      let x= dataWe.find((y) => {
        return (y.city_name.toLowerCase()=== searchQuery.toLocaleLowerCase() || y.lat === lat || y.lon === lon)
      }) 

      return x.data.map(item=>{
        return new ForeCast(item)
      })
    }

    res.json(findData())
    }catch(error){
      res.status(500).send('smth went wrong Erorr')
    }
  };
  class ForeCast{
    constructor(weatherData){
      this.date=weatherData.valid_date
      this.description =weatherData.weather.description
    }
}



 module.exports=weatherController;
