if(process.env.NODE_ENV=="production"){
module.exports={mongoURI:"mongodb+srv://filipecezarfonseca_db_user:blog22@blogjs.m4ekt7v.mongodb.net/?appName=Blogjs"}
}else{
module.exports={mongoURI:"mongodb://localhost/blogapp"}
}