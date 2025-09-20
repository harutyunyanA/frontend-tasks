import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4002/users/" + id)
      .then((res) => setUser(res.data));
  }, [id]);
  return (
    <>
      <h2>User details {id}</h2>
      {user && (
        <div className="card">
          <div className="card-body bg-light">
            <h4 className="card-title">{user.name}</h4>
            <p>{user.age} years old</p>
            <p>{user.isMarried ? "Married" : "Single"}</p>
          </div>
        </div>
      )}
    </>
  );
}
