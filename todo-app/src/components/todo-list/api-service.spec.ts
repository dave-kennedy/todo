import {ApiService} from './api-service';

test('createItem returns nothing on failure', async () => {
  const item = {complete: false, id: 1, order: 1, text: 'Item 1'};

  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ok: false}));

  const apiService = new ApiService();
  const response = await apiService.createItem(item);
  expect(response).toBeUndefined();
});

test('createItem returns data on success', async () => {
  const item = {complete: false, id: 1, order: 1, text: 'Item 1'};

  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(item)
    }));

  const apiService = new ApiService();
  const response = await apiService.createItem(item);
  expect(response).toEqual(item);
});

test('deleteItem returns nothing on failure', async () => {
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ok: false}));

  const apiService = new ApiService();
  const response = await apiService.deleteItem(3);
  expect(response).toBeUndefined();
});

test('deleteItem returns true on success', async () => {
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ok: true}));

  const apiService = new ApiService();
  const response = await apiService.deleteItem(3);
  expect(response).toEqual(true);
});

test('getItems returns nothing on failure', async () => {
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ok: false}));

  const apiService = new ApiService();
  const response = await apiService.getItems();
  expect(response).toBeUndefined();
});

test('getItems returns data on success', async () => {
  const items = [
    {complete: false, id: 1, order: 1, text: 'Item 1'},
    {complete: false, id: 2, order: 2, text: 'Item 2'},
    {complete: false, id: 3, order: 3, text: 'Item 3'}
  ];

  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(items)
    }));

  const apiService = new ApiService();
  const response = await apiService.getItems();
  expect(response).toEqual(items);
});

test('updateItem returns nothing on failure', async () => {
  const item = {complete: true, id: 1, order: 1, text: 'Item 1'};

  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ok: false}));

  const apiService = new ApiService();
  const response = await apiService.updateItem(item);
  expect(response).toBeUndefined();
});

test('updateItem returns data on success', async () => {
  const item = {complete: true, id: 1, order: 1, text: 'Item 1'};

  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(item)
    }));

  const apiService = new ApiService();
  const response = await apiService.updateItem(item);
  expect(response).toEqual(item);
});

