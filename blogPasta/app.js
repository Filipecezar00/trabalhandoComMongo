// Carregando modulos
const express = require("express");
const {engine} = require("express-handlebars");
// const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const admin = require("./routes/admin")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
require("./models/Postagem")
const Postagem = mongoose.model("postagens")
// configurações 
    // Sessão 
    app.use(session({
        secret:"cursodenode", 
        resave:true, 
        saveUninitialized:true 
    }))
    app.use(flash())
    // Middleware
            app.use((req,res,next)=>{
             res.locals.success_msg = req.flash("success_msg")
             res.locals.error_msg = req.flash("error_msg")
             next()
            })
            
    // body parser
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    //HandleBars 
     app.engine("handlebars",engine({defaultLayout:"main"})); 
     app.set("view engine","handlebars"); 
     app.set("views",path.join(__dirname,"views")); 
// Mongoose 
    mongoose.connect("mongodb://localhost/blogapp").then(()=>{
        console.log("Conectado ao Mongo")
    }).catch((err)=>{
        console.log("Erro ao se Conectar: " + err )
    })
        // Public
        app.use(express.static(path.join(__dirname,"public")))
        
//Rotas   
app.get('/',(req,res)=>{
Postagem.find().populate("categoria").sort({data:"desc"})
.then((postagens)=>{
res.render("index",{postagens})
}).catch(()=>{
    req.flash("error_msg","Houve Um Erro Interno"); 
    res.redirect("/404")
    })
})

app.get("/404",(req,res)=>{
res.send("Erro 404")
})


app.get("/posts",(req,res)=>{
res.send("lista Posts")
})
app.use('/admin',admin)
// Outros 
const port = 8081 ;
app.listen(port,()=>{
console.log("Servidor Rodando....");
})