import { useState, useCallback } from "react";

const SortableList = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (input.trim() === "") {
      return;
    }

    setItems([
      ...items,
      {
        id: `item-${items.length}`,
        name: input,
      },
    ]);

    setInput("");
  };

  const sortItems = useCallback(
    (order) => {
      const sortedItems = [...items].sort((a, b) => {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });

      setItems(sortedItems);
    },
    [items]
  );

  return (
    <div>
      <h1>Sortable List</h1>

      <input
        type="text"
        placeholder="Add a new item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addItem}>Add Item</button>

      <button onClick={() => sortItems("asc")}>
        Sort Ascending
      </button>

      <button onClick={() => sortItems("desc")}>
        Sort Descending
      </button>

      <ul>
        {items.map((item) => (
          <li key={item.id} data-test-id={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortableList;