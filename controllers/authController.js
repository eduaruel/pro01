const passport = require('passport');
const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/administracion',
    failureRedirect : '/iniciar-sesion', 
    failureFlash: true,
    badRequestMessage : 'Ambos campos son obligatorios'
});

//revision cuando el usuario se autentica
exports.verificarUsuario = (req, res, next) => {
    //revisar usuario
    if(req.isAuthenticated()) {
        return next(); // estan autenticados
}

    //redireccionar
    res.redirect('/iniciar-sesion')
}


exports.panel = async (req, res) => {
    //se realiza una consulta al usuario
    const vacantes = await Vacante.find({autor: req.user._id});


    res.render('administracion',{
        nombrePagina: 'Panel Administrativo',
        tagLine: 'Crea y Administra tus Vacantes',
        nombrePaginaMostrar:true,
        nuevaTagLine:true,
        vacantes
        
    });
};