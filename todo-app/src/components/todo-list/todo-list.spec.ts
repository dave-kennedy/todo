jest.mock('./api-service');

import {newSpecPage} from '@stencil/core/testing';
import {TodoList} from './todo-list';

describe('logic tests', () => {
  test('init', () => {
    const todoList = new TodoList();
    expect(todoList.filter).toEqual('all');
    expect(todoList.incompleteItems).toEqual(0);
    expect(todoList.items).toEqual([]);
  });

  test('addItem', () => {
    const todoList = new TodoList();

    for (const i of [1, 2, 3]) {
      todoList.addItem(`Item ${i}`);
    }

    expect(todoList.items).toEqual([
      {complete: false, id: 1, order: 1, text: 'Item 1'},
      {complete: false, id: 2, order: 2, text: 'Item 2'},
      {complete: false, id: 3, order: 3, text: 'Item 3'}
    ]);
  });

  test('clearCompleted', () => {
    const todoList = new TodoList();

    todoList.items = [
      {complete: false, id: 1, order: 1, text: 'Item 1'},
      {complete: true, id: 2, order: 2, text: 'Item 2'},
      {complete: false, id: 3, order: 3, text: 'Item 3'},
      {complete: true, id: 4, order: 4, text: 'Item 4'},
      {complete: false, id: 5, order: 5, text: 'Item 5'}
    ];

    todoList.clearCompleted();

    expect(todoList.items).toEqual([
      {complete: false, id: 1, order: 1, text: 'Item 1'},
      {complete: false, id: 3, order: 3, text: 'Item 3'},
      {complete: false, id: 5, order: 5, text: 'Item 5'}
    ]);
  });

  test('completeItem', () => {
    const todoList = new TodoList();

    todoList.items = [
      {complete: false, id: 1, order: 1, text: 'Item 1'},
      {complete: false, id: 2, order: 2, text: 'Item 2'},
      {complete: false, id: 3, order: 3, text: 'Item 3'}
    ];

    todoList.completeItem(todoList.items[1]);

    expect(todoList.items).toEqual([
      {complete: false, id: 1, order: 1, text: 'Item 1'},
      {complete: true, id: 2, order: 2, text: 'Item 2'},
      {complete: false, id: 3, order: 3, text: 'Item 3'}
    ]);
  });

  test('removeItem', () => {
    const todoList = new TodoList();

    todoList.items = [
      {complete: false, id: 1, order: 1, text: 'Item 1'},
      {complete: false, id: 2, order: 2, text: 'Item 2'},
      {complete: false, id: 3, order: 3, text: 'Item 3'}
    ];

    todoList.removeItem(todoList.items[1]);

    expect(todoList.items).toEqual([
      {complete: false, id: 1, order: 1, text: 'Item 1'},
      {complete: false, id: 3, order: 3, text: 'Item 3'}
    ]);
  });
});

describe('render tests', () => {
  test('render with defaults', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: '<todo-list></todo-list>'
    });

    const containerDiv = page.root.shadowRoot.children[0];
    expect(containerDiv.children.length).toEqual(4);

    const h1 = containerDiv.children[0];
    expect(h1.innerText).toEqual('Todo');

    const newDiv = containerDiv.children[1];
    expect(newDiv.children.length).toEqual(2);

    const input = newDiv.children[1];
    expect(input.placeholder).toEqual('Create a new todo...');
    expect(input.value).toEqual('');

    const listDiv = containerDiv.children[2];
    expect(listDiv.children.length).toEqual(4); // Three items plus footer

    const listItem1Div = listDiv.children[0];
    expect(listItem1Div.innerText).toContain('Item 1');

    const listItem1CompleteDiv = listItem1Div.children[0];
    expect(listItem1CompleteDiv.innerText[0]).toEqual('✓')

    const listFooterDiv = listDiv.children[3];
    expect(listFooterDiv.innerText).toContain('2 items left');

    const filterDiv = containerDiv.children[3];
    expect(filterDiv.innerText).toEqual('AllActiveCompleted');
  });

  test('add item when enter key pressed', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: '<todo-list></todo-list>'
    });

    const containerDiv = page.root.shadowRoot.children[0];
    const newDiv = containerDiv.children[1];
    const input = newDiv.children[1];
    input.value = 'Item 4';
    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    expect(input.value).toEqual('');

    await page.waitForChanges();

    const listDiv = containerDiv.children[2];
    expect(listDiv.children.length).toEqual(5); // Four items plus footer

    const listFooterDiv = listDiv.children[4];
    expect(listFooterDiv.innerText).toContain('3 items left');
  });

  test('update item when complete button clicked', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: '<todo-list></todo-list>'
    });

    const containerDiv = page.root.shadowRoot.children[0];
    const listDiv = containerDiv.children[2];
    const listItem1Div = listDiv.children[0];
    const listItem1CompleteDiv = listItem1Div.children[0];
    listItem1CompleteDiv.dispatchEvent(new MouseEvent('click'));

    await page.waitForChanges();

    expect(listItem1CompleteDiv.innerText[0]).toEqual('○');

    const listFooterDiv = listDiv.children[3];
    expect(listFooterDiv.innerText).toContain('3 items left');
  });

  test('remove item when delete button clicked', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: '<todo-list></todo-list>'
    });

    const containerDiv = page.root.shadowRoot.children[0];
    const listDiv = containerDiv.children[2];
    const listItem2Div = listDiv.children[1];
    const listItem2RemoveDiv = listItem2Div.children[2];
    listItem2RemoveDiv.dispatchEvent(new MouseEvent('click'));

    await page.waitForChanges();

    expect(listDiv.children.length).toEqual(3); // Two items plus footer

    const listFooterDiv = listDiv.children[2];
    expect(listFooterDiv.innerText).toContain('1 items left');
  });

  test('clear completed items when button clicked', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: '<todo-list></todo-list>'
    });

    const containerDiv = page.root.shadowRoot.children[0];
    const listDiv = containerDiv.children[2];
    const listItem2Div = listDiv.children[1];
    const listItem2CompleteDiv = listItem2Div.children[0];
    listItem2CompleteDiv.dispatchEvent(new MouseEvent('click'));

    const listFooterDiv = listDiv.children[3];
    const clearCompletedDiv = listFooterDiv.children[1];
    clearCompletedDiv.dispatchEvent(new MouseEvent('click'));

    await page.waitForChanges();

    expect(listDiv.children.length).toEqual(2); // One item plus footer
    expect(listFooterDiv.innerText).toContain('1 items left');
  });

  test('filter items when active button clicked', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: '<todo-list></todo-list>'
    });

    const containerDiv = page.root.shadowRoot.children[0];
    const filterDiv = containerDiv.children[3];
    const filterActiveDiv = filterDiv.children[1];
    filterActiveDiv.dispatchEvent(new MouseEvent('click'));

    await page.waitForChanges();

    const listDiv = containerDiv.children[2];
    expect(listDiv.children.length).toEqual(3); // Two items plus footer

    const listFooterDiv = listDiv.children[2];
    expect(listFooterDiv.innerText).toContain('2 items left');
  });
});

