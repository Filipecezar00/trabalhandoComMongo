const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const Postagem = new Schema({
    titulo:{
        type:String, 
        require:true 
    }, 
})