const db = require('./db');

function createItem(item) {
  const parseResult = _parseItem(item);

  if (parseResult.errors) {
    return parseResult;
  }

  const insertResult = db.run(
    'INSERT INTO items VALUES (@complete, @id, @order, @text)',
    parseResult
  );

  if (!insertResult.changes) {
    console.error('Unable to create item:', item, 'result:', insertResult);

    return {
      'errors': [{'message': 'An unknown error occurred'}]
    };
  }

  return {data: parseResult};
}

function deleteItem(id) {
  const deleteResult = db.run(`DELETE FROM items WHERE id = @id`, {id});

  if (!deleteResult.changes) {
    console.error('Unable to delete item:', id, 'result:', deleteResult);

    return {
      'errors': [{'message': 'An unknown error occurred'}]
    };
  }

  return;
}

function getItem(id) {
  const selectResult = db.get(`SELECT * FROM items WHERE id = @id`, {id});
  return {data: selectResult};
}

function getItems(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const selectResult = db.query(
    `SELECT * FROM items LIMIT @limit OFFSET @offset`,
    {limit, offset}
  );

  return {data: selectResult};
}

function updateItem(id, item) {
  const parseResult = _parseItem(item);

  if (parseResult.errors) {
    return parseResult;
  }

  const updateResult = db.run(
    'UPDATE items SET complete = @complete, "order" = @order, text = @text WHERE id = @id',
    parseResult
  );

  if (!updateResult.changes) {
    console.error('Unable to update item:', item, 'result:', updateResult);

    return {
      'errors': [{'message': 'An unknown error occurred'}]
    };
  }

  return {data: parseResult};
}

function _parseItem(item) {
  const result = {};

  try {
    result.complete = _parseBoolean(item.complete);
  } catch(err) {
    return {
      'errors': [{'field': 'complete', 'message': err.message}]
    }
  }

  try {
    result.id = _parseInteger(item.id);
  } catch(err) {
    return {
      'errors': [{'field': 'id', 'message': err.message}]
    }
  }

  try {
    result.order = _parseInteger(item.order);
  } catch(err) {
    return {
      'errors': [{'field': 'order', 'message': err.message}]
    }
  }

  try {
    result.text = _parseString(item.text);
  } catch(err) {
    return {
      'errors': [{'field': 'text', 'message': err.message}]
    }
  }

  return result;
}

function _parseBoolean(value) {
  if (typeof value != 'boolean' && typeof value != 'string') {
    throw new Error(`Unable to parse ${value} as boolean`);
  }

  if (typeof value == 'boolean') {
      return value ? 1 : 0;
  }

  const stringValue = value.trim().toLowerCase();

  if (stringValue != 'true' && stringValue != 'false') {
    throw new Error(`Unable to parse ${value} as boolean`);
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
    throw new Error(`Unable to parse ${value} as integer`);
  }

  const floatValue = parseFloat(value);

  if ((floatValue | 0) !== floatValue) {
    throw new Error(`Unable to parse ${value} as integer`);
  }

  return floatValue;
}

function _parseString(value) {
  if (typeof value != 'string') {
    throw new Error(`Unable to parse ${value} as string`);
  }

  return value.trim();
}

module.exports = {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem
};

