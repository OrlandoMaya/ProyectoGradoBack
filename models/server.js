const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.ciudadPath='/api/ciudad';
        this.departamentoPath='/api/departamento'
        this.usuarioPath = '/api/usuario';
        this.estacionPath='/api/estacion';
        this.mantenimientoPath='/api/mantenimiento';
        this.ubicacionPath='/api/ubicacion';
        this.webhookPath='/api/webhook'
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //Uso de CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.ciudadPath, require('../routes/ciudad'));
        this.app.use(this.departamentoPath, require('../routes/departamento'));
        this.app.use(this.ubicacionPath, require('../routes/ubicacion'));
        this.app.use(this.estacionPath, require('../routes/estacion'));
        this.app.use(this.mantenimientoPath, require('../routes/mantenimiento'));
        this.app.use(this.usuarioPath, require('../routes/usuario'));
        this.app.use(this.webhookPath, require('../routes/webhook'))
        
    }

    listen() {
        this.app.listen(this.port);
    }

}

module.exports = Server;