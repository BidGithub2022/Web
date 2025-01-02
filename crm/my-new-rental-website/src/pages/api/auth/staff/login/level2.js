export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, actual_password } = req.body;

  // Test credentials for level 2 staff
  if (email === 'sahu.satya@gmail.com' && actual_password === '4321dcba') {
    return res.status(200).json({ 
      success: true, 
      token: 'mock_jwt_token_for_level2_staff',
      user: { 
        email, 
        role: 'staff_level2', // Make sure this matches your role check
        staffId: 'STAFF123',
        isVerified: true
      }
    });
  }

  return res.status(401).json({ 
    success: false, 
    message: 'Invalid credentials' 
  });
}