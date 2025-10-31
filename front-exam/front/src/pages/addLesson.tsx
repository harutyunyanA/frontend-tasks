import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ILesson } from "../types";
import { useState } from "react";

interface AddLessonProps {
  lessons: ILesson[];
  setLessons: any;
  setModal: any
}
export function AddLesson({ lessons, setLessons, setModal }: AddLessonProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();
  const [error, setError] = useState("");

  const saveLesson: SubmitHandler<{ title: string }> = (data) => {
    axios
      .post("http://localhost:4005/classbook/lessons", data)
      .then((res) => {
        setLessons([...lessons, res.data.lesson]);
        setModal(false)
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <div className="text-white bg-cyan-500 py-6 px-4">
        <h1 className="text-5xl">Add Lesson</h1>
      </div>
      <div className="mx-4">
        <h3>Title of Lesson</h3>
        {error && <p className="text-red-800">{error}</p>}
        <form onSubmit={handleSubmit(saveLesson)}>
          <div className="border border-gray-500 w-[200px]">
            <input
              type="text"
              {...register("title", { required: "Please input lesson name" })}
              name="title"
              placeholder="title of the lesson"
              className="outline-0"
            />
          </div>
          {errors.title && (
            <p className="text-red-800">{errors.title?.message}</p>
          )}
          <div className="border border-gray-700 w-[50px] h-[30px] bg-gray-200 hover:bg-gray-300 text-center">
            <button type="submit">save</button>
          </div>
        </form>
      </div>
    </>
  );
}
