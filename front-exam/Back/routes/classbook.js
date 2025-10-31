import express from 'express'
import classbook from '../controllers/classbook.js';

export const classbookRouter = express.Router();

classbookRouter.post("/lessons", classbook.addLesson)
classbookRouter.post("/lessons/:id/rank", classbook.addRank)
classbookRouter.get("/lessons", classbook.getLessons)
classbookRouter.get("/students", classbook.getStudents)



