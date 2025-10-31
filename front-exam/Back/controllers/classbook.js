import { addLesson, addRank, getAllLessons, getAllStudents, getLesson, getStudent } from "../api/model.js"

class ClassBook {
    async addLesson(req, res) {
        const { title = "" } = req.body
        if (!title) {
            return res.status(400).send({ message: "missing fields: title" })
        }
        const newLesson = await addLesson({ title })
        return res.status(201).send({ lesson: newLesson })
    }
    async getLessons(req, res) {
        const result = await getAllLessons()
        return res.send({ lessons: result })

    }
    async getStudents(req, res) {
        const result = await getAllStudents()
        return res.send({ students: result })

    }
    async addRank(req, res) {
        const { id } = req.params
        const { student = -1, rank = -1 } = req.body
        if (student == -1 || rank == -1) {
            return res.status(400).send({ message: "Missing Fields" })
        }
        const found = await getLesson(id)
        if (!found) {
            return res.status(404).send({ message: "Lesson not found" })
        }
        const stud = await getStudent(student)
        if(!stud){
            return res.status(404).send({ message: "No such student" })
        }
        const result = await addRank(id, rank, student)
        if (!result) {
            return res.status(400).send({ message: "Rank already exist" })
        }
        return res.send({ result })
    }
}
export default new ClassBook()