const { ObjectId } = require('mongodb')

const getMax = async (database, type, budgetId) => {
  const [result] = await database.collection('items').aggregate([
    { $match : { type, budgetId }},
    {
      $group: {
        _id: null,
        max: { $max: '$displayOrder'}
      }
    },
    // { $project: { max: { $max: '$displayOrder'}}}
  ]).toArray();
  const { max } = result || {};
  return max || 0;
}

exports.handler = async (database, itemId, body) => {
  const {
    description,
    type,
    budgetId
  } = body;

  if (!itemId) {
    const max = await getMax(database, type, budgetId);
    const { insertedId: newItemId } = await database.collection('items').insertOne({
      budgetId: ObjectId(budgetId),
      type,
      description,
      displayOrder: parseInt(max + 1)
    })
    return newItemId;
  }

  await database.collection('items').updateOne(
    { _id: ObjectId(itemId) },
    {
      $set: {
        description
      }
    }
  )

  return ObjectId(itemId);
}