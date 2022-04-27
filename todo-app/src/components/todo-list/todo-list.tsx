import {Component, State, h} from '@stencil/core';

type Item = {
  complete: boolean;
  id: number;
  order: number;
  text: string;
}

@Component({
  tag: 'todo-list',
  shadow: true,
  styleUrl: 'todo-list.css'
})
export class TodoList {

  @State()
  filter: string = 'all';

  @State()
  incompleteItems: number = 0;

  @State()
  items: Item[] = [
    {complete: false, id: 1, order: 1, text: 'Task 1'},
    {complete: false, id: 2, order: 2, text: 'Task 2'},
    {complete: false, id: 3, order: 3, text: 'Task 3'}
  ];

  addItem(text: string) {
    const id = this.items.reduce(
      (previous, current) => Math.max(previous, current.id), 0
    ) + 1;

    const order = this.items.reduce(
      (previous, current) => Math.max(previous, current.order), 0
    ) + 1;

    const item: Item = {
      complete: false,
      id: id,
      order: order,
      text: text
    };

    this.items = [...this.items, item];
  }

  clearCompleted() {
    this.items = this.items.filter(item => !item.complete);
  }

  completeItem(item: Item) {
    this.items = this.items.map(it => {
      if (it === item) {
        it.complete = !it.complete;
      }

      return it;
    });
  }

  componentWillRender() {
    this.incompleteItems = this.items.filter(item => !item.complete).length;
  }

  handleKeyDown(event: KeyboardEvent){
    if (event.key !== 'Enter') {
      return;
    }

    const inputElement = event.target as HTMLInputElement
    const text = inputElement.value.trim();

    if (!text.length) {
      // TODO: display validation error
      console.error('text is required');
      return;
    }

    this.addItem(text);
    inputElement.value = '';
  }

  removeItem(item: Item) {
    this.items = this.items.filter(it => it !== item);
  }

  render() {
    return (
      <div>
        <h1>Todo</h1>

        <div class="bg-white flex mb-1 rounded">
          <div class="p-1">○</div>

          <input
            class="flex-grow p-1"
            onKeyDown={event => this.handleKeyDown(event)}
            placeholder="Create a new todo..."
            type="text" />
        </div>

        <div class="bg-white rounded shadow">
          {this.items.filter(item => {
            return this.filter == 'all'
              || (this.filter == 'active' && !item.complete)
              || (this.filter == 'completed' && item.complete)
          }).map(item =>
            <div class="bb-1 flex" key={item.id}>
              <div class="p-1 pointer" onClick={() => this.completeItem(item)}>{item.complete ? '✓' : '○'}</div>
              <div class="flex-grow p-1">{item.text}</div>
              <div class="p-1 pointer" onClick={() => this.removeItem(item)}>✗</div>
            </div>
          )}

          <div class="flex just-between text-sm">
            <div class="p-1">{this.incompleteItems} items left</div>
            <div class="p-1 pointer" onClick={() => this.clearCompleted()}>Clear Completed</div>
          </div>
        </div>

        <div class="flex just-center text-sm">
          <div class="p-1 pointer" onClick={() => this.filter = 'all'}>All</div>
          <div class="p-1 pointer" onClick={() => this.filter = 'active'}>Active</div>
          <div class="p-1 pointer" onClick={() => this.filter = 'completed'}>Completed</div>
        </div>
      </div>
    );
  }
}

