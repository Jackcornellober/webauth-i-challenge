const bcrypt = require('bcryptjs')
const express = require('express');
const Users = require('./users-model.js');
const router = express.Router()



router.post('/register', (req, res) => {
  
  //ASYNC below

  // const hash = bcrypt.hash(user.password, 8, (err,hash) => {
  //   if(err) {
  //     //errorstuff
  //   } else {
  //     user.password = hash;

  //   }
  // })
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
      
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/users', (req, res) => {
console.log('boi')
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/users1', (req, res) => {

  let username = req.headers.username;
  let password = req.headers.password;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        Users.find()
        .then(users => {
          if(user) {console.log("user")}
          if(bcrypt.compareSync(password, user.password)) {console.log("bcrypt")}
        if (user && bcrypt.compareSync(password, user.password)) {
          res.json(users);
        } else {
          res.json({ boi: "boi"})
        }
    })
    .catch(err => res.send(err));
      }
    })

  
});

module.exports = router;
