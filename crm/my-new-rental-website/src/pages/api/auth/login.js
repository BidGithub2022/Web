import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcryptjs from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        { email: emailOrPhone.toLowerCase() },
        { phone: emailOrPhone }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return user data (excluding password)
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Login failed' 
    });
  }
}