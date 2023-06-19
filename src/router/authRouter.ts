import express, { Router } from 'express';
const router = express.Router();
import passport from 'passport';
import multer from 'multer';
import UserModel from '../schemas/user.model';

const upload = multer();
router.get('/create', (req, res) => {
  res.render('createAc');
});

router.get('/login', (req, res) => {
  res.render('login');
});
router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Retrieve user data using the access token received

router.get(
  '/google/callback',

  passport.authenticate('google'),

  (req, res) => {
    res.send('You are authenticated');
  }
);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    console.log(user, 'user');
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(req.body);
      return res.send('sai mât khẩu hoăc tài khoản');
    }
    req.login(user, () => {
      res.send('You are authenticated');
    });
  })(req, res, next);
});

router.post('/create', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const exited = await UserModel.findOne({ username });

  if (exited) {
    res.send('This account is existed!');
  } else {
    await UserModel.create({
      username,
      password,
    });
    res.redirect('')
  }
});
export default router;
