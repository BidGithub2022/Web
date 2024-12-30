import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Check if phone number already exists
    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ message: 'User already exists with this phone number' });
    }

    // Create user in CRM collection
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      userType: 'Future Prospect Tenant'
    });

    // The name field will be automatically created by the pre-save middleware

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name, // Now includes the concatenated name
        email: user.email,
        phone: user.phone,
        userType: user.userType
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Registration failed' 
    });
  }
}