const { ObjectId } = require('mongodb');

exports.handler = async (database, itemId, body) => {
  const {
    type,
    itemIndex
  } = body || {};

  const item = await database.collection('items').findOne({ _id: ObjectId(itemId) });

  const currentItems = await database.collection('items')
    .find({ type, budgetId: item.budgetId, _id: { $ne: item._id } })
    .sort({ displayOrder: 1 })
    .toArray();


  if (!currentItems.length || currentItems.length === itemIndex) {
    await database.collection('items')
      .updateOne({ _id: ObjectId(itemId) }, { $set: { type, displayOrder: itemIndex + 1 }})

    return await database.collection('items').findOne({ _id: ObjectId(itemId) });
  }

  const tasks = currentItems
    .reduce((prev, next, i) => {
      if (i === itemIndex) return [...prev, item, next];
      return [...prev, next];
    }, [])
    .map((item, idx) => {
      return database.collection('items')
        .update({ _id: item._id }, { $set: { displayOrder: idx + 1, type }})

    })

  await Promise.all(tasks);

  return await database.collection('items').findOne({ _id: ObjectId(itemId) });
}