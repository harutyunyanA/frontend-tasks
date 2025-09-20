import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4002/users").then((res) => setUsers(res.data));
  }, []);
  return (
    <div className="container">
      <h2>Users</h2>
      <Link to={"/add"} className="btn btn-primary">
        Add user
      </Link>
      <div className="container" style={{ marginTop: "6px" }}>
        {users.map((user) => (
          <div key={user.id} className="card" style={{ marginBottom: "6px" }}>
            <div className="card-body">
              <h4>{user.name}</h4>
              <p>{user.age} years old</p>
              <Link to={"/users/" + user.id} className="btn btn-primary">
                details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
