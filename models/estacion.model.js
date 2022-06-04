const { Schema, model } = require('mongoose');


const EstacionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    nivelPrecaucion:{
        type:Number
    },
    nivelAlerta:{
        type:Number
    },
    idUbicacion:{
        type:Schema.Types.ObjectId,
        ref: 'Ubicacion',
        required:true
    },
    topic:{
        type:String,
        unique:true,
        required:[true]
    },
    ruleId:{
        type:String
    },
    enabled:{
        type:Boolean,
        default:true
    },
    createTime:{
        type:Date,
        default: Date.now
    }

    
})

EstacionSchema.methods.toJSON = function() {
    const { __v, _id, ...estacion } = this.toObject();
    estacion.uid = _id;
    return estacion;
}

module.exports = model('Estacion', EstacionSchema);