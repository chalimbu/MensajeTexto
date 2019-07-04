const mongoose = require('mongoose')


const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    numero: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})
const Cliente = mongoose.model('Cliente', clienteSchema)

module.exports = Cliente