import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Please add MONGODB_URI to .env');

const client = new MongoClient(uri);
await client.connect();
const db = client.db('yuvarajaPortfolio'); // change if needed
const contacts = db.collection('contacts');

// Middleware
app.use(express.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.post('/api/contact', async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await contacts.insertOne({
      fullName,
      email,
      phone,
      subject,
      message,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('DB Insert Error:', error);
    res.status(500).json({ error: 'Error saving your message.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
