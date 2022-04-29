export class ApiService {
  async createItem(item) {
    return {complete: false, id: 4, order: 4, text: 'Item 4'}
  }

  async deleteItem(id) {
    return;
  }

  async getItems() {
    return {
      data: [
        {complete: true, id: 1, order: 1, text: 'Item 1'},
        {complete: false, id: 2, order: 2, text: 'Item 2'},
        {complete: false, id: 3, order: 3, text: 'Item 3'}
      ]
    };
  }

  async updateItem(item) {
    return {complete: true, id: 4, order: 4, text: 'Item 4'}
  }
}

