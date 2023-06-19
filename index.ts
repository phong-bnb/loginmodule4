import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRoutes from "./src/router/authRouter";
import session from "express-session";
import passport from "./src/middleware/passport";

const PORT = 3000;
const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');
const DB_URL = 'mongodb+srv://ngphong0708:6V9bKO9eMLh8BHEE@cluster0.wrtrzrl.mongodb.net/Manager_CLient';
mongoose.connect(DB_URL)
  .then(() => console.log('DB Connected!'))
  .catch(error => console.log('DB connection error:', error.message));
app.use(bodyParser.json());
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, () => {
  console.log("App running on port: " + PORT)
})