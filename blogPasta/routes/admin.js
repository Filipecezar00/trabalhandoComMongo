const express = require("express")
const router = express.Router() 
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/',(req,res)=>{
   res.render("admin/index"); 
})
router.get('/posts',(req,res)=>{
    res.send("Página de Posts"); 
})

router.get('/categorias',(req,res)=>{
    res.render("admin/categorias"); 
})

router.post("/categorias/nova",(req,res)=>{
    const novaCategoria = {
        nome:req.body.nome, 
        slug:req.body.slug 
    } 
    new Categoria(novaCategoria).save().then(()=>{
        res.redirect("/admin/categorias"); 
        console.log("Categoria Salva com Sucesso")
    }).catch((err)=>{
        console.log("Houve um Erro"+ err)
    })
})

router.get("/categorias/add",(req,res)=>{
res.render("admin/addcategorias")
})

module.exports = router