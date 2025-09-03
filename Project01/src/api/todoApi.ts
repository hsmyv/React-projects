import ListItem from "../model/ListItem";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/todos`;

export const todoApi = {
  async getAll(): Promise<ListItem[]> {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.map((todo: any) => new ListItem(todo.id, todo.item, todo.checked));
  },
  async add(item: ListItem): Promise<ListItem> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: item.item, checked: item.checked }),
    });
    const saved = await res.json();
    item.id = saved.id;
    return item;
  },
  async update(item: ListItem) {
    await fetch(`${API_URL}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: item.checked, item: item.item }),
    });
  },
  async remove(id: string) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  },
};
