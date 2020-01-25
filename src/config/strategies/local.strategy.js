const passport = require('passport');
const {Strategy} = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app.local.strategy');

module.exports = function localStrategy(){
  const url = 'mongodb://localhost:27017';
  const dbName = 'libraryApp';

  passport.use(new Strategy(
    {
    usernameField: 'username',
    passwordField: 'password'
    }, (username, password, done)=>{
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = await col.findOne({username});

          if(user.passport === password){
            done(null, user);
          }else{
            done(null, false);
          }
        } catch (err) {
          debug(err);
        }
        client.close();
      }());
    }
  ));

}