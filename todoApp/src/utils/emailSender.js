var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
const mongoose = require('mongoose')
const User = require('../../models/user');
const Todo = require('../../models/todo')
const moment = require('moment');

mongoose.connect(process.env.MONGOOSE, {
    useNewUrlParser: true
});
mongoose.connection
    .once('open', () => console.log('connected emailSide'))
    .on('error', (err) => {
        console.log(`could not connect emailSide`, err);
    });

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

    var users = User.find({
        notifications: true,
        sendingHour: time
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


function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}