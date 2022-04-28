CREATE TABLE IF NOT EXISTS items (
  complete BOOLEAN NOT NULL,
  id INTEGER PRIMARY KEY,
  'order' INTEGER NOT NULL,
  text TEXT NOT NULL
);

INSERT OR IGNORE INTO ITEMS VALUES (true, 1, 1, 'Complete online JavaScript course');
INSERT OR IGNORE INTO ITEMS VALUES (false, 2, 2, 'Jog around the park 3x');
INSERT OR IGNORE INTO ITEMS VALUES (false, 3, 3, '10 minutes meditation');
INSERT OR IGNORE INTO ITEMS VALUES (false, 4, 4, 'Read for 1 hour');
INSERT OR IGNORE INTO ITEMS VALUES (false, 5, 5, 'Pick up groceries');
INSERT OR IGNORE INTO ITEMS VALUES (false, 6, 6, 'Complete Todo App on Frontend Mentor');

