const { Schema, model } = require('mongoose');


const EstacionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    inicio:{
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    estado:{
        type:String,
        emun:['Operando','Desactivado','Fallando']
    },
    idUbicación:{
        type:Schema.Types.ObjectId,
        ref: 'Ubicacion',
        required:true
    },
    // Id del usuario que realizo el mantenimiento
    // userId:{
    //     type:String,
    //     required:[true]
    // },
    dId:{
        type:String,
        unique:true,
        required:[true]
    },
    selected:{
        type:Boolean,
        required:[true],
        default:false
    },
    createTime:{
        type:Number
    }

    
})

EstacionSchema.methods.toJSON = function() {
    const { __v, _id, ...estacion } = this.toObject();
    estacion.uid = _id;
    return estacion;
}

module.exports = model('Estacion', EstacionSchema);