import express from 'express'
import cors from 'cors'
import { classbookRouter } from './routes/classbook.js';

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use("/classbook", classbookRouter);

app.listen(4005, () => console.log("Server started on http://localhost:4005"))
