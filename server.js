const express=require("express")
const path=require("path")

const app=express()

app.use(express.static("public"))
app.use("/models",express.static("models"))
app.use("/data",express.static("data"))

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"public/index.html"))
})

app.listen(3000,"0.0.0.0",()=>{
console.log("Server running")
console.log("Server running http://localhost:3000")
})