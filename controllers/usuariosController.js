const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

exports.formCrearCuenta = (req,res)=>{
    res.render('crear-cuenta',{
        nombrePagina: 'Crea tu cuneta en SG Venezuela',
        tagline: 'Comienza a publicar tus vacantes',
        nombrePaginaMostrar:true,
        parrafo:true,
        
    })
}

exports.validarRegistro = (req, res, next) => {
    //sanitizar 
    req.sanitize('nombre').escape();
    req.sanitize('email').escape();
    req.sanitize('password').escape();
    req.sanitize('confirmar').escape();

    //validar
    req.checkBody('nombre', 'Nombre Obligatorio').notEmpty();
    req.checkBody('email', 'Email No Valido').isEmail();
    req.checkBody('password', 'Password No Valido').notEmpty();
    req.checkBody('confirmar', 'Confirmar Password').notEmpty();
    req.checkBody('confirmar', 'Password Diferente').equals(req.body.password);

    const errores = req.validationErrors();

    // console.log(errores);
    // return 
    if(errores){
        //console.log(errores);
       req.flash('error', errores.map(error => error.msg));
        res.render('crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en SG Venezuela',
            tagline: 'Comienza a publicar tus vacantes',
            nombrePaginaMostrar:true,
            parrafo:true,
            mensajes: req.flash()
        })
        return 
    }

    next();
}

exports.crearUsuarios = async (req, res, next) => {
    // crear usuario
    const usuario = new Usuarios(req.body);
    // console.log(usuario);

     try {
        await usuario.save();
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error);
        res.redirect('/crear-cuenta');
    }

}

// formulario de iniciar sesion
exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar-Sesión',
        nombrePaginaMostrar:true,
    })
}