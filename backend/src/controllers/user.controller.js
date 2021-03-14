const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const validator = require('validator'); //for emeil validation package

const bcrypt = require('bcrypt'); // for password encryption
const saltRounds = 10;


//service
const jwt = require('../services/jwt.service');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

const User = require('../models/user.model');

router.get('/', jwt.verifyToken, function(req, res){
    jwt.verify(req.token, res, ['admin', 'user'], function(){
        User.find({}, function(err, users){ //select query
            if(err) return res.status(500).send('Users not found!');
    
            const usersData = users.map(function(item){
                return _.pick(item, ['email', 'name', 'roles'])
            })
            res.status(200).send(usersData)
        })
    })
})

// users/me
router.get('/me', jwt.verifyToken, function(req, res){
    jwt.verify(req.token, res, null, function(userData){
        User.findById({_id: userData.user.id}, function(err, user){ //select query
            if(err) return res.status(500).send('Users not found!');
            
            let userData = _.pick(user, ['email', 'name', 'roles'])
            
            res.status(200).send(userData)
        })
    })
})


router.post('/create', async function(req, res){
    if(!validator.isEmail(req.body.email)) return res.status(422).send({message: 'Email is not valid!'});//validate email

    let password = await bcrypt.hash(req.body.password, saltRounds);//encrypt password
    
    User.create({
        email: req.body.email,
        password: password,
        name: req.body.name,
        roles: req.body.roles
    }, function(err, user){
        if(err) return res.status(500).send('Users not found!');
        res.status(200).send(user)
    })
})

router.post('/login', async function(req, res){
    if(!validator.isEmail(req.body.email)) return res.status(422).send({message: 'Email is not valid!'});

    let user = await User.findOne({email: req.body.email}, function(err, user){
        return user;
    });

    if(!user) return res.status(401).send({message: 'Email or password is not valid'})
    
    let isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if(isValidPassword){
        user = _.pick(user, ['id', 'email', 'name', 'roles']);
        let token = await jwt.sing(user);
        res.status(200).send({
            token: token
        })
    }else{
        res.status(401).send({message: 'Email or password is not valid'})
    }

})
module.exports = router;