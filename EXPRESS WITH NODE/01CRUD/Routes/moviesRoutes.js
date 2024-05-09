
const express = require('express')
const moviesController = require('./../Controllers/moviesController')

// const router = express.Router()

// express router
// const moviesRouter = express.Router()
const router = express.Router()

// new Routes
// moviesRouter.route('/')
//     .get(getAllMovies)
//     .post(postMovies)
router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.postMovies)

// moviesRouter.route('/:id')
//     .get(getMoviesById)    
//     .patch(patchMovies)
//     .delete(deleteMovies)
router.route('/:id')
    .get(moviesController.getMoviesById)    
    .patch(moviesController.patchMovies)
    .delete(moviesController.deleteMovies)

    // module.exports = moviesRouter;
    module.exports = router;