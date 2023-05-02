export default class Queue<T> {
  private data: T[];

  constructor() {
    this.data = [];
  }

  public add(item: T) {
    this.data.push(item);
  }

  public clear() {
    this.data = [];
  }

  public remove(): T | undefined {
    return this.data.pop();
  }

  public peek(): T | undefined {
    return this.data[this.data.length - 1];
  }
}
