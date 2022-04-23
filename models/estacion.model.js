const { Schema, model } = require('mongoose');


const EstacionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    // inicio:{
    //     type: Date,
    //     required: [true, 'La fecha de inicio es obligatoria']
    // },
    estado:{
        type:String,
        emun:['Operando','Desactivado','Fallando']
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
        required:[true],
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