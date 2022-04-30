const express = require('express');
const itemsService = require('../services/items');
const parse = require('../services/parse');

const router = express.Router();

router.get('/', function(req, res, next) {
  try {
    return res.json(itemsService.getItems(req.query.page, req.query.limit));
  } catch(err) {
    if (err instanceof parse.ParseError) {
      return res.status(400).json({'error': err.message});
    }

    console.error('Error while getting items:', err);
    return res.status(500).json({'error': 'An unknown error occurred'});
  }
});

router.get('/:id', function(req, res, next) {
  try {
    return res.json(itemsService.getItem(req.params.id));
  } catch(err) {
    if (err instanceof parse.ParseError) {
      return res.status(400).json({'error': err.message});
    }

    if (err instanceof itemsService.NotFoundError) {
      return res.status(404).json({'error': err.message});
    }

    console.error('Error while getting item:', err);
    return res.status(500).json({'error': 'An unknown error occurred'});
  }
});

router.post('/', function(req, res, next) {
  try {
    return res.json(itemsService.createItem(req.body));
  } catch(err) {
    if (err instanceof parse.ParseError) {
      return res.status(400).json({'error': err.message});
    }

    console.error('Error while creating item:', err);
    return res.status(500).json({'error': 'An unknown error occurred'});
  }
});

router.put('/:id', function(req, res, next) {
  try {
    return res.json(itemsService.updateItem(req.params.id, req.body));
  } catch(err) {
    if (err instanceof parse.ParseError) {
      return res.status(400).json({'error': err.message});
    }

    console.error('Error while updating item:', err);
    return res.status(500).json({'error': 'An unknown error occurred'});
  }
});

router.delete('/:id', function(req, res, next) {
  try {
    return res.json(itemsService.deleteItem(req.params.id));
  } catch(err) {
    if (err instanceof parse.ParseError) {
      return res.status(400).json({'error': err.message});
    }

    console.error('Error while deleting item:', err);
    return res.status(500).json({'error': 'An unknown error occurred'});
  }
});

module.exports = router;

