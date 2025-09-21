import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/user-context";
export const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { onAdd } = useContext(UserContext);

  const handleAdd = (data) => {
    onAdd(data);
    reset();
  };

  return (
    <div className="col-md-4">
      <h2>add user</h2>
      <form onSubmit={handleSubmit(handleAdd)}>
        <div>
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
          <label>first name</label>
          <input
            className="form-control"
            {...register("name", { required: "please fill the name" })}
          />
        </div>
        <div>
          <label>age</label>
          <input
            className="form-control"
            {...register(
              "age",
              { setValueAs: (p) => +p },
              { required: "please fill the age field" }
            )}
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <div>
          <label>level</label>
          <select
            className="form-control"
            {...register("position", { required: true })}
          >
            <option></option>
            <option>junior</option>
            <option>middle</option>
            <option>senior</option>
            <option>lead</option>
          </select>
        </div>
        <div>
          <button className="btn btn-outline-success btn-sm my-2">save</button>
        </div>
      </form>
    </div>
  );
};
