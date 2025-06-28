import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // your connection string in environment variable
let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env');
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const client = await clientPromise;
    const db = client.db('yuvarajaPortfolio'); // replace with your DB name
    const collection = db.collection('contacts');

    await collection.insertOne({ fullName, email, phone, subject, message, date: new Date() });

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    return res.status(500).json({ error: 'Error sending message.' });
  }
}
