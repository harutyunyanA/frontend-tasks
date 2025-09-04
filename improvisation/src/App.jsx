import { useEffect, useState } from "react";
import { AddUser } from "./components/add-user";
import { UserList } from "./components/user-list";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const handleAdd = (user) => setUsers([...users, user]);
  useEffect(() => {
    axios
      .get("http://localhost:4002/users")
      .then((response) => setUsers(response.data));
  }, []);

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:4002/users/${userId}`).then((response) => {
      setUsers(users.filter((user) => user.id !== userId));
      toast.success(`${response.data.name} was deleted`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
  };

  return (
    <div className="row container">
      <UserList users={users} onDelete={handleDelete} />
      <AddUser onAdd={handleAdd} />
      <ToastContainer />
    </div>
  );
}
