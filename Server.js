const express = require('express');
const mongoose = require('mongoose');
const ingredientesRoutes = require('./routes/ingredientes');

class Server {

    constructor() {
        this.port = process.env.PORT ;
        this.app = express();
        this.cargarMiddlewares();
        this.cargarRutas();
        this.conectarABD();
    }

   listen() {
        this.app.listen(this.port,() => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }

    cargarMiddlewares() {
        this.app.use(express.json());
    }

    cargarRutas() {
        this.app.use("/api/ingredientes", require('./routes/ingredientes'));
    }

    conectarABD() {
       mongoose.connect(process.env.MONG_URI)
       .then(() => {
         console.log('Connecting to the database...', process.env.PORT)
       })
       .catch((err) => {
        console.log(`el mensaje de error es ${err}`);
       });
    }
}

module.exports = Server;