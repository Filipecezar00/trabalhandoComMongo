const express = require("express")
const router = express.Router() 
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")

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

// Rota para Listar Postagens 
router.get("/postagens",(req,res)=>{
    Postagem.find().populate("categoria").sort({data:"desc"}).lean()
    .then((postagens)=>{
        res.render("admin/postagens",{postagens}) 
    })
    .catch(err=>{
        req.flash("error_msg","Erro ao listar Postagens") 
        res.redirect("/admin")
    })
})

// Rota para abrir o Formulário 
router.get("/postagens/add",(req,res)=>{
Categoria.find().lean()
.then((categorias)=>{
res.render("admin/addpostagem",{categorias:categorias})
})
.catch((err)=>{
req.flash("error_msg","Houve um erro ao Carregar o formulário")
res.redirect("/admin")
})
})

router.post("/postagens/nova",(req,res)=>{
    let erros = []
    if(!req.body.titulo || req.body.titulo.length<2){
      erros.push({texto:"Título Invalido"})
    }
    if(!req.body.slug || req.body.slug.length<2){
      erros.push({texto:"Slug invalido"})
    }
    if(!req.body.descricao || req.body.descricao.length<2){
      erros.push({texto:"Descrição invalido"})
    }
    if(!req.body.conteudo || req.body.conteudo.length<2){
      erros.push({texto:"Conteúdo invalido"})
    }
    if(req.body.categoria=="0"){
       erros.push({texto:"Categoria Inválida"})
    }
    if(erros.length>0){
       return Categoria.find().lean()
       .then(categorias=>{
        res.render("admin/addpostagem",{
            erros:erros,
            categorias
        })
       })
    }else{
        const novaPostagem={
            titulo: req.body.titulo,
            slug: req.body.slug
            .toLowerCase()
            .trim()
            .replace(/\s+/g,"-"),
            descricao:req.body.descricao, 
            conteudo:req.body.conteudo,
            categoria:req.body.categoria
       }
       new Postagem(novaPostagem).save()
       .then(()=>{
        req.flash("success_msg","Postagem Criada Com Sucesso"); 
        res.redirect("/admin/postagens")
       })
       .catch((err)=>{
        req.flash("error_msg","Erro ao Criar a Postagem") 
        res.redirect("/admin/postagens")
       })
    }
})
router.get("/postagens/edit/:id",(req,res)=>{
    Postagem.findById(req.params.id).lean()
    .then((postagem)=>{
        Categoria.find().lean()
        .then((categorias)=>{
        res.render("admin/editpostagens",{categorias,postagem})

        }).catch((err)=>{
            req.flash("error_msg","Houve Um erro ao listar ")
            res.redirect("/admin/postagens")
        })
    })
    .catch((err)=>{
        req.flash("error_msg","Houve um Erro ao Carregar o formulário de edição") 
        res.redirect("/admin/postagens")
    })
})
router.post("/postagens/edit",(req,res)=>{
    Postagem.findById(req.body.id)
     .then((postagem)=>{
        postagem.titulo = req.body.titulo
        postagem.slug=req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo=req.body.conteudo    
        postagem.categoria = req.body.categoria

        return postagem.save()

    }).then(()=>{
            req.flash("success_msg","Postagem Editada com Sucesso")
            res.redirect("/admin/postagens")
      }).catch(()=>{
            req.flash("error_msg","Erro ao editar")
            res.redirect("/admin/postagens")
        })
    })
router.get("/postagens/deletar/:id",(req,res)=>{
    Postagem.deleteOne({_id: req.params.id})
    .then(()=>{
        res.redirect("/admin/postagens")
    }).catch(()=>{
        req.flash("error_msg","Houve um erro Interno"); 
        res.redirect("/admin/postagens")
    })
})
module.exports = router