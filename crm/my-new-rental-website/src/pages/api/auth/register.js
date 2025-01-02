export default function handler(req, res) {
  console.log('Register API called with:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      password, 
      confirmPassword,
      agreeToTerms 
    } = req.body;

    // Log received data (remove in production)
    console.log('Received registration data:', {
      firstName,
      lastName,
      email,
      phone,
      passwordLength: password ? password.length : 0,
      agreeToTerms
    });

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Terms agreement validation
    if (!agreeToTerms) {
      return res.status(400).json({
        success: false,
        message: 'You must agree to the Terms and Conditions'
      });
    }

    // Name validation
    if (firstName.length < 2 || lastName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'First and last names must be at least 2 characters long'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit phone number'
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Mock check for existing email
    if (email === 'test@example.com') {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Mock check for existing phone
    if (phone === '1234567890') {
      return res.status(400).json({
        success: false,
        message: 'An account with this phone number already exists'
      });
    }

    // Mock successful registration
    return res.status(201).json({
      success: true,
      data: {
        id: 'USER_' + Date.now(),
        name: `${firstName} ${lastName}`,
        email,
        phone,
        userType: 'Future Prospect Tenant'
      },
      message: 'Registration successful! Please login.'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
}