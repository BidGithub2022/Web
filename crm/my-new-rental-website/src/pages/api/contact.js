import connectDB from '../../../lib/mongodb';
import Contact from '../../../models/Contact';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, email, phone, message } = req.body;

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to send message' 
    });
  }
}