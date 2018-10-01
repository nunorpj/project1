const express = require('express')
const mongoose = require('mongoose')
const app = express();
const jwt = require('jsonwebtoken')
const User = require('./models/user');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/TODOApp',{ useNewUrlParser: true } );
mongoose.connection
    .once('open',()=>console.log('connected'))
    .on('error',(err)=>{
        console.log(`could not connect`, err);
    });



app.get('/api',(req,res)=>{
    res.json({
        message:'Welcome to the API'
    });
});


app.post('/api/registry',(req,res)=>{
    console.log('aqui')
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
    });

    newUser.save().then(savedUser=>{

        console.log('new user saved!')
        res.send('User saved!')
    }).catch(err=>{

        res.status(404).send('USER NOT SAVE BECAUSE.....' + err)
    });
});

app.post('/api/login',(req,res)=>{
    User.findOne({
            email: req.body.email,
            password: req.body.password
        }).then(user=>{
            if(user){
                console.log(user)
                jwt.sign({user},'secretkey',(err,token)=>{
                    res.json({
                        message : "loged in",
                        token
                    });
                });
            }else{
                res.json({
                    message: "error"
                })
            }

        })
})

app.post('/api/posts',verifyToken, (req,res)=>{

    jwt.verify(req.token,'secretkey',{expiresIn:'1h'} ,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:'Post created...',
                authData
            })
        }
    })
})

app.listen(9999,(err)=>{

    console.log('Runing on port 9999')
})


//FORMAT OF TOKEN
// Authorization: Bearer <access_token>



function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer id undefine

    if(typeof bearerHeader !== 'undefined')
    {
        //split at the space
        const bearer = bearerHeader.split(' ')
        //get token from array
        const bearerToken =bearer[1];
        //set the token

        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}