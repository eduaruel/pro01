const emailConfig = require('../config/email');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const util = require('util');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }

})

transport.use('compile',hbs({
    viewEngine: {
       extname: 'handlebars',
       defaultLayout: false,
    },
    viewPath: __dirname+'/../views/emails',
    extName:'.handlebars',
}));


exports.enviar = async (opciones) => {
    const opcionesEmail = {
        from: 'SG Venezuela <noreply@gmail.com>',
        to: opciones.usuario.email,
        subject: opciones.subject,
        template: opciones.archivo,
        context: {
            resetUrl: opciones.resetUrl,
        }
    };

    try {
        await transport.sendMail(opcionesEmail);
        console.log("Correo enviado exitosamente.");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        // Puedes manejar el error de alguna otra manera según tus necesidades
    }
};

