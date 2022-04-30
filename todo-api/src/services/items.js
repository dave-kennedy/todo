const db = require('./db');
const parse = require('./parse');

class DatabaseError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'DatabaseError';
  }
}

class NotFoundError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'NotFoundError';
  }
}

function createItem(item) {
  const parsedArgs = {
    complete: parse.bool(item.complete),
    id: parse.integer(item.id),
    order: parse.integer(item.order),
    text: parse.string(item.text)
  };

  const insertResult = db.run(
    'INSERT INTO items VALUES (@complete, @id, @order, @text)',
    parsedArgs
  );

  if (!insertResult.changes) {
    console.error('Unable to create item:', parsedArgs);
    throw new DatabaseError();
  }

  return {data: parsedArgs};
}

function deleteItem(id) {
  const parsedArgs = {
    id: parse.integer(id)
  };

  const deleteResult = db.run(
    `DELETE FROM items WHERE id = @id`,
    parsedArgs
  );

  if (!deleteResult.changes) {
    console.error('Unable to delete item:', parsedArgs);
    throw new DatabaseError();
  }

  return;
}

function getItem(id) {
  const parsedArgs = {
    id: parse.integer(id)
  };

  const selectResult = db.get(
    `SELECT * FROM items WHERE id = @id`,
    parsedArgs
  );

  if (!selectResult) {
    throw new NotFoundError('Item not found');
  }

  return {data: selectResult};
}

function getItems(page = 1, limit = 10) {
  const parsedArgs = {
    page: parse.integer(page),
    limit: parse.integer(limit)
  };

  const offset = (parsedArgs.page - 1) * parsedArgs.limit;

  const selectResult = db.query(
    `SELECT * FROM items LIMIT @limit OFFSET @offset`,
    {limit: parsedArgs.limit, offset: offset}
  );

  return {data: selectResult};
}

function updateItem(id, item) {
  const parsedArgs = {
    id: parse.integer(id), // Use the arg here. Not required in request body.
    complete: parse.bool(item.complete),
    order: parse.integer(item.order),
    text: parse.string(item.text)
  };

  const updateResult = db.run(
    'UPDATE items SET complete = @complete, "order" = @order, text = @text WHERE id = @id',
    parsedArgs
  );

  if (!updateResult.changes) {
    console.error('Unable to update item:', parsedArgs);
    throw new DatabaseError();
  }

  return {data: parsedArgs};
}

module.exports = {
  DatabaseError,
  NotFoundError,
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem
};

