const express = require("express")
const router = express.Router() 

router.get('/',(req,res)=>{
    res.send("Página Principal do painel adm"); 
})
router.get('/posts',(req,res)=>{
    res.send("Página de Posts"); 
})

router.get('/categorias',(req,res)=>{
    res.send("Página de Categorias"); 
})

module.exports = router