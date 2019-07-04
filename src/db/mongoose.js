const mongoose = require('mongoose')
console.log('call the database')
mongoose.connect(process.env.MONGODB_URL_MENSAJES_TEXTO, {
    useNewUrlParser: true,
    useCreateIndex: true
})