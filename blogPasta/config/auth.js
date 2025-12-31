const localStrategy=  require("passport-local").Strategy
const mongoose = require("mongoose") 
const bcrypt = require("bcryptjs")

// Model de Usuario 
require("../models/usuario")
const usuario = mongoose.model("usuarios")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField:"email"},(email,senha,done)=>{
        
    }))
}