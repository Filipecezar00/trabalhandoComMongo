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
  router.get("/categorias/edit/:id",(req,res)=>{
    Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
         res.render("admin/editcategorias" , {categoria: categoria});
    }).catch((err)=>{
        req.flash('error_msg', "Esta Categoria Não Existe"); 
        res.redirect("/admin/categorias"); 
    })
    
  })
    router.post("/categorias/edit",(req,res)=>{
     let erros = []

     if(!req.body.nome|| typeof req.body.nome==undefined ||req.body.nome==null){
        erros.push({texto:"Nome Inválido para edição!"})
     }
     if(!req.body.slug|| typeof req.body.slug==undefined ||req.body.slug==null){
        erros.push({texto:"Slug Invalido para edição!"})
     }
      
     if(req.body.nome && req.body.nome.length<2){
        erros.push({texto:"Nome pequeno demais para a categoria"})
     }
     if(!req.body.id){
      erros.push({texto:"ID inválido"})
     }

     if(erros.length>0){
        return Categoria.findById(req.body.id).lean().then((categoria)=>{
            res.render("admin/editcategorias",{
                erros, 
                categoria 
            })
        }) 
     }

     Categoria.findByIdAndUpdate(req.body.id,{
        nome:req.body.nome,
        slug:req.body.slug 
     })
     .then(()=>{
        req.flash("success_msg","Categoria Editada com Sucesso"); 
        res.redirect("/admin/categorias"); 
     })

      .catch(()=>{
        req.flash("error_msg", "Erro ao Editar Categoria")
        res.redirect("/admin/categorias")
      })
 })
  router.post("/categorias/deletar",(req,res)=>{
     Categoria.findByIdAndDelete(req.body.id)
      .then(()=>{
        req.flash("success_msg","Categoria Deletada com Sucesso"); 
        res.redirect("/admin/categorias")
    })
    .catch((err)=>{
        req.flash("error_msg","Houve um Erro ao Deletar")
        res.redirect("/admin/categorias") 
    })
}) 
  router.get("/categorias/add",(req,res)=>{
  res.render("admin/addcategorias")
})
router.post("/postagens/nova",(req,res)=>{
    
})

module.exports = router