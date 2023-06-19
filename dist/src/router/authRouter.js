"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const multer_1 = __importDefault(require("multer"));
const user_model_1 = __importDefault(require("../schemas/user.model"));
const upload = (0, multer_1.default)();
router.get('/create', (req, res) => {
    res.render('createAc');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/login/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google'), (req, res) => {
    res.send('You are authenticated');
});
router.post('/login', (req, res, next) => {
    passport_1.default.authenticate('local', (err, user) => {
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
    const exited = await user_model_1.default.findOne({ username });
    if (exited) {
        res.send('This account is existed!');
    }
    else {
        await user_model_1.default.create({
            username,
            password,
        });
        res.redirect('');
    }
});
exports.default = router;
//# sourceMappingURL=authRouter.js.map