/**
 * Created by cami on 5/2/16.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var turnoSchema = new Schema({
    idUsuario: {type:String},
    numero: {type: String},
    departamento: {type: String},
    atendido: {type: Boolean}
});

module.exports = mongoose.model('Turno', turnoSchema);