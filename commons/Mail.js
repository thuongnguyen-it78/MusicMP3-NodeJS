const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false, 
    auth: {
        user: 'carousell.ltw.nhom09@gmail.com',
        pass: '123456789ltW',
    }
});

class Mail {
    sendMail(email, name, code) {
        const html = `<h1 style = "color: #000; font-size: 25px">Chào ${name}!,</h1>
                    <div style = "height: 500px; font-size: 20px; color: #000" >
                        <span style = "color: #DC4134">Đây là mã xác nhận của cậu: </span> <b>${code}</b>
                    </div>`
        
        const mailOptions = {
            from: 'carousell.ltw.nhom09@gmail.com',
            to: email,
            subject: "Verify Account Music App iOS",
            html
        }

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });

        
    }
}

module.exports = new Mail()

// new Mail().sendMail("thuongnguyen.it78@gmail.com", "Thường", "ABC")