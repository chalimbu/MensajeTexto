const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./utils/twilio')
require("./db/mongoose")

const clienteRouter = require('./routers/clientes')
const userRouter = require('./routers/user')

const app = express()

const port = process.env.PORT


//define paths to express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handelebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setub static directory to server
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(clienteRouter)
app.use(userRouter)


app.get('', (req, res) => {

        res.render('index', {})
    })
    //

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})