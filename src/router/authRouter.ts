import express from "express";
const router = express.Router();
import passport from "passport";
import multer from 'multer';

const upload = multer();


router.get("/login",(req,res)=>{
    res.render("login");
})
router.post('/login', upload.none(), (req,res,next)=>{
    console.log('====================================');
    console.log();
    console.log('====================================');
   
    console.log(req.body)
    passport.authenticate("local", (err, user) => {
      console.log(user, 'user')
      if(err){
        return next(err)
      }
      if(!user){
        console.log(req.body)
        return res.send("Wrong email or password")
      }
      req.login(user, () => {
        res.send("You are authenticated")
      })
    })(req, res, next)
})


export default router; 