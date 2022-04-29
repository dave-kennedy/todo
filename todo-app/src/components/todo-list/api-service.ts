const API_URL = 'http://localhost:3000';

export class ApiService {
  async createItem(item) {
      const response = await fetch(`${API_URL}/items`, {
        body: JSON.stringify(item),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
      });

      if (!response.ok) {
        console.error('Unable to create item');
        return;
      }

      return await response.json();
  }

  async deleteItem(id) {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        console.error('Unable to delete item');
        return;
      }

      return;
  }

  async getItems() {
      const response = await fetch(`${API_URL}/items`);

      if (!response.ok) {
        console.error('Unable to get items');
        return;
      }

      return await response.json();
  }

  async updateItem(item) {
      const response = await fetch(`${API_URL}/items/${item.id}`, {
        body: JSON.stringify(item),
        headers: {'Content-Type': 'application/json'},
        method: 'PUT'
      });

      if (!response.ok) {
        console.error('Unable to update item');
        return;
      }

      return await response.json();
  }
}

