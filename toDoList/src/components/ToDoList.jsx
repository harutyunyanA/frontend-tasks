import { AddToDo } from "./AddToDo";
import { ToDoFilter } from "./ToDoFilter";
import { List } from "./List";
import { useState } from "react";

export const ToDoList = () => {
  const [toDos, setToDos] = useState([
    { id: 101, text: "Read a book", completed: false },
    { id: 102, text: "Do workout", completed: true },
    { id: 103, text: "Write some code", completed: false },
    { id: 104, text: "Call a friend", completed: false },
    { id: 105, text: "Buy groceries", completed: true },
    { id: 106, text: "Clean the room", completed: false },
    { id: 107, text: "Go for a walk", completed: true },
    { id: 108, text: "Learn TypeScript", completed: false },
    { id: 109, text: "Cook dinner", completed: false },
    { id: 110, text: "Watch a movie", completed: true },
  ]);
  const filters = ["All", "Active", "Completed"];
  const [currentFilter, setCurrentFilter] = useState("All");
  const handleAdd = (text) =>
    setToDos([...toDos, { text, completed: false, id: Date.now() }]);
  const handleDelete = (id) => setToDos(toDos.filter((item) => item.id != id));
  const handleCopletedField = (id) => {
    toDos.map((item) => {
      if (item.id == id) {
        item.completed = !item.completed;
      }
    });
    setToDos([...toDos]);
  };
  const handleCurrentFilter = (filter) => {
    setCurrentFilter(`${filter}`);
  };

  return (
    <>
      <AddToDo onAdd={handleAdd} />
      <h2>ToDoList</h2>
      <ToDoFilter
        filters={filters}
        currentFilter={currentFilter}
        onFilter={handleCurrentFilter}
      />
      <List
        items={toDos}
        onDelete={handleDelete}
        onCompleted={handleCopletedField}
        filter={currentFilter}
      />
    </>
  );
};
