const express = require('express') 
const app = express() 
const cors = require('cors');
require('dotenv').config();
app.use(cors()) 
const dataWe = require('./data/weather.json')

app.get('/',(req, res) => {res.send('Hello World')})

app.get('/weather',(req,res)=> {
  
        let lat=req.query.lat
        let lan=req.query.lon
        let searchQuery=req.query.searchQuery

        let findData=()=>{
          
          let x= dataWe.find((y) => {
            return y.city_name.toLowerCase()=== searchQuery.toLocaleLowerCase()
          }) 

          return x.data.map(item=>{
            return new ForeCast(item)
          })
        }

        res.json(findData())
      });
  class ForeCast{
    constructor(weatherData){
      this.date=weatherData.valid_date
      this.description =weatherData.weather.description
    }
  }
    

 

 
app.listen(process.env.PORT)