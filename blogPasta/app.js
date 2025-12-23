// Carregando modulos
const express = require("express");
const {engine} = require("express-handlebars");
// const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
// configurações 
    // body parser
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    //HandleBars 
     app.engine("handlebars",engine({defaultLayout:"main"})); 
// Mongoose 
    // Em breve 

//Rotas 

// Outros 
const port = 8081 ;
app.listen(port,()=>{
console.log("Servidor Rodando....");
})