/* 규격 정의.  
스택을 변경하거나 다른 종류의 스택을 만들었을 때 사용자는 몰라도 됨. 
인터페이스만 쓰고 있기 때문에 변경할 것이 없다. */
{
  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  } // 두가지 기능이 있고, 사이즈라는 속성을 만들어 두었다.

  type StackNode = {
    readonly value: string;
    readonly next?: StackNode; // 값이 있거나 없는 경우  StackNode|undefined; 와 같다.
  }; // readonly 를 이용해서 값이 한번 정해지면 변경될 수 없도록 한다.

  class StackImpl implements Stack {
    private _size: number = 0;
    private head?: StackNode;

    constructor(private capacity: number) {}
    get size() {
      return this._size;
    }
    push(value: string) {
      if (this.size === this.capacity) {
        throw new Error('Stack is full!');
      }
      const node: StackNode = { value, next: this.head };
      this.head = node;
      this._size++;
    }
    pop(): string {
      if (this.head == null) {
        // 널체크를 했다. 보통 head는 null 일수도 undefined일 수도 있다. === undefined하면 오류 위험이 있음. 여기서는 null일 수 없지만 보통 이렇게 널 체크를 한다.
        throw new Error('Stack is empty!');
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl(10);
  stack.push('Ellie 1');
  stack.push('Bob 2');
  stack.push('Steve 3');
  stack.push('Vincent 4');

  console.log(stack);
  console.dir(stack, { depth: null });
  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  stack.pop();
}
