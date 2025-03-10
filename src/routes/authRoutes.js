const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const userCollection = await db.collection('users');
          const user = { username, password };
          const results = await userCollection.insertOne(user);

          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error.stack);
        }

        client.close();
      }());
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render(
        'signIn',
        {
          nav,
          title: 'Sign In'
        }
      );
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      delete req.user;
      res.redirect('/');
    });

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      const user = req.user;
      res.render(
        'profile',
        {
          nav,
          title: 'Profile',
          user
        }
      );
    });
  return authRouter;
}

module.exports = router;
