const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017'

const client = new MongoClient(uri);

const main = async () => {
  try {
    return;
    const mongo = await client.connect();
    const database = mongo.db('budget');
  
    const collection = database.collection('budgets')
    const itemsCollection = database.collection('items')

    // await collection.remove({});
    // await itemsCollection.remove();
    // await database.collection('entries').remove();
    // await database.collection('types').remove();
    
    const { insertedId } = await collection.insertOne({
      description: '2021 Budget',
      startDate: new Date(2021, 0, 1),
      endDate: new Date(2021, 11, 31),
    })

    const { insertedId: xx } = await collection.insertOne({
      description: '2022 Budget',
      startDate: new Date(2021, 0, 1),
      endDate: new Date(2021, 11, 31),
    })

    // await itemsCollection.insertMany([
    //   {
    //     budgetId: insertedId,
    //     type: 'income',
    //     description: `Matt's Income`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'income',
    //     description: `Sierra's Income`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'debt',
    //     description: `VW Loan`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'recurring',
    //     description: `XCel Energy`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'recurring',
    //     description: `Compost`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'savings',
    //     description: `Bicycle`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'savings',
    //     description: `New Oven`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'savings',
    //     description: `Savings Account`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'entertainment',
    //     description: `Dining Out`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'household',
    //     description: `Groceries`,
    //   },
    //   {
    //     budgetId: insertedId,
    //     type: 'household',
    //     description: `Diapers`,
    //   },

    // ])


    await database.collection('types').insertMany([
      {
        type: 'income',
        multiplier: 1,
        displayOrder: 0,
        displayName: 'Income',
        primaryColor: '#00800082',
        secondaryColor: '#0080001a',
      },
      {
        type: 'debt',
        multiplier: -1,
        displayOrder: 1,
        displayName: 'Debt',
        primaryColor: '#ff00009e',
        secondaryColor: 'rgb(255 213 213)',
      },
      {
        type: 'recurring',
        multiplier: -1,
        displayOrder: 2,
        displayName: 'Recurring',
        primaryColor: '#ff00009e',
        secondaryColor: 'rgb(255 213 213)',
      },
      {
        type: 'entertainment',
        multiplier: -1,
        displayOrder: 3,
        displayName: 'Entertainment',
        primaryColor: 'purple',
        secondaryColor: '#8000803d',
      },
      {
        type: 'household',
        multiplier: -1,
        displayOrder: 4,
        displayName: 'Household',
        primaryColor: '#efc700',
        secondaryColor: 'rgb(255 246 202)',
      },
      {
        type: 'household',
        multiplier: -1,
        displayOrder: 5,
        displayName: 'Child',
        primaryColor: '#efc700',
        secondaryColor: 'rgb(255 246 202)',
      },
      {
        type: 'savings',
        multiplier: -1,
        displayOrder: 6,
        displayName: 'Savings',
        primaryColor: '#efc700',
        secondaryColor: 'rgb(255 246 202)',
      },
    ])
  
    process.exit(0)
  
  } catch (err) {
    process.exit(0)

  }


}

main()