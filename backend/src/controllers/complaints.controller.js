const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

//service
const jwt = require('../services/jwt.service');

const Complaints = require('../models/complaints.model');

router.get('/', jwt.verifyToken, function(req, res){
    jwt.verify(req.token, res, null, function(userData){
        if(userData.user.roles.includes('admin')){
            Complaints.find({}, function(err, complaints){ //select query
                if(err) return res.status(500).send('complaints not found!');
                res.status(200).send(complaints)
            })
        }

        if(userData.user.roles.includes('user')){
            Complaints.find({userId:userData.user.id }, function(err, complaints){ //select query
                if(err) return res.status(500).send('complaints not found!');
                res.status(200).send(complaints)
            })
        }
    });
})

router.get('/:id', jwt.verifyToken, function(req, res){
    jwt.verify(req.token, res, null, function(userData){
        if(userData.user.roles.includes('admin')){
            Complaints.findById({_id: req.params.id}, function(err, complaints){ //select query
                if(err) return res.status(500).send('complaints not found!');
                res.status(200).send(complaints)
            })
        }

        if(userData.user.roles.includes('user')){
            Complaints.findById({_id: req.params.id, userId:userData.user.id }, function(err, complaints){ //select query
                if(err) return res.status(500).send('complaints not found!');
                res.status(200).send(complaints)
            })
        }
    });
})
router.post('/create', jwt.verifyToken, function(req, res){
    jwt.verify(req.token, res, ['user'], function(userData){
        Complaints.create({
            status: 'pending',
            title: req.body.title,
            description: req.body.description,
            userId: userData.user.id 
        }, function(err, complaint){
            if(err) return res.status(500).send('complaint not found!');
            res.status(200).send(complaint)
        })
    });
})

router.put('/update/:id', jwt.verifyToken, function(req, res){
    jwt.verify(req.token, res, ['admin'], function(userData){
        Complaints.findByIdAndUpdate({_id: req.params.id}, {
            status: req.body.status
        },  function(err, complaint){
            if(err) return res.status(500).send('complaint not found!');
            res.status(200).send(complaint)
        })
    });
})

module.exports = router;