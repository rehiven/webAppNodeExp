const express = require('express');
const chalk = require('chalk'); // show msm whit colors
const debug = require('debug')('app'); // debug the app
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny')); //show information about browser request 
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.get('/', function(req, res){
  res.sendfile(path.join(__dirname, 'views/index.html'));
});

app.listen(3000, function(){
  debug(`listenig on port ${chalk.green('3000')}`);
});