const router = require('express').Router();
const getTypes = require('../fn/types/getTypes').handler;

router.get('/', async (req, res, next) => {
  try {
    const { database } = req.app.locals;
    const types = await getTypes(database);
    res.json(types);
  } catch (err) {
    next(err);
  }

})


module.exports = router;
