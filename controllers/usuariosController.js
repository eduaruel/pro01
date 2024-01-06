const mongoose = require('mongoose');
const { isInt8Array } = require('util/types');
const Usuarios = mongoose.model('Usuarios');
const multer = require('multer');
const { nanoid } = require('nanoid');
const { error } = require('console');

// Opciones de multer
const configuracionMulter = {
    limits:{fileSize: 100000},
    
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../public/uploads/perfiles');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            const nombreArchivo = `${nanoid()}.${extension}`;
            //console.log(nombreArchivo);
            cb(null, nombreArchivo);
        },
    }),
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg' || file.minetype === 'image/png'){
            cb(null,true);
        }else{
            cb(new Error('Formato no Válido'),false);
        }
    }
};

const upload = multer(configuracionMulter).single('imagen');

exports.subirImagen = (req, res, next) => {
    upload(req, res, function (error) {
       if (error){
        // console.log(error);
             if (error instanceof multer.MulterError) {
                // Manejar errores de Multer
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error','El tamaño del archivo es muy grande maximo 100 kb')
                }else{
                    req.flash('error',error.message)
                }
            } else {
                // Manejar otros errores
               req.flash('error', error.message)
            }
            res.redirect('/administracion');
            return;
       }else {
          // Si la carga fue exitosa, continuar con el siguiente middleware
        return next();
       }

        

      
    });
};



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
    req.sanitize('nombre');
    req.sanitize('email');
    req.sanitize('password');
    req.sanitize('confirmar');

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
            cerrarSesion:true,
			nombre: req.user.nombre,
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

//form  editar perfil
exports.formEditarPerfil = (req, res) => {
    res.render('editar-perfil', {
        nombrePagina: 'editar tú Perfil con SG Venezuela',
        nombrePaginaMostrar:true,
        Usuarios: req.user,
        cerrarSesion:true,
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        mostrarImagen5: true
    })
}

//Guardar cambios editar perfil
exports.editarPerfil = async (req, res) => {
    const usuario = await Usuarios.findById(req.user._id);

    // console.log(usuario);

    usuario.nombre = req.body.nombre;
    usuario.email  = req.body.email;
    if (req.body.password) {
        usuario.password = req.body.password;
    }
    if (req.file){
        usuario.imagen = req.file.filename;
    }
    await usuario.save();
    req.flash('correcto', 'Cambios Sactifactorio')

    //redireccionando

    res.redirect('/administracion');
}

//senitizar y validar formualario de editar perfiles
exports.validarPerfil = (req, res, next) =>{
    //sanitizar
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    if(req.body.password){
        req.sanitizeBody('password').escape();
    }
    //validar
    req.checkBody('nombre','El nombre no puede ir vacio').notEmpty();
    req.checkBody('email','El email no puede ir vacio').notEmpty();

    const errores = req.validationErrors();

    if(errores){
        req.flash('error', errores.map(error => error.msg));

        res.render('editar-perfil', {
        nombrePagina: 'Editar tú Perfil con SG Venezuela',
        nombrePaginaMostrar:true,
        Usuarios: req.user,
        cerrarSesion:true,
        nombre: req.user.nombre,
        mostrarImagen5: true,
        imagen: req.user.imagen,
        mensajes: req.flash()

         })
    }else{

        next()

    }


}
