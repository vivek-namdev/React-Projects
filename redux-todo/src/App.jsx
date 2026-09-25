import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
} from "./features/todos/todoSlice";

const App = () => {
  // Add todo state
  const [input, setInput] = useState("");

  // Edit todo state
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Send actions to Redux
  const dispatch = useDispatch();

  // Get todos from Redux store
  const todos = useSelector((state) => state.todos.todos);

  // CREATE
  const handleAddTodo = () => {
    if (!input.trim()) return;

    dispatch(addTodo(input));
    setInput("");
  };

  // Start editing
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  // UPDATE
  const handleUpdate = () => {
    if (!editText.trim()) return;

    dispatch(
      updateTodo({
        id: editId,
        text: editText,
      })
    );

    setEditId(null);
    setEditText("");
  };

  return (
    <div>
      <h1>Todo App</h1>

      {/* Add Todo */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter todo"
      />

      <button onClick={handleAddTodo}>
        Add Todo
      </button>

      <hr />

      {/* Todo List */}
      {todos.map((todo) => (
        <div key={todo.id}>
          {editId === todo.id ? (
            <>
              {/* Edit Input */}
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              {/* Update */}
              <button onClick={handleUpdate}>
                Update
              </button>
            </>
          ) : (
            <>
              {/* Todo Text */}
              <span
                style={{
                  textDecoration: todo.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {todo.text}
              </span>

              {/* Edit */}
              <button onClick={() => handleEdit(todo)}>
                Edit
              </button>
            </>
          )}

          {/* Toggle Complete */}
          <button
            onClick={() => dispatch(toggleTodo(todo.id))}
          >
            {todo.completed ? "Completed" : "Complete"}
          </button>

          {/* Delete */}
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;