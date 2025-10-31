import axios from "axios";
import { useEffect, useState } from "react";
import type { ILesson, IStudent } from "../types";
import ReactModal from "react-modal";
import { AddLesson } from "./addLesson";
import { AddRank } from "./addRank";

export default function Main() {
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [lessonModal, setLessonModal] = useState(false);
  const [rankModal, setRankModal] = useState(false);
  const [rankData, setRankData] = useState<any>();

  useEffect(() => {
    axios.get("http://localhost:4005/classbook/lessons").then((res) => {
      setLessons(res.data.lessons);
    });
    axios.get("http://localhost:4005/classbook/students").then((res) => {
      setStudents(res.data.students);
    });
  }, []);

  function onAddLessen() {
    setLessonModal(!lessonModal);
  }
  function onAddRank() {
    setRankModal(!rankModal);
  }

  return (
    <>
      <button
        className="bg-blue-500 text-white rounded-md px-8 py-2 mx-10 my-4 hover:cursor-pointer"
        onClick={onAddLessen}
      >
        Add Lesson
      </button>
      <div className="flex justify-around my-4 ">
        <div id="scores">
          <table>
            <thead>
              <tr>
                <th className="border border-black w-[400px] h-[150px]"></th>
                {lessons.map((lesson, i) => (
                  <th
                    key={lesson.id}
                    className="border border-black w-[40px] text-up"
                  >
                    L{i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border border-black">
                    <p className="m-1.5">
                      {student.name} {student.surname}
                    </p>
                  </td>
                  {lessons.map((lesson) => {
                    let rank = lesson.ranks.find(
                      (rank) => rank.studentId == student.id
                    );
                    if (rank) {
                      return (
                        <td
                          className="border border-black text-center"
                          key={lesson.id}
                        >
                          {rank.rate}
                        </td>
                      );
                    } else {
                      return (
                        <td
                          key={lesson.id}
                          className="border border-black text-center"
                          onClick={() => {
                            setRankData({
                              lessonID: lesson.id,
                              studentID: student.id,
                            });
                            onAddRank();
                          }}
                        ></td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="lessons">
          <table>
            <tbody>
              {lessons.map((lesson, i) => (
                <tr key={lesson.id}>
                  <td className="border border-black w-[180px]">
                    <p className="m-1.5">L{i + 1}</p>
                  </td>
                  <td className="border border-black w-[180px]">
                    <p className="m-1.5">{lesson.title}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReactModal
          isOpen={lessonModal}
          id="lesson-modal"
          style={{
            content: {
              position: "absolute",
              top: "200px",
              left: "500px",
              right: "500px",
              bottom: "300px",
              padding: "0px",
            },
          }}
        >
          <AddLesson
            setLessons={setLessons}
            lessons={lessons}
            setModal={setLessonModal}
          />
        </ReactModal>

        <ReactModal
          isOpen={rankModal}
          style={{
            content: {
              position: "absolute",
              top: "200px",
              left: "500px",
              right: "500px",
              bottom: "300px",
              padding: "0px",
            },
          }}
        >
          <AddRank
            rankData={rankData}
            lessons={lessons}
            setLessons={setLessons}
            setRankModal={setRankModal}
          />
        </ReactModal>
      </div>
    </>
  );
}
