import express, { Application, Request, Response } from "express"
import { router } from "./apps/routes/book.router"
import { borrowRouter } from "./apps/routes/borrow.router"
const cors = require('cors')
const app:Application = express()

app.use(cors({origin: ['http://localhost:5173', 'https://abookshelfs.netlify.app']}))

app.use(express.json())

app.get('/', (req:Request,res:Response)=>{
    res.send("Hi book borrower")
})

app.use('/', router)
app.use('/', borrowRouter)


export default app;