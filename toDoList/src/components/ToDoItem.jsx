export const ToDoItem = ({ todo, onDelete, onCompleted }) => {
  return (
    <div className={todo.completed ? "done" : ""}>
      <p className="todoText">{todo.text}</p>
      <button className="item-btn" onClick={() => onDelete(todo.id)}>
        DELETE
      </button>
      <button className="item-btn" onClick={() => onCompleted(todo.id)}>
        {todo.completed ? "CANCEL" : "COMPLETED"}
      </button>
    </div>
  );
};
