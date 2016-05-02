module.exports = function (app) {

    var Usuario = require("../models/usuario.js");

    logIn = function (req, res) {
        var abc = req.params.info.split("-");
        Usuario.findOne({correo: abc[0], contraseña: abc[1]},'id',function (err, usuario) {
            if (err) res.status(500).send(err.message);
            console.log('GET /usuarios');
            var abc = "";
            if(usuario == null)
            {
                abc = "Credenciales Incorrectas"
            }
            else
            {
                abc = usuario.id
            }
            res.status(200).jsonp(abc);
        });
    };

    findAllUsuarios = function (req, res) {
        Usuario.find(function (err, usuario) {
            if (err) res.send(500, err.message);

            console.log('GET /usuarios')
            res.status(200).jsonp(usuario);
        });
    };

    findById = function (req, res) {
        Usuario.findById(req.params.correo, function (err, usuario) {
            if (err) return res.send(500, err.message);

            console.log('GET /usuarios/' + req.params.id);
            res.status(200).jsonp(usuario);
        });
    };

    addUsuario = function (req, res) {
        console.log('POST');
        console.log(req.body);

        var usuario = new Usuario({
            idUsuario: req.body.idUsuario,
            correo:    req.body.correo,
            nombre:    req.body.nombre,
            contraseña:req.body.contraseña,
            preferencial:req.body.preferencial,
            turno: ""
        });

        usuario.save(function (err, usuario) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(usuario);
        });
    };

    updateUsuario = function (req, res) {
        usuario.findById(req.params.id, function (err, usuario) {
            usuario.usuarioId= req.body.usuarioId;
            usuario.cedula=    req.body.cedula;
            usuario.nombre=    req.body.nombre;
            usuario.numCelular=req.body.numCelular;

            usuario.save(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(usuario);
            });
        });
    };

    deleteUsuario = function (req, res) {
        usuario.findById(req.params.id, function (err, usuario) {
            usuario.remove(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).send();
            })
        });
    };

//Link routes and functions
    app.get('/login/:info', logIn);
    app.get('/usuarios', findAllUsuarios);
    app.get('/usuarios/:id', findById);
    app.post('/usuarios', addUsuario);
    app.put('/usuarios/:id', updateUsuario);
    app.delete('/usuarios/:id', deleteUsuario);
}
