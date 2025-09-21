import { useContext } from "react";
import { UserContext } from "../context/user-context";

export const UserItem = ({ user }) => {
  const { onDelete, onSalaryUP, onSalaryDOWN } = useContext(UserContext);

  return (
    <div className="col-md-6 bg-light m-2">
      <div className="d-flex flex-row justify-content-around">
        <div>
          <p>{user.name}</p>
          <p>{user.age} years old</p>
          <p>Salary: ${user.salary}</p>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => onDelete(user.id)}
          >
            delete
          </button>
        </div>
        <div className="d-flex flex-column align-content-center justify-content-center gap-2">
          <button className="btn btn-success" onClick={() => onSalaryUP(user)}>
            Salary UP
          </button>
          <button
            className="btn btn-warning"
            onClick={() => onSalaryDOWN(user)}
          >
            Salary DOWN
          </button>
        </div>
      </div>
    </div>
  );
};
