const express = require('express');
const router = express.Router();
const userService = require('./user.service')
const checkToken = require('../_helpers/auth')

router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/resetpassword', reset);
router.get('/', checkToken, getAll);
router.post('/search', checkToken, searchUsers);
router.get('/logout', logout);

module.exports = router

function authenticate(req, res, next) {
    userService.authenticate(req, req.body)
        .then(user => user ? res.json(user): res.sendStatus(400).json({ message: 'Username or Password is incorrect'}))
        .catch( err => next(err))
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.send('User registered.'))
        .catch(err => next(err))
}

function reset(req, res, next) {
    userService.resetpassword(req.body)
    .then(() => res.send('Password changed successfully.'))
    .catch(err => next(err))
}

function getAll(req, res, next) {
    userService.getAll(req.body)
    .then(users => res.json(users))
    .catch(err => next(err))
}
function searchUsers(req, res, next) {
    userService.searchUsers(req.body)
    .then(users => res.json(users))
    .catch(err => next(err))
}

function logout(req, res, next) {
    userService.logout(req)
    .then(response => res.send(response))
    .catch(err => next(err))
}
