const { Schema, model } = require('mongoose');


const DepartamentoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
    
})

module.exports = model('Departamento', DepartamentoSchema);