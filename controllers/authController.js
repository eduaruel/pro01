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

    // console.log(vacantes);
    

    res.render('administracion',{
        nombrePagina: 'Panel Administrativo',
        tagLine: 'Crea y Administra tus Vacantes',
        nombrePaginaMostrar:true,
        nuevaTagLine:true,
        cerrarSesion:true,
        nombre: req.user.nombre,
        mostrarImagen2:true,
        imagen: req.user.imagen,
        vacantes
        
    });
};

exports.cerrarSesion = (req, res, next) => {
    req.logout(function(err){
        if(err) {
            return next(err);
        }
        req.flash('correcto','Sesion Cerrada')
        return res.redirect('/iniciar-sesion')
    });
 
    
}