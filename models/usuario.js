/**
 * Created by cami on 5/1/16.
 */

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usuarioSchema = new Schema({
    idUsuario: {type:String},
    nombre: {type: String},
    correo: {type: String},
    contraseña: {type: String},
    preferencial: {type:Boolean}
});

module.exports = mongoose.model('Usuario', usuarioSchema);