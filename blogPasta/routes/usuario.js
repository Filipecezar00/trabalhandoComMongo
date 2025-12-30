const express = require("express"); 
const router = express.Router()
const mongoose = require('mongoose');
const { app_features } = require("moongose/models");
require("../models/usuario") 
const usuario = mongoose.model("usuarios")

router.get("/registro",(req,res)=>{
    res.render('usuarios/registro')
})

module.exports = router