const express = require('express');
const bookController = require('../controllers/bookController');
const bookRouter = express.Router(); 
const bookService = require('../services/goodreadsService')

function router(nav){
  const {getIndex, getById, middleware} = bookController(bookService , nav);

  //middleware, user validation

  bookRouter.use(middleware);

  //end middleware

  bookRouter.route('/')
    .get(getIndex);
  
  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}

module.exports = router;