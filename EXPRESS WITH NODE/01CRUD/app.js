const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

const moviesRouter = require('./Routes/moviesRoutes')


// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Custom logger middleware
const logger = function(req, res, next) {
    console.log('Custom middleware called');
    next();
}
app.use(logger);

// Middleware to add requestedAt timestamp
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});



// Routes
// app.get('/api/v1/movies', getAllMovies);
// app.get('/api/v1/movies/:id', getMoviesById);
// app.post('/api/v1/movies', postMovies);
// app.patch('/api/v1/movies/:id', patchMovies);
// app.delete('/api/v1/movies/:id', deleteMovies);



app.use('/api/v1/movies',moviesRouter)


module.exports = app;