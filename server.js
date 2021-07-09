const express = require('express') 
const app = express() 
const cors = require('cors');
require('dotenv').config();
app.use(cors()) 
const axios = require('axios');
const dataWe = require('./data/weather.json')
let PORT=process.env.PORT||8080
console.log(PORT)
const weatherController = require('./controller/weather.controller')
const moviesController = require('./controller/movies.controller')



app.get('/',(req, res) => {res.send('Hello World')})

app.get('/weather',weatherController)
        
app.get('/movies',moviesController)
 
app.listen(PORT)