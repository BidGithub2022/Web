import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  name: {
    type: String,
    // This will be auto-generated from firstName and lastName
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  userType: {
    type: String,
    default: 'tenant'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'CRM' // Specify the collection name
});

// Pre-save middleware to concatenate name and hash password
userSchema.pre('save', async function(next) {
  // Concatenate firstName and lastName into name
  this.name = `${this.firstName} ${this.lastName}`.trim();

  // Hash password if modified
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// Method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);