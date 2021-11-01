const { ObjectId } = require('mongodb');
const upsertItem = require('../items/upsertItem').handler;

exports.handler = async (database, id, body) => {

  const {
    itemId,
    month,
    year,
    value,
    type,
    budgetId
  } = body

  if (!id && itemId) {
    await database.collection('entries').insertOne({
      itemId: ObjectId(itemId),
      month,
      year,
      value: parseFloat(value || 0)
    })
    return;
  }
  
  if (!id && !itemId && value) {
    const newItemId = await upsertItem(database, null, {
      budgetId,
      type
    })

    await database.collection('entries').insertOne({
      itemId: newItemId,
      month,
      year,
      value: parseFloat(value || 0)
    });

    return
  }
  await database.collection('entries').updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        value: parseFloat(value || 0)
      }
    }
  )
}