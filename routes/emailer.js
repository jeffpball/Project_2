var nodemailer = require('nodemailer');

module.exports = function(){

    var transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
          user: 'coding_test@yahoo.com',
          pass: 'test123456'
        }
      });
      
      var mailOptions = {
        from: 'coding_test@yahoo.com',
        to: 'xiejing418@hotmail.com',
        subject: 'ComfyRide Booking Confirmation',
        text: 'Your ComfyRide has been scheduled, please log in your account to review the details. :)'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
            
}