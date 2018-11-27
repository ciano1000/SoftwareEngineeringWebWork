var express = require('express');
var router = express.Router();
var User = require('../models/users');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',function(req,res,next){
    var username = req.body.user_name;
    var password = req.body.password;

    User.findOne({'user_name':username}, function(err,user){
        if(err)
        res.send(err);

        if(user){
            res.status(401).json({
                "status":"info",
                "body":"Username already taken"
            });
        }
        else{
            var newUser = new User();

            newUser.user_name = username;
            newUser.password =newUser.generateHash(password);
            newUser.access_token = createJwt({user_name:username})
            newUser.save(function(err,user){
                if(err)
                throw err;

                res.cookie('Authorization','Bearer '+user.access_token);
                res.json({'success':'account created'});
            });
        }

    });
});

router.post('/login',function(req,res,next){
    var username = req.body.user_name;
    var password = req.body.password;
    User.findOne({'user_name':username},function(err,user){
        if(err)
        res.send(err);

        if(user)
        {
            if(user.validPassword(password))
            {
                user.access_token = createJwt({user_name: username});
                user.save();
                res.cookie('Authorization','Bearer '+user.access_token);
                res.json({'success':'loggedIn'});
            }
            else
            {
                res.status(401).send({
                    "status":"error",
                    "body":"Email or password is incorrect"
                });
            }
        }
        else{
            res.status(401).send({
                "status":"error",
                "body":"username not found"
            });
        }
    });
});

router.get('/register',function(req,res,next){
    res.render('register');
});

router.get('/login',function(req,res,next){
    res.render('login');
});

function createJwt(profile)
{
return jwt.sign(profile, 'deezenutz',{
    expiresIn:'1d'
});
}

module.exports = router;
