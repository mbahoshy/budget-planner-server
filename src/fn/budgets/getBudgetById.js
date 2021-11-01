const { ObjectId } = require('mongodb')

exports.handler = async (database, { id }) => {
  const results = await database.collection('budgets').aggregate([
    {
      $match: { _id: ObjectId(id)}
    },
    {
      $lookup: {
        from: 'items',
        as: 'items',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: { $expr: { $eq: ['$budgetId', '$$id'] } },
          },
          { $sort: { displayOrder: 1 } }

        ]
      }
    },
    {
      $lookup: {
        from: 'entries',
        as: 'entries',
        localField: 'items._id',
        foreignField: 'itemId'
      }
    },
    // {
    //   $lookup: {
    //     from: 'types',
    //     as: 'types',
    //     let: { type: '$items.type' },
    //     pipeline: [
    //       {
    //         $match: { $expr: { $eq: ['$type', '$$type'] } },
    //       },
    //       // { $sort: { displayOrder: 1 } }
    //     ]
    //   }
    // },
    {
      $limit: 1
    }
  ]).toArray();

  const [budget] = results;
  return budget;
}