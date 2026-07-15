import express from 'express'
import routers from './router/pages.js'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { body, validationResult } from 'express-validator'


const port = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use("/", routers)

app.listen(port, (error)=>{
    if(error){
        throw error
    }
    else{
        console.log(`somebody is listening. check yo walls at ${port}`)
    }
})