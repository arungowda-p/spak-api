const config = require('config.json')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    getById,
    authenticate,
    create,
    getAll,
    searchUsers,
    resetpassword,
    logout
}

async function authenticate(req, { username, password }) {
    const user = await User.findOne({ username })
    if( user && bcrypt.compareSync(password, user.hash)){
        const token = jwt.sign( { sub: user.id }, req.sessionID, { expiresIn: '10d'});
        req.session.payload = token
        console.log(req.session.payload)
        return {
            ...user.toJSON()
        }
    }
}

async function getById(id) {
    return await User.findById(id)
}

async function create(userParam) {

    if( await User.findOne({ username: userParam.username })) {
        throw `Username ${userParam.username} is already taken.`
    }

    const user = new User(userParam)

        if(userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10)
            console.log(user.oldhash)

            user.oldhash.push(bcrypt.hashSync(userParam.password, 10))
        }

        user.save()
}

async function resetpassword(userParam) {
    const user = await User.findOne( { username: userParam.username });

    if(!user) throw 'User not found!'
    if( userParam.newpassword !== userParam.confirmpassword) {
        throw `Confirm Password dosen't match`
    }
    if( user && bcrypt.compareSync(userParam.oldpassword, user.hash)){
        throw 'Your current Username or password is not matching'
    }
    userParam.oldhash = user.oldhash
    if(userParam.newpassword){
        userParam.hash = bcrypt.hashSync(userParam.newpassword, 10)
        if(userParam.oldhash.includes(userParam.hash)){
            throw 'Password already used. Try different!'
        }
        else {
            userParam.oldhash.splice(0,1)
            userParam.oldhash.push(userParam.hash)
        }
    }
    Object.assign(user, userParam)

    await user.save()
}

async function getAll(){
    return await User.find()
}

async function searchUsers(userParam){
    let query
    const projection = {
        _id: 0,
        username: 1,
        contact: 1
      }
    if (userParam.contact) {
        query = { $text: { $search: userParam.contact } }
    }
    else if (userParam.username) {
        query = { $text: { $search: userParam.username } }
    }
    console.log(query)
    return await User.find(query).collation( { locale: "se" } ).select(projection)
}

async function logout(req){
    req.session.destroy()
    req.sessionID
    return 'Logged out successfully!'
}
