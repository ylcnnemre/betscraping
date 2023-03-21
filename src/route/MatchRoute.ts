import express from "express"
import { matchModel } from "../model/matchModel"
import { getBetValue } from "../service/MatchService"

export const matchRouter= express.Router()

matchRouter.get("/",(req,res)=>{
    
     matchModel.find().select("-_id").then(val =>{
            
        res.status(200).send(val)

     }).catch(err =>{
        res.status(500).send("internal server error")
     })


})


matchRouter.get("/updateMatch",(req,res)=>{
    getBetValue().then(async (val)=>{
        if(val)
        {
            await  matchModel.deleteMany({})
            await matchModel.insertMany(val)
            res.send(val)
        }
    }).catch(err=>{
         res.send(err)
    })
})