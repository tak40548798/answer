/**
 * 使用 Linked List 實作 Stack
 * 實作需包含以下方法。
 * push() : 添加新元素。
 * pop():移除元素並返回被移除的元素。
 * size():返回所有元素數量。
 * const myStack = new Stack()
 * myStack.push(1)
 * myStack.push(2)
 * myStack.push(3)
 * myStack.pop() // 3
 * myStack.size() // 2
 */

class Node {
  constructor(value, next) {
    this.value = value === undefined ? null : value;
    this.next = next === undefined ? null : next;
  }
}

class Stack {
  constructor() {
    this.top = null; // 最上面的元素參考
    this.bottom = null; // 最下面的元素參考
    this.length = 0;
  }

  push(value) {
    let newNode = new Node(value);
    // 首個進入堆疊的元素
    if (this.length === 0) {
      this.top = newNode; // 最上面的元素
      this.bottom = newNode; // 最下面的元素
    } else {
      newNode.next = this.top; // 進入堆疊的元素，連結到最上面的元素
      this.top = newNode; //  最上面的元素，就是目前進入堆疊的元素
    }
    this.length++;
  }

  pop() {
    if (!this.top) {
      return null;
    }
    // 最後一個元素離開堆疊時
    if (this.top === this.bottom) {
      this.bottom = null;
    }
    let topNode = this.top; // 暫存最上面的元素
    this.top = this.top.next; // 把最上面的元素，連結到到下一層的元素，相當於最上面的元素離開堆疊
    this.length--;
    return topNode.value;
  }

  size() {
    return this.length;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3
console.log(stack.size()); // 2
console.log(stack.pop()); // 2
