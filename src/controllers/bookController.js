const {MongoClient, ObjectID} = require('mongodb');
const debug = require('debug')('app:bookController');

function  bookController(bookService , nav){

  const url = 'mongodb://localhost:27017';
  const dbName = 'libraryApp';

  function getIndex(req, res){
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('books')
        const books = await col.find().toArray();
    res.render(
      'bookListView', 
        {
          nav, 
          title: "Library", 
          books
        }
      );
      }catch(err){
        debug(err.stack)
      }
      client.close();
    }());
};
  function getById(req, res){
    const {id}= req.params;
    (async function mongo(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('books')

        const book = await col.findOne({_id:new ObjectID(id)});
        book.details = await bookService.getBookById(book.bookId);
        debug(book);
        res.render(
          'bookView', 
            {
              nav, 
              title: "Library", 
              book
            }
          );
      }catch(err){
        debug(err.stack);
      }
    }())
};

function middleware (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};
  return {
    getById,
    getIndex,
    middleware
  };
}

module.exports = bookController;