const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) => {
	res.render('nueva-vacante', {
		nombrePagina: 'Registrar Vacantes',
		tagline: 'completa el formulario y publica tu vacante',
		mostrarImagen4:true,
		boton: false,
		parrafo:false,
		nombrePaginaMostrar:true,
		cerrarSesion:true,
        nombre: req.user.nombre
	
		
	});
};

//agregar vacantes a la base de datos
exports.agregarVacante = async (req, res) => {
	const vacante = new Vacante(req.body);
	//console.log(req.body);

	// usuario autor de la vacante
	vacante.autor = req.user._id;

	// crear arreglo de skills
	vacante.skills = req.body.skills.split(',');
	//console.log(vacante);

	// nueva Vacante en la parte de almacenamiento de la base de dato
	const nuevaVacante = await vacante.save();
	//console.log(nuevaVacante);

	// redireccinamiento
	res.redirect(`/vacantes/${nuevaVacante.url}`);
};

//mostrar nueva Vacante
exports.mostrarVacante = async (req, res, next) => {
    const vacante = await Vacante.findOne({ url: req.params.url });
    // si no hay resultados
    if(!vacante) return next();

    res.render('vacante', {
        vacante,
        nombrePagina: vacante.titulo,
        boton:false,
		parrafo:false,
		nombrePaginaMostrar:true
    })
}

//editar Vacante

exports.formEditarVacante = async (req, res, next) => {
	const vacante = await Vacante.findOne({url: req.params.url})

	if(!vacante) return next()

	res.render('editar-vacante',{
		vacante,
		nombrePagina: `Editar-${vacante.titulo}`,
		barra: false,
		boton:false,
		nombrePaginaMostrar:true,
		cerrarSesion:true,
        nombre: req.user.nombre,
		mostrarImagen3:true
		
	})
}

exports.editarVacante = async (req, res) => {
	const vacanteActualizada = req.body;

	vacanteActualizada.skills = req.body.skills.split(',');

	const vacante = await Vacante.findOneAndUpdate({url:req.params.url}, vacanteActualizada,{
		new:true,
		runValidators:true,
	});

	res.redirect(`/vacantes/${vacante.url}`);

}

//validar y sanitizar los campos de lñas nuevas vacantes

exports.validarVancante = (req, res, next) => {
    // sanitizar los campos
    req.sanitizeBody('titulo').escape();
    req.sanitizeBody('empresa').escape();
    req.sanitizeBody('ubicacion').escape();
    req.sanitizeBody('salario').escape();
    req.sanitizeBody('contrato').escape();
    req.sanitizeBody('skills').escape();

    // validar
    req.checkBody('titulo', 'Agrega un Titulo').notEmpty();
    req.checkBody('empresa', 'Agrega una Empresa').notEmpty();
    req.checkBody('ubicacion', 'Agrega una Ubicación').notEmpty();
    req.checkBody('contrato', 'Selecciona un Tipo de Contrato').notEmpty();
    req.checkBody('skills', 'Agrega al menos un conocimiento').notEmpty();

    const errores = req.validationErrors();

    if(errores) {
        // Recargar la vista con los errores
        req.flash('error', errores.map(error => error.msg));

        res.render('nueva-vacante', {
            nombrePagina: 'Registrar Vacantes',
            tagline: 'Llena el formulario y publica tu vacante',
            cerrarSesion: true,
            nombre : req.user.nombre,
            mensajes: req.flash(),
			nombrePaginaMostrar:true,
			mostrarImagen4:true
        })
    }else{

		next();

	}

}
		


 


