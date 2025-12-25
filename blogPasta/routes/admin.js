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
    Categoria.find().lean() 
       .then((categorias)=>{
        res.render("admin/categorias",{categorias})
    })
       .catch((err)=>{
        req.flash("error_msg", "houve um Erro ao listar")
        res.redirect("/admin")
    })
})

router.post("/categorias/nova",(req,res)=>{
    var erros = []
    if(!req.body.nome || typeof req.body.nome==undefined || req.body.nome == null ){
     erros.push({texto:"Nome Inválido"})
    }
    if(!req.body.slug|| typeof req.body.slug==undefined || req.body.slug==null){
        erros.push({texto:"Slug Inválido"})
    }
    if(req.body.nome && req.body.nome.length < 2){
        erros.push({texto:"Nome da Categoria Muito Pequeno"})
    }
    if(erros.length>0){
    return  res.render("admin/addcategorias",{erros:erros})
    }else{
        const novaCategoria = {
        nome:req.body.nome, 
        slug:req.body.slug 
        } 
        new Categoria(novaCategoria).save().then(()=>{
        req.flash("success_msg","Categoria Criada Com Sucesso")
        res.redirect("/admin/categorias"); 
    }).catch((err)=>{
         req.flash("error_msg","Houve um erro ao registrar tente novamente")
         res.redirect("/admin")
    })
   }
})

  router.get("/categorias/add",(req,res)=>{
  res.render("admin/addcategorias")
})

module.exports = router