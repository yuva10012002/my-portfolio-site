const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Replace with your MongoDB URI (Atlas or Local)
mongoose.connect('mongodb://localhost:27017/contactForm', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define schema
const ContactSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: String,
  subject: String,
  message: String
});

// Create model
const Contact = mongoose.model('Contact', ContactSchema);

// POST route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.send('Message received and saved!');
  } catch (err) {
    res.status(500).send('Error saving message: ' + err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
