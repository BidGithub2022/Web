import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

export const verifyToken = (token) => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const isAuthenticated = (req) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('No token provided');
    }
    return verifyToken(token);
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export const isStaffAuthenticated = (req) => {
  try {
    const decoded = isAuthenticated(req);
    if (decoded.role !== 'staff') {
      throw new Error('Not authorized as staff');
    }
    return decoded;
  } catch (error) {
    throw new Error('Staff authentication failed');
  }
};