interface IQueue<T> {
  enqueue(item: T): void;

  dequeue(): T | undefined;

  size(): number;
}

class Queue<T> implements IQueue<T> {
  private storage: T[] = [];

  constructor(
    private data: T[] = [],
    private capacity = 15,
  ) {
    this.storage = data;
  }

  enqueue(item: T): void {
    if (this.size() >= this.capacity) {
      this.dequeue();
    }
    this.storage.push(item);
  }

  dequeue(): T | undefined {
    return this.storage.shift();
  }

  size(): number {
    return this.storage.length;
  }

  length(): number {
    return this.storage.length;
  }

  count(): number {
    return this.storage.length;
  }

  getQueue(): T[] {
    return this.storage;
  }
}

export { Queue };
