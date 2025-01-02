export default function handler(req, res) {
  console.log('Tenant login API called with:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  const { emailOrPhone, password } = req.body;
  console.log('Received credentials:', { emailOrPhone, password });

  // Mock user database
  const mockUsers = [
    {
      id: 'TENANT123',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      name: 'Test Tenant'
    },
    {
      id: 'TENANT456',
      email: 'john@example.com',
      phone: '9876543210',
      password: 'password123',
      name: 'John Doe'
    }
  ];

  try {
    // Find user by email or phone
    const user = mockUsers.find(u => 
      u.email === emailOrPhone || u.phone === emailOrPhone
    );

    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    if (user.password !== password) {
      console.log('Invalid password');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Successful login
    console.log('Login successful for:', user.email);
    return res.status(200).json({
      success: true,
      token: `mock_token_${user.id}`,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: 'tenant'
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
}