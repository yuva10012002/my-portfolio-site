// api/contact.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("portfolio"); // or any name you choose
    await db.collection("messages").insertOne({
      fullName,
      email,
      phone,
      subject,
      message,
      createdAt: new Date(),
    });

    client.close();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
}
