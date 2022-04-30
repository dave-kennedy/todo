jest.mock('./db');

const db = require('./db');
const itemsService = require('./items');
const parse = require('./parse');

beforeEach(() => {
  jest.resetAllMocks();
});

test('createItem throws error if args invalid', () => {
  expect(() => {
    itemsService.createItem({complete: null, id: 1, order: 1, text: 'Item 1'});
  }).toThrow(parse.ParseError);

  expect(() => {
    itemsService.createItem({complete: 0, id: null, order: 1, text: 'Item 1'});
  }).toThrow(parse.ParseError);

  expect(() => {
    itemsService.createItem({complete: 0, id: 1, order: null, text: 'Item 1'});
  }).toThrow(parse.ParseError);

  expect(() => {
    itemsService.createItem({complete: 0, id: 1, order: 1, text: null});
  }).toThrow(parse.ParseError);
});

test('createItem throws error if insert fails', () => {
  db.run.mockReturnValue({changes: 0});

  expect(() => {
    itemsService.createItem({complete: 0, id: 1, order: 1, text: 'Item 1'});
  }).toThrow(itemsService.DatabaseError);
});

test('createItem returns data on success', () => {
  db.run.mockReturnValue({changes: 1});

  const item = {complete: 0, id: 1, order: 1, text: 'Item 1'};
  response = itemsService.createItem(item);
  expect(response).toEqual({data: item});
});

test('deleteItem throws error if args invalid', () => {
  expect(() => {
    itemsService.deleteItem(null);
  }).toThrow(parse.ParseError);
});

test('deleteItem throws error if delete fails', () => {
  db.run.mockReturnValue({changes: 0});

  expect(() => {
    itemsService.deleteItem(3);
  }).toThrow(itemsService.DatabaseError);
});

test('deleteItem returns nothing on success', () => {
  db.run.mockReturnValue({changes: 1});
  response = itemsService.deleteItem(3);
  expect(response).toBeUndefined();
});

test('getItem throws error if args invalid', () => {
  expect(() => {
    itemsService.getItem(null);
  }).toThrow(parse.ParseError);
});

test('getItem throws error if not found', () => {
  db.get.mockReturnValue(null);

  expect(() => {
    itemsService.getItem(3);
  }).toThrow(itemsService.NotFoundError);
});

test('getItem returns data on success', () => {
  const item = {complete: false, id: 3, order: 3, text: 'Item 3'}
  db.get.mockReturnValue(item);

  const response = itemsService.getItem(3);
  expect(response).toEqual({data: item});
});

test('getItems throws error if args invalid', () => {
  expect(() => {
    itemsService.getItems(null);
  }).toThrow(parse.ParseError);

  expect(() => {
    itemsService.getItems(undefined, null);
  }).toThrow(parse.ParseError);
});

test('getItems returns data on success', () => {
  const items = [
    {complete: false, id: 1, order: 1, text: 'Item 1'},
    {complete: false, id: 2, order: 2, text: 'Item 2'},
    {complete: false, id: 3, order: 3, text: 'Item 3'}
  ];

  db.query.mockReturnValue(items);

  const response = itemsService.getItems();
  expect(response).toEqual({data: items});
});

test('updateItem throws error if args invalid', () => {
  expect(() => {
    itemsService.updateItem(null, {complete: 0, order: 1, text: 'Item 1'});
  }).toThrow(parse.ParseError);

  expect(() => {
    itemsService.updateItem(1, {complete: null, order: 1, text: 'Item 1'});
  }).toThrow(parse.ParseError);

  expect(() => {
    itemsService.updateItem(1, {complete: 0, order: null, text: 'Item 1'});
  }).toThrow(parse.ParseError);

  expect(() => {
    itemsService.updateItem(1, {complete: 0, order: 1, text: null});
  }).toThrow(parse.ParseError);
});

test('updateItem throws error if update fails', () => {
  db.run.mockReturnValue({changes: 0});

  expect(() => {
    itemsService.updateItem(1, {complete: 0, order: 1, text: 'Item 1'});
  }).toThrow(itemsService.DatabaseError);
});

test('updateItem returns data on success', () => {
  db.run.mockReturnValue({changes: 1});

  const item = {complete: 0, order: 1, text: 'Item 1'};
  response = itemsService.updateItem(1, item);
  expect(response).toEqual({data: {id: 1, ...item}});
});

