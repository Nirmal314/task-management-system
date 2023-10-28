import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'nambasana033@gmail.com',
        pass: 'tumflomknoclpzoo'
    }
});

async function sendEmail(to, subject, text) {
    try {
        await transporter.sendMail({
            from: 'nambasana033@gmail.com',
            to,
            subject,
            text
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export default sendEmail