const router = require('express').Router();
const getBudgetById = require('../fn/budgets/getBudgetById').handler;
const getTotals = require('../fn/budgets/getTotals').handler;

router.get('/', async (req, res, next) => {
  try {
    const { database } = req.app.locals;
    const results = await database.collection('budgets').aggregate([
      {
        $lookup: {
          from: 'items',
          as: 'items',
          let: { id: '$_id' },
          pipeline: [
            {
              $match: { $expr: { $eq: ['$budgetId', '$$id'] } }
            }
          ]
        }
      }
    ]).toArray();
    res.json(results)
  } catch (err) {
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { database } = req.app.locals;

    const budget = await getBudgetById(database, { id });
    const totals = await getTotals(database, id);
    res.json({ ...budget, totals })

  } catch (err) {
    next(err);
  }
})

module.exports = router;
