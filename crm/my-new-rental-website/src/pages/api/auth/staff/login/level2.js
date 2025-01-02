export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { email, actual_password } = req.body;
  
    // Mock validation
    if (email === 'sahu.satya@gmail.com' && actual_password === '4321dcba') {
      return res.status(200).json({
        success: true,
        token: 'mock_jwt_token_for_testing',
        user: {
          email,
          role: 'staff',
          staffId: 'STAFF123'
        }
      });
    }
  
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }