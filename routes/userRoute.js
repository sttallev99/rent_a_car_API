import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(validPassword) {
            res.send({
                _id: user._id,
                username: user.username
            });
            return;
        } else {
            res.status(400).json({ error: "Invalid Password" });
          }
        } else {
          res.status(401).json({ error: "User does not exist" });
        }
    }
);

userRouter.post('/register', async (req, res) => {
    
    const body = req.body;

    const newUser = new User(body)

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    res.send('User Registration Successfully!')
});

export default userRouter;