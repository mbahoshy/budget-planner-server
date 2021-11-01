exports.handler = async (database) =>
  database
  .collection('types')
  .find()
  .sort({ displayOrder: 1 })
  .toArray()