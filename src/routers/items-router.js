const router = require('express').Router();
const getBudgetById = require('../fn/budgets/getBudgetById').handler;
const getTotals = require('../fn/budgets/getTotals').handler;
const upsertItem = require('../fn/items/upsertItem').handler;
const updateItemDisplayOrder = require('../fn/items/updateItemDisplayOrder').handler;


router.post('/:id?', async(req, res, next) => {
  try {
    const { id: itemId } = req.params;
    const { database } = req.app.locals;
    const {
      budgetId
    } = req.body;

    await upsertItem(database, itemId, req.body)

    const budget = await getBudgetById(database, { id: budgetId });
  
    const totals = await getTotals(database, budgetId);
    res.json({ ...budget, totals })

  } catch (err) {
    next(err);
  }

})


router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { database } = req.app.locals;
    const item = await database.collection('items').findOne({ _id: ObjectId(id) });

    const { budgetId } = item || {};

    await database.collection('items').deleteOne({ _id: ObjectId(id) })

    const budget = await getBudgetById(database, { id: budgetId });
  
    const totals = await getTotals(database, budgetId);
    res.json({ ...budget, totals })

  } catch (err) {
    next(err);
  }
})

router.post('/:id/displayorder', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { database } = req.app.locals;

    const item = await updateItemDisplayOrder(database, id, req.body);

    const { budgetId } = item || {};

    const budget = await getBudgetById(database, { id: budgetId });
  
    const totals = await getTotals(database, budgetId);
    res.json({ ...budget, totals })
  } catch (err) {
    next(err);
  }
})


module.exports = router;
