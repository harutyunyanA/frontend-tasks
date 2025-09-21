import { useEffect, useState } from "react";
import { UserContext } from "./user-context";
import axios from "axios";

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4002/employees")
      .then(({ data }) => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:4002/employees/" + id)
      .then(() => setUsers(users.filter((user) => user.id !== id)));
  };
  const handleSalaryUP = (user) => {
    axios
      .patch("http://localhost:4002/employees/" + user.id, {
        salary: user.salary + 300,
      })
      .then(({ data }) => {
        setUsers(users.map((u) => (u.id === data.id ? data : u)));
      });
  };
  const handleSalaryDOWN = (user) => {
    axios
      .patch("http://localhost:4002/employees/" + user.id, {
        salary: user.salary - 300 >= 0 ? user.salary - 300 : 0,
      })
      .then(({ data }) => {
        setUsers(users.map((u) => (u.id === data.id ? data : u)));
      });
  };
  const handleAdd = (data) => {
    switch (data.position) {
      case "junior":
        data.salary = 800;
        break;
      case "middle":
        data.salary = 1300;
        break;
      case "senior":
        data.salary = 2500;
        break;
      case "lead":
        data.salary = 3000;
        break;
    }
    axios
      .post("http://localhost:4002/employees", data)
      .then(({ data }) => setUsers([...users, data]));
  };
  return (
    <>
      <UserContext.Provider
        value={{
          users,
          onDelete: handleDelete,
          onAdd: handleAdd,
          onSalaryUP: handleSalaryUP,
          onSalaryDOWN: handleSalaryDOWN,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
