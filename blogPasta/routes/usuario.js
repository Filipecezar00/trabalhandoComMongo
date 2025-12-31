const express = require("express"); 
const router = express.Router()
const mongoose = require('mongoose');
// const { app_features } = require("mongoose/models");
require("../models/usuario") 
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")

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
     if(!req.body.senha || typeof req.body.senha==undefined || req.body.senha==null){
        erros.push({texto:"Senha Inválida"}); 
    }
     if(req.body.senha.length<4){
        erros.push({texto:"Senha Muito Curta"}); 
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto:"Senha Diferente da Anterior"}); 
    }

    if(erros.length>0){
        return res.render("usuarios/registro",{erros})
    }else{
        Usuario.findOne({email:req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash("error_msg","Já existe uma Conta com esse email")
              return  res.redirect("/usuarios/registro")
            }

                const novoUsuario = new Usuario({
                        nome:req.body.nome,
                        email:req.body.email, 
                        senha:req.body.senha 
                })

                bcrypt.genSalt(10,(erro,salt)=>{
                    bcrypt.hash(novoUsuario.senha,salt,(erro,hash)=>{
                        if(erro){
                            req.flash("error_msg","Houve um erro no salvamento")
                           return res.redirect("/")
                        }
                        novoUsuario.senha=hash

                        novoUsuario.save().then(()=>{
                            req.flash("success_msg","Usuario Criado Com Sucesso") 
                            res.redirect("/")
                        }).catch(()=>{
                            req.flash("error_msg","Houve um erro ao Criar o Usuario")
                            res.redirect("/usuarios/registro")
                        })
                    })
                })
            
        }).catch((err)=>{
            req.flash("error_msg","Erro ao Cadastrar Usuario")
            res.redirect("/")
        })
    }
})
 router.get("/login",(req,res)=>{
        res.render('usuarios/login')
    })
router.post("/login",(req,res,next)=>{
passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/usuarios/login",
    failureFlash: true
})(req,res,next)
})
router.get("/logout",(req,res)=>{
    req.logout()
    req.flash("success_msg","Deslogado Com sucesso!")
    res.redirect("/")
})
module.exports = router