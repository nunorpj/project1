var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
const mongoose = require('mongoose')
const User = require('../../models/user');
const Todo = require('../../models/todo')
const moment = require('moment');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       // user: 'yczme5ce6jdjuhmb@ethereal.email', // generated ethereal user
      //  pass: 'F8jdp4GPtXUFGR36u4' // generated ethereal password
      user: 'nunomailer@gmail.com',
      pass: 'nunorafael'
       
    }
});


var j = schedule.scheduleJob('00 * * * *', function () {
    var time = moment().format("H");

    User.find({
        notifications: true,
        sendingHour: time
    }).then(users => {
        users.forEach(user => {
            Todo.find({
                owner: user._id,
                done: false
            }).then(todos => {
                var itensToSend = [];

                todos.forEach(todo => {

                    if(moment(todo.date).isSame(moment(new Date()),"day"))
                    {
                        itensToSend.push(todo.text);
                    }
                })

                var itensToSendString = 'Bom dia hoje tem programado:\n';
                var itensToSendStringHtml ='Bom dia hoje tem programado:' +'<br>'
                itensToSend.forEach(item=>{
                    itensToSendString = itensToSendString +"-"+ item +';\n';
                    itensToSendStringHtml = itensToSendStringHtml + "-" + item +';<br>'
                })

                if (itensToSend.length > 0) {
                    let mailOptions = {
                        from: 'yczme5ce6jdjuhmb@ethereal.email', // sender address
                        to: user.email, // list of receivers
                        subject: 'Tasks for today ✔', // Subject line
                        text: itensToSendString, // plain text body
                        html: itensToSendStringHtml // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }


                    });
                }
            })
        });

    })





});


