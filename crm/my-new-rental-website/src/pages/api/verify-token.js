export default function handler(req, res) {
  console.log('Verify token API called');

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided' 
    });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token to verify:', token);

  // Mock user database for token verification
  const validTokens = {
    'mock_token_TENANT123': {
      id: 'TENANT123',
      name: 'Test Tenant',
      email: 'test@example.com',
      phone: '1234567890',
      role: 'tenant'
    },
    'mock_token_TENANT456': {
      id: 'TENANT456',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      role: 'tenant'
    }
  };

  // Verify the token
  const userData = validTokens[token];
  if (!userData) {
    console.log('Invalid token');
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }

  console.log('Token verified for user:', userData.email);
  return res.status(200).json({
    success: true,
    data: userData,
    message: 'Token verified'
  });
}