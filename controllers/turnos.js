/**
 * Created by cami on 5/2/16.
 */
module.exports = function (app) {

    var Turno = require("../models/turno.js");


    findAllTurnos = function (req, res) {
        Turno.find(function (err, turno) {
            if (err) res.send(500, err.message);

            console.log('GET /turnos')
            res.status(200).jsonp(turno);
        });
    };

    findById = function (req, res) {
        Turno.findById(req.params.id, function (err, turno) {
            if (err) return res.send(500, err.message);

            console.log('GET /turnos/' + req.params.id);
            res.status(200).jsonp(turno);
        });
    };

    addTurno = function (req, res) {
        console.log('POST');
        console.log(req.body);

        var turno = new Turno({
            idUsuario: req.body.idUsuario,
            numero:    req.body.numero,
            departamento:    req.body.departamento,
            atendido: req.body.atendido
        });

        turno.save(function (err, turno) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(turno);
        });
    };

    updateUsuario = function (req, res) {
        turno.findById(req.params.id, function (err, turno) {
            turno.turnoId= req.body.turnoId;
            turno.cedula=    req.body.cedula;
            turno.nombre=    req.body.nombre;
            turno.numCelular=req.body.numCelular;

            turno.save(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(turno);
            });
        });
    };

    deleteUsuario = function (req, res) {
        turno.findById(req.params.id, function (err, turno) {
            turno.remove(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).send();
            })
        });
    };

//Link routes and functions
    app.get('/turnos', findAllTurnos);
    app.get('/turnos/:id', findById);
    app.post('/turnos', addTurno);
    app.put('/turnos/:id', updateUsuario);
    app.delete('/turnos/:id', deleteUsuario);
}

