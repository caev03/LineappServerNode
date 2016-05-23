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

    tieneTurno = function (req, res)
    {
        query = {'idUsuario' : req.params.id, 'atendido':false};
        Turno.find(query, function (err, turno)
        {
            if (err) res.send(500, err.message);

            console.log('GET /turnos')
            res.status(200).jsonp(turno.length);
        });
    };

    darTurnoDep = function (req, res)
    {
        query = {'departamento':req.params.id}
        Turno.find(query, function (err, turno)
        {
            console.log(req.params.id);
            if (err) res.send(500, err.message);

            console.log('GET /turnos')
            res.status(200).jsonp((turno.length!=0)?turno[turno.length-1].numero:"start");
        });
    }

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

    updateTurno = function (req, res)
    {
        query = {'idUsuario' : req.params.id};
        Turno.find(query, function (err, turno)
        {
            console.log(req.params.id);
            console.log(turno);
            turno[0].atendido = true;

            turno[0].save(function (err) {
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
    app.get('/turnos/:id', tieneTurno);
    app.get('/turnosDep/:id',darTurnoDep);
    app.post('/turnos', addTurno);
    app.put('/turnos/:id', updateTurno);
    app.delete('/turnos/:id', deleteUsuario);
}

