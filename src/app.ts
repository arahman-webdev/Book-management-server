import express, { Application, Request, Response } from "express"

const app:Application = express()

app.use(express.json())

app.get('/', (req:Request,res:Response)=>{
    res.send("Hi book borrower")
})

export default app;