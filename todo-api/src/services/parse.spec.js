const parse = require('./parse');

describe('bool tests', () => {
  test('undefined throws error', () => {
    expect(() => {
      parse.bool();
    }).toThrow(parse.ParseError);
  });

  test('null throws error', () => {
    expect(() => {
      parse.bool(null);
    }).toThrow(parse.ParseError);
  });

  test('object throws error', () => {
    expect(() => {
      parse.bool({});
    }).toThrow(parse.ParseError);
  });

  test('false returns 0', () => {
    expect(parse.bool(false)).toEqual(0);
  });

  test('true returns 1', () => {
    expect(parse.bool(true)).toEqual(1);
  });

  test('0 returns 0', () => {
    expect(parse.bool(0)).toEqual(0);
  });

  test('1 returns 1', () => {
    expect(parse.bool(1)).toEqual(1);
  });

  test('0.99999 throws error', () => {
    expect(() => {
      parse.bool(0.99999);
    }).toThrow(parse.ParseError);
  });

  test('1.00001 throws error', () => {
    expect(() => {
      parse.bool(1.00001);
    }).toThrow(parse.ParseError);
  });

  test('" 0 " returns 0', () => {
    expect(parse.bool(' 0 ')).toEqual(0);
  });

  test('" FALSE " returns 0', () => {
    expect(parse.bool(' FALSE ')).toEqual(0);
  });

  test('" 1 " returns 1', () => {
    expect(parse.bool(' 1 ')).toEqual(1);
  });

  test('" TRUE " returns 1', () => {
    expect(parse.bool(' TRUE ')).toEqual(1);
  });

  test('empty string throws error', () => {
    expect(() => {
      parse.bool('');
    }).toThrow(parse.ParseError);
  });

  test('"null" throws error', () => {
    expect(() => {
      parse.bool('null');
    }).toThrow(parse.ParseError);
  });

  test('"0.99999" throws error', () => {
    expect(() => {
      parse.bool('0.99999');
    }).toThrow(parse.ParseError);
  });

  test('"1.00001" throws error', () => {
    expect(() => {
      parse.bool('1.00001');
    }).toThrow(parse.ParseError);
  });
});

describe('integer tests', () => {
  test('undefined throws error', () => {
    expect(() => {
      parse.integer();
    }).toThrow(parse.ParseError);
  });

  test('null throws error', () => {
    expect(() => {
      parse.integer(null);
    }).toThrow(parse.ParseError);
  });

  test('object throws error', () => {
    expect(() => {
      parse.integer({});
    }).toThrow(parse.ParseError);
  });

  test('true throws error', () => {
    expect(() => {
      parse.integer(true);
    }).toThrow(parse.ParseError);
  });

  test('empty string throws error', () => {
    expect(() => {
      parse.integer('');
    }).toThrow(parse.ParseError);
  });

  test('"null" throws error', () => {
    expect(() => {
      parse.integer('null');
    }).toThrow(parse.ParseError);
  });

  test('0.99999 throws error', () => {
    expect(() => {
      parse.integer(0.99999);
    }).toThrow(parse.ParseError);
  });

  test('1.00001 throws error', () => {
    expect(() => {
      parse.integer(1.00001);
    }).toThrow(parse.ParseError);
  });

  test('0 returns 0', () => {
    expect(parse.integer(0)).toEqual(0);
  });

  test('1.0 returns 1', () => {
    expect(parse.integer(1.0)).toEqual(1);
  });

  test('-1 returns -1', () => {
    expect(parse.integer(-1)).toEqual(-1);
  });

  test('" 1 " returns 1', () => {
    expect(parse.integer(' 1 ')).toEqual(1);
  });
});

describe('string tests', () => {
  test('undefined throws error', () => {
    expect(() => {
      parse.string();
    }).toThrow(parse.ParseError);
  });

  test('null throws error', () => {
    expect(() => {
      parse.string(null);
    }).toThrow(parse.ParseError);
  });

  test('object throws error', () => {
    expect(() => {
      parse.string({});
    }).toThrow(parse.ParseError);
  });

  test('true throws error', () => {
    expect(() => {
      parse.string(true);
    }).toThrow(parse.ParseError);
  });

  test('1 throws error', () => {
    expect(() => {
      parse.string(1);
    }).toThrow(parse.ParseError);
  });

  test('empty string returns empty string', () => {
    expect(parse.string('')).toEqual('');
  });

  test('" asdf " returns "asdf"', () => {
    expect(parse.string(' asdf ')).toEqual('asdf');
  });
});

