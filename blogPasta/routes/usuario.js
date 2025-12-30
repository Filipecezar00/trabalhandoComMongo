const express = require("express"); 
const router = express.Router()
const mongoose = require('mongoose');
const { app_features } = require("moongose/models");
require("../models/usuario") 
const usuario = mongoose.model("usuarios")

router.get("/registro",(req,res)=>{
    res.render('usuarios/registro')
})

router.post("/registro",(req,res)=>{
    var erros=[]
    if(!req.body.nome || typeof req.body.nome==undefined || req.body.nome==null){
        erros.push({texto:"Nome Inválido"}); 
    }
     if(!req.body.email || typeof req.body.email==undefined || req.body.email==null){
        erros.push({texto:"Email Inválido"}); 
    }
    
})

module.exports = router