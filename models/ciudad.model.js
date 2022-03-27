const { Schema, model } = require('mongoose');


const CiudadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    idDepartamento:{
        type:Schema.Types.ObjectId,
        ref: 'Departamento',
        required:true
    }
    
})

CiudadSchema.methods.toJSON = function() {
    const { __v, _id, ...ciudad } = this.toObject();
    ciudad.uid = _id;
    return ciudad;
}

module.exports = model('Ciudad', CiudadSchema);