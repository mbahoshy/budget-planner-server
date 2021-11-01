const { ObjectId } = require('mongodb')

exports.handler = async (database, id) => {
    const monthTotals = await database.collection('items').aggregate([
      {
        $match: { budgetId: ObjectId(id)}
      },
      {
        $lookup: {
          from: 'types',
          as: 'type',
          let: { id: '$type' },
          pipeline: [
            {
              $match: { $expr: { $eq: ['$type', '$$id'] } },
            }
          ]
        }
      },
      {
        $addFields: {
          type: { $arrayElemAt: ['$type', 0] }
        }
      },
      {
        $lookup: {
          from: 'entries',
          as: 'entries',
          let: { 
            id: '$_id',
            multiplier: '$type.multiplier'
          },
          pipeline: [
            {
              $match: { $expr: { $eq: ['$itemId', '$$id'] } },
            },
            {
              $addFields: {
                computedValue: { $multiply: ['$$multiplier', '$value'] }
              }
            }
          ]
        }
      },
      {
        $unwind: '$entries'
      },
      {
        $group: { _id: { month: '$entries.month', year: '$entries.year' }, entries: {$push: '$$ROOT.entries'}}
      },
      {
        $addFields: {
          total: { $sum: '$entries.computedValue' }
        }
      },
      {
        $project: {
          year: '$_id.year',
          month: '$_id.month',
          value: '$total'
        }
      }
    ]).toArray();

    const categoryTotals = await database.collection('items').aggregate([
      {
        $match: { budgetId: ObjectId(id)}
      },
      {
        $lookup: {
          from: 'entries',
          as: 'entries',
          let: { 
            id: '$_id',
          },
          pipeline: [
            {
              $match: { $expr: { $eq: ['$itemId', '$$id'] } },
            }
          ]
        }
      },
      {
        $unwind: '$entries'
      },
      {
        $group: { _id: { month: '$entries.month', year: '$entries.year', type: '$type' }, entries: {$push: '$$ROOT.entries'}}
      },
      {
        $addFields: {
          total: { $sum: '$entries.value' }
        }
      },
      {
        $project: {
          year: '$_id.year',
          month: '$_id.month',
          type: '$_id.type',
          value: '$total'
        }
      }
    ]).toArray();

    return { monthTotals, categoryTotals };
}