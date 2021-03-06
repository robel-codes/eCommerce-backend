const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{
        model: Product
    }]
  }).then(rows => {
    res.status(200).json(rows);
  }).catch(err => {
    return res.status(400).json({ 'error': err });
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const id = req.params.id;
  Category.findOne({
      where: { id },
      include: [{
          model: Product
      }]
  }).then(rows => {
      res.status(200).json(rows);
  }).catch(err => {
      return res.status(400).json({ 'error': err });
  });
});

router.post('/', (req, res) => {
  // create a new category
  const { category_name } = req.body;
  Category.create({ category_name })
    .then(row => {
      res.status(200).json(row);
    }).catch(err => {
      return res.status(400).json({ 'error': err });
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const { id } = req.params;
  const { category_name } = req.body;
  Category.update({ category_name }, {
      where: {
          id
      }
  }).then(isUpdated => {
      res.status(200).send(isUpdated + "");
  }).catch(err => {
      return res.status(400).json({ 'error': err });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;
  Category.destroy({
      where: { id }
  }).then(isDeleted => {
      res.status(200).send("" + isDeleted);
  }).catch(err => {
      return res.status(400).json({ 'error': err });
  });
});

module.exports = router;
