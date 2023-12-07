const Express = require('express');
const router = Express.Router();
const homeController = require('../controllers/homeController.js');
const vacantesController = require('../controllers/vacanteCrontoller.js');
const usuariosController = require('../controllers/usuariosController.js');
const authController = require('../controllers/authController.js');
module.exports = () => {
	  router.get('/', homeController.mostrarTrabajos);

    // Crear Vacantes
    router.get('/vacantes/nueva',
    authController.verificarUsuario,
    vacantesController.formularioNuevaVacante );

    router.post('/vacantes/nueva',
    authController.verificarUsuario,
    vacantesController.agregarVacante );

    // Mostrar Vacante (singular)
    router.get('/vacantes/:url',vacantesController.mostrarVacante );

    // Editar Vacante
    router.get('/vacantes/editar/:url',
    authController.verificarUsuario,
    vacantesController.formEditarVacante);

    router.post('/vacantes/editar/:url',
    authController.verificarUsuario,
    vacantesController.editarVacante);

    //Crear cuentas 
    router.get('/crear-cuenta',usuariosController.formCrearCuenta);
    router.post('/crear-cuenta',
    usuariosController.validarRegistro,
    usuariosController.crearUsuarios
    );

    //Autenticar usuarios
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //panel
    router.get('/administracion',
    authController.verificarUsuario,
    authController.panel);
    

	return router;
    
};
