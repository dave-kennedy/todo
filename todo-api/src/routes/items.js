const express = require('express');
const itemsService = require('../services/items');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.json(itemsService.getItems(req.query.page, req.query.limit));
});

router.get('/:id', function(req, res, next) {
  res.json(itemsService.getItem(req.params.id));
});

router.post('/', function(req, res, next) {
  res.json(itemsService.createItem(req.body));
});

router.put('/:id', function(req, res, next) {
  res.json(itemsService.updateItem(req.params.id, req.body));
});

router.delete('/:id', function(req, res, next) {
  res.json(itemsService.deleteItem(req.params.id));
});

module.exports = router;

