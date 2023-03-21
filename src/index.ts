import express from "express"
import dotenv from "dotenv"
import { matchRouter } from "./route/MatchRoute"
import { dbConnection } from "./db/db"

const app=express()
dotenv.config()


app.use("/match",matchRouter)

app.use("/test",(req,res)=>{

    res.send("running")
})

app.listen(process.env.PORT  || 8000 , () =>{
    dbConnection()
    console.log("server is running")

} )