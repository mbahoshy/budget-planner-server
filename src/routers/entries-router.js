const router = require('express').Router();
const getBudgetById = require('../fn/budgets/getBudgetById').handler;
const getTotals = require('../fn/budgets/getTotals').handler;
const upsertEntry = require('../fn/entries/upsertEntry').handler;


router.post('/:id?', async(req, res, next) => {
  try {
    const { id } = req.params;
    const { database } = req.app.locals;
    const {
      budgetId
    } = req.body

    await upsertEntry(database, id, req.body);

    const budget = await getBudgetById(database, { id: budgetId });

    const totals = await getTotals(database, budgetId);
    res.json({ ...budget, totals })

  } catch (err) {
    next(err);
  }
})
module.exports = router;
