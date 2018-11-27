var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SoccerClub-Home' });
});

/*GET feed page*/
router.get('/feed',function(req,res,next){
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('feed');
        }
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }

});

router.post('/postcomment', function(req,res,next)
{
    try{
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if(profile)
        {
            comment = new Comment(req.body);
            comment.save(function(err,savedComment){
                if(err)
                    throw err;

                res.json({
                    "id":savedComment._id,
                    "message":savedComment.message
                });
            });
        }
    }
    catch(err)
    {
        res.json({"status":"error","body":["You are not logged in"]});
    }

//res.json({Sum:sum});
});

router.get('/getcomments',function(req,res,next)
{

    try{
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if(profile)
        {
            Comment.find({},function(err,comments)
            {
            if(err)
             res.send(err);

       
        
            res.json( comments.sort(function compare(a,b)
            {
                var dateA = new Date(a.date);
                var dateB = new Date(b.date);
                return (dateA-dateB)*-1;
            }).slice(0,10));
         })
        }
    }
    catch(err)
    {
        res.json({"status":"error","body":["You are not logged in"]});
    }

    
});

router.patch('/upvote/:commentid',function(req,res,next){
    try{
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if(profile)
        {
            Comment.findByIdAndUpdate(req.params.commentid,{$inc:{upvotes: 1}},function(err,response){
                if(err)
                res.send(err);
        
                res.json({response:"found and updated comment: "+req.params.commentid+" message:"+req.body.message});
        
            });
        }
    }
    catch(err)
    {
        res.json({"status":"error","body":["You are not logged in"]});
    }
});
router.patch('/downvote/:commentid',function(req,res,next){
    try{
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if(profile)
        {
            Comment.findByIdAndUpdate(req.params.commentid,{$inc:{downvotes: 1}},function(err,response){
                if(err)
                res.send(err);
        
                res.json({response:"found and updated comment: "+req.params.commentid+" message:"+req.body.message});
        
            });
        }
    }
    catch(err)
    {
        res.json({"status":"error","body":["You are not logged in"]});
    }
});

router.patch('/edit/:commentid/',function(req,res,next){
    try{
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if(profile)
        {
            Comment.findByIdAndUpdate(req.params.commentid,req.body.message,function(err,response){
                if(err)
                res.send(err);
        
                res.json({response:"found and updated comment: "+req.params.commentid+" message:"+req.body.message});
        
            });
        }
    }
    catch(err)
    {
        res.json({"status":"error","body":["You are not logged in"]});
    }
   
});

router.delete('/delete/:commentid/',function(req,res,next){
    
    try{
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if(profile)
        {
            Comment.findByIdAndRemove(req.params.commentid,function(err,response)
            {
                if(err)
                res.send(err);
        
                res.send({response:"Found and deleted comment with id:"+req.params.commentid});
        
            });
        }
    }
    catch(err)
    {
        res.json({"status":"error","body":["You are not logged in"]});
    }

    
});

function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, 'deezenutz');
    return value;
}

module.exports = router;
