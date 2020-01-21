const express = require('express');
const chalk = require('chalk'); // show msm whit colors
const debug = require('debug')('app'); // debug the app
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT|| 3000;

app.use(morgan('tiny')); //show information about browser request 
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.get('/', (req, res)=>{
  res.render('index', {list: ["a", "b", "c"], title: "Library"});
});

app.listen(port, ()=>{
  debug(`listenig on port ${chalk.green(port)}`);
});