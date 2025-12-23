// Carregando modulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyparser = require("body-parser");
const moongose = require('mongoose');
const app = express();
// configurações 
    // body parser
    app.use(bodyparser.urlencoded({extended:true}));
    app.use(bodyparser.json());
    //HandleBars 
    app.engine("handlebars",handlebars({defaultLayout:'main'}));
    app.set("view engine","handlebars");
// rotas

// outros 
const port = 8081 ;
app.listen(port,()=>{
console.log("Servidor Rodando....");
})