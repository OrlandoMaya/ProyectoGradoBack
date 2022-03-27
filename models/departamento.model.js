const { Schema, model } = require('mongoose');


const DepartamentoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
    
})

DepartamentoSchema.methods.toJSON = function() {
    const { __v, _id, ...departamento } = this.toObject();
    departamento.uid = _id;
    return departamento;
}

module.exports = model('Departamento', DepartamentoSchema);