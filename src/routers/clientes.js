const express = require('express')
const Cliente = require('../models/cliente')
const User = require('../models/user')
const auth = require('../middleware/auth')
const twilio = require('../utils/twilio')
const router = new express.Router()

router.post('/cliente', auth, async(req, res) => {
    const existe = await Cliente.find({ user: req.user._id, numero: req.body.numero })
    if (existe.length > 0) {
        res.status(405).send()
        return
    }
    const cliente = new Cliente({
        ...req.body,
        user: req.user._id
    })
    try {
        await cliente.save()
        res.status(201).send(cliente)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Get task?completed=false
//limit skip
router.get('/clientes', auth, async(req, res) => {
    const match = {}
    const sort = {}


    try {
        //await req.user.populate("Clientes").execPopulate()

        const clientes = await Cliente.find({ user: req.user._id })
            //console.log(req.user)
        res.status(200).send(clientes)
    } catch (e) {
        res.status(500).send(e)
    }
})



router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Cliente.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/enviarMensaje', auth, async(req, res) => {
    var casosCorrectos = 0
    var resultados = []
    const mensaje = req.body.mensaje
    try {
        const clientes = await Cliente.find({ user: req.user._id })
        for (i = 0; i < clientes.length; i++) {
            try {
                twilio(clientes[i].numero, mensaje)
                casosCorrectos++
            } catch (e) {
                resultados.push({ id: 2, enviado: clientes[i].numero, mensaje: e.message })
                console.log(resultados)
            }
        }
        resultados.push({ id: 1, mensaje: "se realizaron " + casosCorrectos + " envios correctos" })
        await res.status(200).send(resultados)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router