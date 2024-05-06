const express = require('express');
const fs = require('fs')
const app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'))

app.use(express.json())

//GET - api/movies
app.get('/api/v1/movies', (req,res)=> {
    res.status(200).json({
        status: "success",
        // count:movies.length,
        data: {
            movies: movies
        }
    })
})


//GET - api/v1/movie/id
app.get('/api/v1/movies/:id', (req,res)=> {
    // console.log(req.params)
    const id = req.params.id * 1;

    let movie = movies.find( el => el.id ===id);
    if(!movie){
        return res.status(404).json({
            status: "error",
            message: 'movie with '+id+' not found'
        })
    }

    //send movie in the response
    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    })
})




//POST - api/movies
app.post('/api/v1/movies', (req,res)=> {
    console.log(req.body)
    const newId = movies[movies.length - 1].id + 1;

    const newMovie = Object.assign({id: newId},req.body)

    movies.push(newMovie)
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err)=> {
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie
            }
        })
    })
    // res.send('created')
})



//CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('watching you')
})