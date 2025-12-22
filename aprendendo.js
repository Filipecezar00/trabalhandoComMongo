const mongoose = require("mongoose"); 

// Configurando o Mongoose
mongoose.Promise = global.Promise; 
mongoose.connect("mongodb://localhost/bancoTeste")
.then(()=>{
console.log("MongoDB Conectado")
}).catch((err)=>{
console.log("Houve um Erro ao se Conectar ao MongoDb!")
})