const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017'

const client = new MongoClient(uri);

const main = async () => {
  try {
    const mongo = await client.connect();
    const database = mongo.db('budget');

    await database.collection('types').remove();
  

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
        type: 'professional',
        multiplier: -1,
        displayOrder: 4,
        displayName: 'Professional',
        primaryColor: 'purple',
        secondaryColor: '#8000803d',
      },
      {
        type: 'household',
        multiplier: -1,
        displayOrder: 5,
        displayName: 'Household',
        primaryColor: '#efc700',
        secondaryColor: 'rgb(255 246 202)',
      },
      {
        type: 'child',
        multiplier: -1,
        displayOrder: 6,
        displayName: 'Child',
        primaryColor: '#efc700',
        secondaryColor: 'rgb(255 246 202)',
      },
      {
        type: 'health',
        multiplier: -1,
        displayOrder: 7,
        displayName: 'Health & Wellness',
        primaryColor: '#efc700',
        secondaryColor: 'rgb(255 246 202)',
      },
      {
        type: 'savings',
        multiplier: -1,
        displayOrder: 8,
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