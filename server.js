const express = require('express') 
const app = express() 
const cors = require('cors');
require('dotenv').config();
app.use(cors()) 
const axios = require('axios');
const dataWe = require('./data/weather.json')
let PORT=process.env.PORT||8080
console.log(PORT)


app.get('/',(req, res) => {res.send('Hello World')})

app.get('/weather',(req,res)=> {
  
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
      });
  class ForeCast{
    constructor(weatherData){
      this.date=weatherData.valid_date
      this.description =weatherData.weather.description
    }
  }
  
  
  app.get('/movies',(req, res) => {
     let query=req.query.city_name
     
      let axiosResMovies=axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`)
      .then((response)=>{
        console.log(response);
                const resData = response.data.results.map((mov) => new Movies(mov));
                res.json(resData);
      })
      .catch(error => console.log(error));
    }
  )
  class Movies{
    constructor(moviesData){
      
        this.title=moviesData.original_title;
        this.votes=moviesData.vote_count
        this.image_url ='http://image.tmdb.org/t/p/w342'+ moviesData.poster_path;
        this.overview = moviesData.overview;
        this.average_vote = moviesData.vote_average;
        this.popularity = moviesData.popularity;
        this.released_on = moviesData.release_date;
    }
  }
 

 
app.listen(PORT)