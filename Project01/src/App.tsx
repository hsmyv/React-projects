import React, { useState, useEffect } from "react";
import ListItem from "./model/ListItem";
import { todoApi } from "./api/todoApi"; // todoApi.ts

const App: React.FC = () => {
  const [list, setList] = useState<ListItem[]>([]);

  // Load from API
  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await todoApi.getAll();
      setList(todos);
    };
    fetchTodos();
  }, []);

  const addItem = async (text: string) => {
    const newItem = new ListItem("", text, false);
    const savedItem = await todoApi.add(newItem);
    setList((prev) => [...prev, savedItem]);
  };

  const removeItem = async (id: string) => {
    await todoApi.remove(id);
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleChecked = async (item: ListItem) => {
    item.checked = !item.checked;
    await todoApi.update(item);
    setList((prev) => [...prev]); // re-render
  };

  return (
    <main>
      <h1>My List</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem(
            "newItem"
          ) as HTMLInputElement;
          if (!input.value.trim()) return;
          addItem(input.value.trim());
          input.value = "";
        }}
      >
        <input id="newItem" type="text" placeholder="Add item" />
        <button type="submit">+</button>
      </form>

      <button
        onClick={async () => {
          for (const item of list) await todoApi.remove(item.id);
          setList([]);
        }}
      >
        Clear
      </button>

      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleChecked(item)}
            />
            <label>{item.item}</label>
            <button onClick={() => removeItem(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
