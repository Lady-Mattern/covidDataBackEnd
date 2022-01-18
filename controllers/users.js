const usersRouter = require('express').Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


usersRouter.post('/login', (req, res) => {
    // step 1 - find the user in the database by their email/username
    User.findOne({ email: req.body.email }, '+password', (err, foundUser) => {
        // step 1.1 - if the user is not found, respond with a error saying invalid credentials
        if (!foundUser) return res.send({ error: 'Invalid Credentials' });
        // step 2 - assuming we've found user, now we compare passwords - plain text - password digest
        if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            // step 2.1 - if there is not match, respond with a error saying invalid credentials
            return res.send({ error: 'Invalid Credentials' });
        }
        // step 3 assuming there is a match, we create a session for the user
        req.session.user = foundUser._id
        res.json({ user: foundUser });
    })
});


usersRouter.post('/signup', (req, res) => {
    console.log(req.body, 'is  signup  req.body')
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    req.body.password = hash;
    User.create(req.body, (error, user) => {
        req.session.user = user._id; // this is a login
        res.json({ user: user });
    });
});


usersRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Logged out' });
    });
});



module.exports = usersRouter;