const express = require('express');
const chalk = require('chalk'); // show msm whit colors
const debug = require('debug')('app'); // debug the app
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT|| 3000;
const nav = [{link: "/books", title: "Books"}, {link: "/authors", title: "Authors"}];
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav)
const authRouter = require('./src/routes/authRoutes')(nav)

app.use(morgan('tiny')); //show information about browser request 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport.js')(app);
app.use((req, res, next)=>{
  debug('my middleware');
  next();
});

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
//app.set('view engine', 'pug');


app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res)=>{
  res.render(
    'index', 
      {
        nav, 
        title: "Library"
      }
    );
});

app.listen(port, ()=>{
  debug(`listenig on port ${chalk.green(port)}`);
});