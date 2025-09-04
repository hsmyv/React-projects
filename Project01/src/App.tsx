import React, { useState, useEffect } from "react";
import ListItem from "./model/ListItem";
import { todoApi } from "./api/todoApi"; // todoApi.ts
import "./css/style.css"; // CSS importu

const App: React.FC = () => {
  const [list, setList] = useState<ListItem[]>([]);

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
    setList((prev) => [...prev]);
  };

  const clearAll = async () => {
    for (const item of list) await todoApi.remove(item.id);
    setList([]);
  };

  return (
    <main>
      <section className="newItemEntry">
        <form
          className="newItemEntry__form"
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
          <input
            name="newItem"
            type="text"
            placeholder="Add item"
            className="newItemEntry__input"
          />
          <button type="submit" className="newItemEntry__button">
            +
          </button>
        </form>
      </section>

      <section className="listContainer">
        <div className="listTitle">
          <h2>My List</h2>
          <button className="listTitle__button" onClick={clearAll}>
            Clear
          </button>
        </div>

        <ul className="listItems">
          {list.map((item) => (
            <li key={item.id} className="item">
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
      </section>
    </main>
  );
};

export default App;
