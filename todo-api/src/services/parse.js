class ParseError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'ParseError';
  }
}

function bool(value) {
  const valueType = typeof value;

  if (valueType != 'boolean' && valueType != 'number' && valueType != 'string') {
    throw new ParseError(`Unable to parse ${value} as boolean`);
  }

  if (valueType == 'boolean') {
    return value ? 1 : 0;
  }

  if (valueType == 'number') {
    if (value == 1 || value == 0) {
      return value;
    }

    throw new ParseError(`Unable to parse ${value} as boolean`);
  }

  const trimmedValue = value.toLowerCase().trim();

  if (trimmedValue == '0' || trimmedValue == 'false') {
    return 0;
  }

  if (trimmedValue == '1' || trimmedValue == 'true') {
    return 1;
  }

  throw new ParseError(`Unable to parse ${value} as boolean`);
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
function integer(value) {
  if (isNaN(value)) {
    throw new ParseError(`Unable to parse ${value} as integer`);
  }

  const floatValue = parseFloat(value);

  if ((floatValue | 0) !== floatValue) {
    throw new ParseError(`Unable to parse ${value} as integer`);
  }

  return floatValue;
}

function string(value) {
  if (typeof value != 'string') {
    throw new ParseError(`Unable to parse ${value} as string`);
  }

  return value.trim();
}

module.exports = {
  ParseError,
  bool,
  integer,
  string
};

