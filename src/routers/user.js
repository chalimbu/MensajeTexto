const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()


router.post('/users', async(req, res) => {
    //console.log(req.body)
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
            //console.log(user)
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }

})

router.post('/users/login', async(req, res) => {
    try {

        const user = await User.findByCredential(req.body.name, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout/', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})


router.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove()
        console.log(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router