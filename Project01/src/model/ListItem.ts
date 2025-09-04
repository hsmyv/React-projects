export interface Item{
    id: string,
    item: string,
    checked: boolean,
}

export default class ListItem {
  constructor(
    public id: string,
    public item: string,
    public checked: boolean = false
  ) {}
}
