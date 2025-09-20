import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.id = String(Date.now());
    axios.post("http://localhost:4002/users", data).then(() => navigate("/"));
  };

  return (
    <div className="container">
      <h2>Add User</h2>
      <form
        className="form-control"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="mb-3 mt-3">
          <input
            {...register("name", { required: true })}
            type="name"
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="mb-3 mt-3">
          <input
            {...register("age", { required: true })}
            type="number"
            className="form-control"
            placeholder="Age"
            min={0}
          />
        </div>
        <div>
          <label htmlFor="">Are you married?</label>
          <input
            type="checkbox"
            style={{ marginLeft: "6px" }}
            {...register("isMarried")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
