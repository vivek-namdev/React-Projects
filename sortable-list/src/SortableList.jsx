import { useCallback } from "react";
import { useState } from "react";
import "./App.css";

const SortableList = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: `item-${items.length + 1}`,
      name: input,
    };

    setItems([...items, newItem]);
    setInput("");
  };

  const sortAsc = useCallback(() => {
    const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

    setItems(sortedItems);
  }, [items]);

  const sortDesc = useCallback(() => {
    const sortedItems = [...items].sort((a, b) => b.name.localeCompare(a.name));

    setItems(sortedItems);
  }, [items]);

  return (
    <div className="app">
      <h1 className="line">Sortable List</h1>

      <div className="simplify">
        <input
          type="text"
          placeholder="Add a new item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={addItem}>Add Item</button>

        <button onClick={sortAsc}>Sort Ascending</button>

        <button onClick={sortDesc}>Sort Descending</button>
      </div>

      <ul>
        {items.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
      
    </div>
  );
};

export default SortableList;
