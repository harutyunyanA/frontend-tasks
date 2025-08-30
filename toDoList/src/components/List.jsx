import { ToDoItem } from "./ToDoItem";
export const List = ({ items, onDelete, onCompleted, filter }) => {
  const filteredList = items.filter((todo) => {
    switch (filter) {
      case "Active":
        return !todo.completed;
      case "Completed":
        return todo.completed;
      case "All":
      default:
        return true;
    }
  });
  return (
    <div className="list">
      {filteredList.length == 0 ? (
        <p style={{ textAlign: "center", width: "100%" }}>Empty list</p>
      ) : (
        filteredList.map((todo) => {
          return (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onCompleted={onCompleted}
            />
          );
        })
      )}
    </div>
  );
};
