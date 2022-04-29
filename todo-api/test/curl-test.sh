#!/usr/bin/env bash

echo "
get base url
should return 200 status and cheery greeting
"
curl -i 'http://localhost:3000'
read

echo "
get all items
should return 200 status and list of 6 items
"
curl -i 'http://localhost:3000/items'
read

echo "
get items 4-6
should return 200 status and list of 3 items
"
curl -i 'http://localhost:3000/items?page=2&limit=3'
read

echo "
get item 3
should return 200 status and item
"
curl -i 'http://localhost:3000/items/3'
read

echo "
create item
should return 200 status and item
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"complete": false, "id": 9998, "order": 9998, "text": "Item 9998"}' \
    'http://localhost:3000/items'
read

echo "
create item with mixed args
should return 200 status and item
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"complete": "TRUE", "id": 9999.0, "order": " 9999.0 ", "text": " Item 9999 "}' \
    'http://localhost:3000/items'
read

echo "
update item
should return 200 status and item
"
curl -i -X PUT -H 'Content-Type: application/json' \
    -d '{"complete": true, "id": 9998, "order": 10000, "text": "Item 9998 updated"}' \
    'http://localhost:3000/items/9998'
read

echo "
update item with mixed args
should return 200 status and item
"
curl -i -X PUT -H 'Content-Type: application/json' \
    -d '{"complete": "FALSE", "id": 9999.0, "order": " 10001.0 ", "text": " Item 9999 updated "}' \
    'http://localhost:3000/items/9999'
read

echo "
delete item 9998
should return 200 status and no data
"
curl -i -X DELETE 'http://localhost:3000/items/9998'
read

echo "
delete item 9999
should return 200 status and no data
"
curl -i -X DELETE 'http://localhost:3000/items/9999'
read

#
# errors
#

echo "
get non-existing route
BUG: should return 404 status and error message but returns not found page
"
curl -i 'http://localhost:3000/asdf'
read

echo "
get non-existing item
should return 404 status and error message
"
curl -i 'http://localhost:3000/items/10000'
read

echo "
get item with invalid id
should return 400 status and error message
"
curl -i 'http://localhost:3000/items/foo'
read

echo "
create item with no content-type header or data
should return 400 status and error message
"
curl -i -X POST 'http://localhost:3000/items'
read

echo "
create item with no content-type header
should return 400 status and error message
"
curl -i -X POST \
    -d '{"complete": "truth", "id": 10000, "order": 10000, "text": "Item 10000"}' \
    'http://localhost:3000/items'
read

echo "
create item with no data
should return 400 status and error message
"
curl -i -X POST -H 'Content-Type: application/json' 'http://localhost:3000/items'
read

echo "
create item with no complete
should return 400 status and error message
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"id": 10000, "order": 10000, "text": "Item 10000"}' \
    'http://localhost:3000/items'
read

echo "
create item with no id
should return 400 status and error message
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"complete": true, "order": 10000, "text": "Item 10000"}' \
    'http://localhost:3000/items'
read

echo "
create item with no order
should return 400 status and error message
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"complete": true, "id": 10000, "text": "Item 10000"}' \
    'http://localhost:3000/items'
read

echo "
create item with no text
should return 400 status and error message
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"complete": true, "id": 10000, "order": 10000}' \
    'http://localhost:3000/items'
read

echo "
create item with invalid complete
should return 400 status and error message
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"complete": "truth", "id": 10000, "order": 10000, "text": "Item 10000"}' \
    'http://localhost:3000/items'
read

echo "
create item with invalid id
should return 400 status and error message
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"complete": true, "id": 10000.5, "order": 10000, "text": "Item 10000"}' \
    'http://localhost:3000/items'
read

echo "
create item with invalid order
should return 400 status and error message
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"complete": true, "id": 10000, "order": "ten", "text": "Item 10000"}' \
    'http://localhost:3000/items'
read

echo "
create item with invalid text
should return 400 status and error message
"
curl -i -X POST -H 'Content-Type: application/json' \
    -d '{"complete": true, "id": 10000, "order": 10000, "text": null}' \
    'http://localhost:3000/items'
read

echo "
update non-existing item
should return 500 status and error message
"
curl -i -X PUT -H 'Content-Type: application/json' \
    -d '{"complete": true, "id": 10000, "order": 10000, "text": "Item 10000 updated"}' \
    'http://localhost:3000/items/10000'
read

echo "
delete non-existing item
should return 500 status and error message
"
curl -i -X DELETE 'http://localhost:3000/items/10000'

