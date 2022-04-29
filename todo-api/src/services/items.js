const db = require('./db');

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

class ParseError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'ParseError';
  }
}

function createItem(item) {
  const parsedArgs = {
    complete: _parseBoolean(item.complete),
    id: _parseInteger(item.id),
    order: _parseInteger(item.order),
    text: _parseString(item.text)
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
    id: _parseInteger(id)
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
    id: _parseInteger(id)
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
    page: _parseInteger(page),
    limit: _parseInteger(limit)
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
    id: _parseInteger(id), // Use the arg here. Not required in request body.
    complete: _parseBoolean(item.complete),
    order: _parseInteger(item.order),
    text: _parseString(item.text)
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

function _parseBoolean(value) {
  if (typeof value != 'boolean' && typeof value != 'string') {
    throw new ParseError(`Unable to parse ${value} as boolean`);
  }

  if (typeof value == 'boolean') {
      return value ? 1 : 0;
  }

  const stringValue = value.trim().toLowerCase();

  if (stringValue != 'true' && stringValue != 'false') {
    throw new ParseError(`Unable to parse ${value} as boolean`);
  }

  return stringValue == 'true' ? 1 : 0;
}

// Return value as an integer.
//
// This works better than `parseInt` or `parseFloat`, which are too lenient for
// validation, e.g.:
//
//    parseInt('1a') == 1
//    parseFloat('1a') == 1
//
// If someone is calls this API with one of those weird values, this will catch
// it and throw an error.
function _parseInteger(value) {
  if (isNaN(value)) {
    throw new ParseError(`Unable to parse ${value} as integer`);
  }

  const floatValue = parseFloat(value);

  if ((floatValue | 0) !== floatValue) {
    throw new ParseError(`Unable to parse ${value} as integer`);
  }

  return floatValue;
}

function _parseString(value) {
  if (typeof value != 'string') {
    throw new ParseError(`Unable to parse ${value} as string`);
  }

  return value.trim();
}

module.exports = {
  DatabaseError,
  NotFoundError,
  ParseError,
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem
};

