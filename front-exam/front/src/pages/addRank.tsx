import axios from "axios";
import { useForm } from "react-hook-form";
import type { ILesson } from "../types";
import { useState } from "react";

interface AddRankProps {
  lessons: ILesson[];
  setLessons: any;
  setRankModal: any;
  rankData: { lessonID: number; studentID: number };
}

interface IRank {
  student: number;
  rank: number;
}

export function AddRank({
  lessons,
  setLessons,
  setRankModal,
  rankData,
}: AddRankProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const [error, setError] = useState("");

  const saveRank = (rank: any) => {
    let data: IRank = {
      rank: rank.rank,
      student: rankData.studentID,
    };

    axios
      .post(
        `http://localhost:4005/classbook/lessons/${rankData.lessonID}/rank`,
        data
      )
      .then((res) => {
        const result = res.data.result;

        for (let i = 0; i < lessons.length; i++) {
          if (lessons[i].id == result.id) {
            lessons[i] = res.data.result;
          }
        }
        console.log(lessons);
        setLessons([...lessons]);
        setRankModal(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <div className="text-white bg-cyan-500 py-6 px-4">
        <h1 className="text-5xl">Add Rank</h1>
      </div>
      <div className="mx-4">
        <h3>Rank</h3>
        {error && <p className="text-red-800">{error}</p>}
        <form onSubmit={handleSubmit(saveRank)}>
          <div className="border border-gray-500 w-[200px]">
            <input
              type="text"
              {...register("rank", { required: "Please input rank" })}
              name="rank"
              placeholder="keep rank between 0-10"
              className="outline-0"
            />
          </div>
          {errors.rank && (
            <p className="text-red-800">{errors.rank?.message as string}</p>
          )}
          <div className="border border-gray-700 w-[50px] h-[30px] bg-gray-200 hover:bg-gray-300 text-center">
            <button type="submit">save</button>
          </div>
        </form>
      </div>
    </>
  );
}
