const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Clientes = require('./cliente')

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: [7, 'To little password'],
            trim: true,
            validate(value) {
                if (value.includes('password')) {
                    throw new Error('Password must no contain password')
                }
            }
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    })
    //User.findByCredential

userSchema.virtual('Clientes', {
    ref: 'Cliente',
    localField: '_id',
    foreignField: 'user'
})

userSchema.statics.findByCredential = async(name, password) => {

    const user = await User.findOne({ name })
    console.log(user)
    if (!user) {
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to log in')
    }

    return user
}


//statics access on the model, methond on a specific user
userSchema.methods.generateAuthToken = async function() {
    const user = this
    console.log(user)
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
        //console.log(userObject)

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//must be a normal function, hash the plain password
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
            //received
    }

    next() //indica qeu la funcion termino, antes de guardar
})

//delete user task when user is removed
userSchema.pre('remove', async function(next) {
    const user = this
        //await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User