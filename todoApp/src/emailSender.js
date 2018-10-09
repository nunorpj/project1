var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
const mongoose = require('mongoose')
const User = require('../models/user');
const Todo = require('../models/todo')

mongoose.connect('mongodb://localhost:27017/TODOApp', {
    useNewUrlParser: true
});
mongoose.connection
    .once('open', () => console.log('connected emailSide'))
    .on('error', (err) => {
        console.log(`could not connect emailSide`, err);
    });

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'yczme5ce6jdjuhmb@ethereal.email', // generated ethereal user
        pass: 'F8jdp4GPtXUFGR36u4' // generated ethereal password
    }
});


var j = schedule.scheduleJob('43 17 * * *', function () {
    console.log("It's 8 am, let's send some emails boys");


    var users = User.find({
        notifications: true
    }).then(users => {
        users.forEach(user => {
            var todos = Todo.find({
                owner: user._id,
                done: false
            }).then(todos => {
                var itensToSend = [];

                todos.forEach(todo => {

                    if (sameDay(todo.date, new Date())) {
                        itensToSend.push(todo.text);
                    }
                })

                var itensToSendString = 'Bom dia hoje tem programado:\n';

                itensToSend.forEach(item=>{
                    itensToSendString = itensToSendString +"-"+ item +';\n';
                })

                if (itensToSend.length > 0) {
                    let mailOptions = {
                        from: 'yczme5ce6jdjuhmb@ethereal.email', // sender address
                        to: user.email, // list of receivers
                        subject: 'Tasks for today ✔', // Subject line
                        text: itensToSendString, // plain text body
                        html: '<b>' + itensToSendString + '</b>' // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


                    });
                }
            })
        });

    })





});


function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}