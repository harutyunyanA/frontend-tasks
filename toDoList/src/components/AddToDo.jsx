import { useState } from "react";

export const AddToDo = ({ onAdd }) => {
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const handleSave = () => {
    if (!text.trim()) {
      return setError("please fill the text");
    }
    setError("");
    onAdd(text);
    setText("");
  };
  return (
    <div className="inputContainer">
      <h3>Add to do</h3>
      <input
        className={`input-field${error ? "-warning" : ""}`}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
