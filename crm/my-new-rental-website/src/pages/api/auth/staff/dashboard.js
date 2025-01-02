export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // For development testing
  if (token === 'mock_jwt_token_for_level2_staff') {
    return res.status(200).json({
      success: true,
      data: {
        staffId: 'STAFF123',
        name: 'Satya Sahu',
        email: 'sahu.satya@gmail.com',
        role: 'staff_level2',
        isVerified: true,
        // Add any other dashboard data you need
        properties: [
          {
            id: 'PROP1',
            name: 'Property 1',
            location: 'Patia',
            status: 'Available'
          },
          // Add more properties as needed
        ]
      }
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid token' });
}