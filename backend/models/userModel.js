const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function(email, password) {

    //validation checks

    //check if email and password are provided
    if(!email || !password) {
        throw Error('All fields must be filled.')
    }

    //check if email is valid
    if(!validator.isEmail(email)) {
        throw Error('Invalid email')
    }

    //check if password is strong enough
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    //check if email is already in use
    const exists = await this.findOne({email})

    if(exists) {
        throw Error('Email already in use')
    }

    //salt and hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //create user
    const user = await this.create({email, password: hash})

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    
        //validation checks
    
        //check if email and password are provided
        if(!email || !password) {
            throw Error('All fields must be filled.')
        }
    
        //check if email is valid
        if(!validator.isEmail(email)) {
            throw Error('Invalid email')
        }
    
        //find user
        const user = await this.findOne({email})
    
        if(!user) {
            throw Error('User not found')
        }
    
        //compare password
        const match = await bcrypt.compare(password, user.password)
    
        if(!match) {
            throw Error('Invalid credentials')
        }
    
        return user
}

module.exports = mongoose.model('User', userSchema)