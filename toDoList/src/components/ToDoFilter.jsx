export const ToDoFilter = ({ filters, currentFilter, onFilter }) => {
  return (
    <div className="filterContainer">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilter(filter)}
          className={filter == currentFilter ? "active" : "notActive"}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
