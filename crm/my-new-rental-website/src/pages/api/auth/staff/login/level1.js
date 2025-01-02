export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { email, password_hint } = req.body;
  
    // Mock validation
    if (email === 'comfortstaypatia@gmail.com' && password_hint === 'abcd1234') {
      return res.status(200).json({
        success: true,
        message: 'First level authentication successful'
      });
    }
  
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }