const mongoose = require("mongoose"); 

// Configurando o Mongoose
mongoose.Promise = global.Promise; 
mongoose.connect("mongodb://localhost/bancoTeste")
.then(()=>{
console.log("MongoDB Conectado")
}).catch((err)=>{
console.log("Houve um Erro ao se Conectar ao MongoDb!")
})
// Model -Usuarios
// Definindo o Model 
const UsuariosScheme = mongoose.Schema({
    nome:{
        type:String , 
        required: true 
    }, 
    sobrenome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
    idade:{
        type:Number,
        required:true 
    }, 
    país:{
        type:String
    }
})
// Collection 
mongoose.model('usuarios',UsuariosScheme)

const User = mongoose.model("usuarios")

new User({
    nome:"victtor", 
    sobrenome:"Leite", 
    email:"victtor@gmail.com", 
    idade: 19, 
    país:"bosnia"
}).save().then(()=>{
    console.log("usuario Criado....")
}).catch((err)=>{
    console.log(err)
})

