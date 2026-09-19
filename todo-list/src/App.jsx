import React, { useState } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      name: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };


  const toggleComplete = (id) => {
    const updatedTodo = todos.map((todo) => {
      if(todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    })
    setTodos(updatedTodo);
  };


  const editTodo = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);

    setInput(selectedTodo.name);
    setEditId(id);
  };

  const updateTodo = () => {
    if (input.trim() === "") return;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return {
          ...todo,
          name: input,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
    setEditId(null);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>

      <input
        type="text"
        placeholder="Enter todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {editId === null ? (
        <button onClick={addTodo}>
          Add Todo
        </button>
      ) : (
        <button onClick={updateTodo}>
          Update Todo
        </button>
      )}

      {todos.map((todo) => (
        <div key={todo.id}>
          <p style={{textDecoration: todo.completed ? "line-through" : "none"}}>
            {todo.name}
          </p>

          <button onClick={() => editTodo(todo.id)}>
            Edit
          </button>

          <button onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>

          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? "Completed" : "Complete"}
          </button>

        </div>
      ))}
    </div>
  );
};

export default App;