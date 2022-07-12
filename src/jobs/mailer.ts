const nodemailer = require('nodemailer');

export class NodeMailer {

    sendMail(toAddresses, subject, body_html): boolean {

        try {
            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.MAIL_USER_USERNAME,
                    pass: process.env.MAIL_USER_PASSWORD
                },
            });

            // Configuracion del correo.
            const mailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: toAddresses,
                subject,
                // cc: ccAddresses,
                // bcc: bccAddresses,
                // text: body,
                html: body_html,
            };
            transporter.sendMail(mailOptions, (err: any, info) => {
                if (err) {
                    console.error(err.message);
                    return false;
                }
                else {
                    console.log(`EMAIL ENVIADO A: ${toAddresses} // ${info.messageId}`);
                    return true;
                }
            });
            return true;
        } catch (error) {
            return false;
        }

    }
}
