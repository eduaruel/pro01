const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const usuarioScheme = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    nombre:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true,
        trim: true,
    },
    token:String,
    expira:Date,
    imagen:String
})

//metodo para hashear los password

usuarioScheme.pre('save', async function(next){
    //password ya esta hasheado 
    if(!this.isModified('password')){
        return next(); //deteniene la ejecucion
    }
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
})
//alerta cuando el musuario esta creado
usuarioScheme.post('save', function(error,doc,next){
    if(error.code === 11000){
        next('Este correo se encuentra registrado'); 
    }else{
        next(error);
    }
});

//Usuario autenticado
usuarioScheme.methods = {
    compararPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = mongoose.model('Usuarios',usuarioScheme);