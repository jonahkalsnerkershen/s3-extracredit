/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// and then the secret is usable this way:
// process.env.AUTH_SECRET;

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body; // is this right?
  const { username } = req.body;

  console.log(`value of next is ${next}`);
  console.log(`email is${email}`);

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  console.log('before finding email');
  User.find({ email }).then((result) => {
    console.log(`req.user is ${req.user}`);
    console.log(`length of result is ${result.length}`);
    console.log(result);
    if (result.length === 0) {
      console.log('length was 0');
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.username = username;
      console.log(`username is ${username}`);
      newUser.save().then((result) => {
        // res.json({ message: 'User created!' });
        res.send({ token: tokenForUser(newUser), user: newUser });
      })
        .catch((error) => {
          res.status(500).json({ error });
        });
    } else {
      console.log('result was length>1');
      return res.status(422).send('Account already exists');
    }
  });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
