import { useState } from "react";
import { emptyFieldValidation, numberValidation } from "../../utils/helpers";
import axios from "axios";
export const AddUser = ({ onAdd }) => {
  const [user, setUser] = useState({ name: "", age: "" });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emptyFieldValidation(user.name) || !emptyFieldValidation(user.age)) {
      setError("Fill all fields");
      return;
    }

    if (!numberValidation(user.age)) {
      setError("Age must be a positive number");
      return;
    }

    setError("");
    axios.post("http://localhost:4002/users", user).then((response) => {
      onAdd(response.data);
      setUser({ name: "", age: "" });
    });
  };

  return (
    <div className="col-md-4">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            className="form-control"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label>Age</label>
          <input
            className="form-control"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: e.target.value })}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="btn btn-outline-success my-2">Save</button>
      </form>
    </div>
  );
};
