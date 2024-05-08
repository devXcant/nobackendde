const express = require('express');
const fs = require('fs')
const app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'))

const logger = function(req, res, next){
    console.log('custom middleware called')
}

app.use(express.json())
app.use(logger);
app.use((req,res,next) => {
    req.requestedAt = new Date().toISOString()
    next()
})

// ROUTE HANDLER FUNCTIONS
const getAllMovies = (req,res)=> {
    res.status(200).json({
        status: "success",
        // count:movies.length,
        requestedAt: req.requestedAt,
        data: {
            movies: movies
        }
    })
}

const getMoviesById = (req,res)=> {
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
}

const postMovies = (req,res)=> {
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
}


const patchMovies = (req, res)=> {
    let id = req.params.id * 1
    let movieToUpdate = movies.find(el => el.id === id )
    if(!movieToUpdate){
        res.status(404).json({
            status: 'fail',
            message: 'No movie witih ID `+id+`` is found'
        })
    }
    let index = movies.indexOf(movieToUpdate)

    Object.assign(movieToUpdate, req.body)

    movies[index]= movieToUpdate;
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err)=> {
         res.status(200).json({
            status: "success",
            data: {
                movie: movieToUpdate
            }
        })
    })
}

const deleteMovies = (req,res) => {
    const id = req.params.id * 1;
    const movieToDelete = movies.find(el=> el.id ===id);

    if(!movieToDelete){
        
            return res.status(404).json({
                status: 'fail',
                message: 'No movie witih ID `+id+` is found to delete'
        }) 
    }

    const index = movies.indexOf(movieToDelete)


    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err)=> {
         res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    })

}

// GET - api/movies
// app.get('/api/v1/movies', getAllMovies )


// GET - api/v1/movie/id
// app.get('/api/v1/movies/:id', getMoviesById )

//POST - api/movies
// app.post('/api/v1/movies', postMovie)

// PUT $ PATCH
// PATCH A RESOURCE
// app.patch('/api/v1/movies/:id', patchMovies)

// DELETE A RESOURCE
// app.delete('/api/v1/movies/:id', deleteMovies)


app.route('/api/v1/movies')
    .get(getAllMovies)
    .post(postMovies)


app.route('/api/v1/movies/:id')
    .get(getMoviesById)
    .patch(patchMovies)
    .delete(deleteMovies)


//CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('watching you..')
})