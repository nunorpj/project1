const nodemailer = require('nodemailer');
const User = require('../db/models/user');
const Todo = require('../db/models/todo')
const moment = require('moment');

var CronJob = require('cron').CronJob;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       // user: 'yczme5ce6jdjuhmb@ethereal.email', // generated ethereal user
      //  pass: 'F8jdp4GPtXUFGR36u4' // generated ethereal password
      user: 'nunomailer@gmail.com',
      pass: 'nunorafael'
       
    }
});


const job = new CronJob('00 00 * * * *', function() {
    var time = moment().format("H");
    console.log("mails");
    
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

                    if(moment(todo.goalDate).isSame(moment(new Date()),"day"))
                    {
                        itensToSend.push(todo.text);
                    }
                })
                console.log("bora "+ user.email + " tens " + itensToSend.length);


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

}, null, false);


module.exports.job = job;