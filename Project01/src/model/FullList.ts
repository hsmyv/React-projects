import ListItem from "./ListItem";
import API_BASE_URL from "../config";

interface List {
  list: ListItem[];
  load(): Promise<void>;
  save(): Promise<void>;
  clearList(): Promise<void>;
  addItem(itemObj: ListItem): Promise<void>;
  removeItem(id: string): Promise<void>;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  async load(): Promise<void> {
    try {
      const res = await fetch(`${API_BASE_URL}/todos`);
      const data = await res.json();
      this._list = data.map(
        (item: any) => new ListItem(item.id, item.item, item.checked)
      );
    } catch (error) {
      console.error("API Load error:", error);
    }
  }

  async save(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/todos/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this._list),
      });
    } catch (error) {
      console.error("API Save error:", error);
    }
  }

  async addItem(itemObj: ListItem): Promise<void> {
    try {
      const res = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemObj),
      });
      const newItem = await res.json();
      this._list.push(new ListItem(newItem.id, newItem.item, newItem.checked));
    } catch (error) {
      console.error("API Add error:", error);
    }
  }

  async removeItem(id: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/todos/${id}`, { method: "DELETE" });
      this._list = this._list.filter((item) => item.id !== id);
    } catch (error) {
      console.error("API Remove error:", error);
    }
  }
}
