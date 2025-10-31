import { readFile, writeFile } from "fs/promises";
const PATH = "./data.json";

export const getAllStudents = async () => {
  const result = await readAll();
  return result.students;
};

export const getAllLessons = async () => {
  const result = await readAll();
  return result.lessons.map((less) => {
    return less;
  });
};

export const addLesson = async ({ title = "" }) => {
  const all = await readAll();
  const obj = { id: Date.now(), title, ranks: [] };
  all.lessons.push(obj);
  await writeFile(PATH, JSON.stringify(all));
  return obj;
};
export const getLesson = async (id) => {
  const result = await getAllLessons();
  return result.find((a) => a.id == id);
};
export const getStudent = async (id) => {
  const result = await getAllStudents();
  return result.find((a) => a.id == id);
};
export const addRank = async (lesson, rate, student) => {
  const all = await readAll();
  const lessonFound = all.lessons.find((a) => a.id == lesson);
  if (!lessonFound) {
    return null;
  }
  const already = lessonFound.ranks.find((a) => a.studentId == student);
  if (already) {
    return null;
  }
  lessonFound.ranks.push({ studentId: student, rate });
  await writeFile(PATH, JSON.stringify(all));
  return lessonFound;
};
export const readAll = async () => {
  const result = await readFile(PATH, "utf-8");
  if (!result) {
    return {
      students: [],
      lessons: [],
    };
  }
  return JSON.parse(result);
};
