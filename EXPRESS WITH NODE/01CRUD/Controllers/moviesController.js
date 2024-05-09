const fs = require('fs');

// Load movies data from JSON file
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));


// Route handler functions
exports.getAllMovies = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestedAt,
        data: {
            movies: movies
        }
    });
}

exports.getMoviesById = (req, res) => {
    const id = req.params.id * 1;
    let movie = movies.find(el => el.id === id);
    if (!movie) {
        return res.status(404).json({
            status: 'error',
            message: 'Movie with ID ' + id + ' not found'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            movie: movie
        }
    });
}

exports.postMovies = (req, res) => {
    const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
    const newMovie = { id: newId, ...req.body };
    movies.push(newMovie);
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
        res.status(201).json({
            status: 'success',
            data: {
                movie: newMovie
            }
        });
    });
}

exports.patchMovies = (req, res) => {
    const id = req.params.id * 1;
    let movieToUpdate = movies.find(el => el.id === id);
    if (!movieToUpdate) {
        return res.status(404).json({
            status: 'error',
            message: 'Movie with ID ' + id + ' not found'
        });
    }
    Object.assign(movieToUpdate, req.body);
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                movie: movieToUpdate
            }
        });
    });
}

exports.deleteMovies = (req, res) => {
    const id = req.params.id * 1;
    const index = movies.findIndex(el => el.id === id);
    if (index === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'Movie with ID ' + id + ' not found'
        });
    }
    movies.splice(index, 1);
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}