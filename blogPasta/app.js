// Carregando modulos
const express = require("express");
const {engine} = require("express-handlebars");
// const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const admin = require("./routes/admin")
const path = require("path")
// configurações 
    // body parser
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    //HandleBars 
     app.engine("handlebars",engine({defaultLayout:"main"})); 
     app.set("view engine","handlebars"); 
     app.set("views",path.join(__dirname,"views")); 
// Mongoose 
    // Em breve 
        // Public
        app.use(express.static(path.join(__dirname,"public")))
//Rotas 
app.use('/admin',admin)
// Outros 
const port = 8081 ;
app.listen(port,()=>{
console.log("Servidor Rodando....");
})