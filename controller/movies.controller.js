// const express = require('express') 
// const app = express() 
// const cors = require('cors');
// require('dotenv').config();
// app.use(cors()) 
const Movies=require('../model/Movies.model')
const axios = require('axios'); 
let PORT=process.env.PORT||8080

const moviesController =(req, res) => {
    let query=req.query.city_name
    
     let axiosResMovies=axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`)
     .then((response)=>{
       console.log(response);
               const resData = response.data.results.map((mov) => new Movies(mov));
               res.json(resData);
     })
     .catch(error => console.log(error));
   }
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
 
 
   module.exports=moviesController;
