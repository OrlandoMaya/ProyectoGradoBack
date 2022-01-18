const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        this.umbrellaPath = '/api/umbrella';
        this.paymentPath = '/api/payment';
        this.comboPath = '/api/combo';

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
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/users'));
        this.app.use(this.umbrellaPath, require('../routes/umbrellas'));
        this.app.use(this.paymentPath, require('../routes/payments'));
        this.app.use(this.comboPath, require('../routes/combos'));
    }

    listen() {
        this.app.listen(this.port);
    }

}

module.exports = Server;