const app = require('../app')
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'

const client = new MongoClient(uri);

const start = async () => {
  
  const mongo = await client.connect();
  const database = mongo.db('budget');
  app({ database });
}


start();