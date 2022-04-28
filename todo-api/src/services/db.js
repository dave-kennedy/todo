const fs = require('fs');
const sqlite = require('better-sqlite3');

const DATA_FILE = 'data/data.db';
const SCHEMA_FILE = 'data/schema.sql';

const db = new sqlite(DATA_FILE);
const schema = fs.readFileSync(SCHEMA_FILE, 'utf8');
db.exec(schema);

function get(sql, params) {
  return db.prepare(sql).get(params);
}

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  get,
  query,
  run
};

