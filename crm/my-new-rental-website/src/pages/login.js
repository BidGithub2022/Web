import { useState } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('existing');
  const [loginMethod, setLoginMethod] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state for registration
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // Form state for login
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });

  // Handle registration form changes
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  // Handle registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    if (!formData.email) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    if (!formData.phone) {
      setError('Please enter your phone number');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess('Registration successful! Please login.');
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });

      // Switch to login tab after successful registration
      setTimeout(() => {
        setActiveTab('existing');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [loginMethod]: loginData.emailOrPhone,
          password: loginData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Redirect to dashboard or home page after successful login
      router.push('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Login Tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 text-center font-semibold ${
                  activeTab === 'existing'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('existing')}
              >
                Existing Tenant
              </button>
              <button
                className={`flex-1 py-4 text-center font-semibold ${
                  activeTab === 'new'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('new')}
              >
                New User
              </button>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                {success}
              </div>
            )}

            {/* Login Forms */}
            <div className="p-8">
              {activeTab === 'existing' ? (
                // Existing Tenant Login Form
                <form onSubmit={handleLogin} className="space-y-6">
                  <h2 className="text-2xl font-bold text-center mb-8">
                    Welcome Back!
                  </h2>

                  {/* Login Method Toggle */}
                  <div className="flex justify-center space-x-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setLoginMethod('email')}
                      className={`px-4 py-2 rounded-full ${
                        loginMethod === 'email'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('phone')}
                      className={`px-4 py-2 rounded-full ${
                        loginMethod === 'phone'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Phone
                    </button>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                    </label>
                    <input
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      name="emailOrPhone"
                      value={loginData.emailOrPhone}
                      onChange={handleLoginChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder={
                        loginMethod === 'email'
                          ? 'Enter your email'
                          : 'Enter your phone number'
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={loginData.rememberMe}
                        onChange={handleLoginChange}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
              ) : (
                // New User Registration Form
                <form onSubmit={handleRegister} className="space-y-6">
                  <h2 className="text-2xl font-bold text-center mb-8">
                    Create Account
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleRegisterChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleRegisterChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder="Create a password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleRegisterChange}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link
                        href="/terms"
                        className="text-purple-600 hover:text-purple-800"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/privacy"
                        className="text-purple-600 hover:text-purple-800"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}