import { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import authService from '../services/auth';

export default function Login() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('existing');
  const [loginMethod, setLoginMethod] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [staffLevel, setStaffLevel] = useState(1);

  // Form States
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });

  const [staffData, setStaffData] = useState({
    email: '',
    password_hint: '',
    actual_password: ''
  });

  // Form Change Handlers
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleStaffChange = (e) => {
    const { name, value } = e.target;
    setStaffData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

   // Form Submit Handlers
   const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const data = await authService.registerLead({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        agreeToTerms: formData.agreeToTerms
      });

      setSuccess('Registration successful! Please login.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });

      setTimeout(() => {
        setActiveTab('existing');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTenantLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authService.tenantLogin(
        loginData.emailOrPhone,
        loginData.password
      );
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.data));
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (staffLevel === 1) {
        const data = await authService.staffLoginLevel1(
          staffData.email,
          staffData.password_hint
        );
        if (data.success) {
          setStaffLevel(2);
          setError('');
        }
      } else {
        const data = await authService.staffLoginLevel2(
          staffData.email,
          staffData.actual_password
        );
        localStorage.setItem('staffToken', data.token);
        router.push('/staff-dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Functions (Development Only)
  const testStaffLoginLevel1 = async () => {
    try {
      const data = await authService.staffLoginLevel1(
        'comfortstaypatia@gmail.com',
        'abcd1234'
      );
      if (data.success) {
        setSuccess('Staff Level 1 Login Successful!');
        setStaffLevel(2);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const testStaffLoginLevel2 = async () => {
    try {
      const data = await authService.staffLoginLevel2(
        'sahu.satya@gmail.com',
        '4321dcba'
      );
      localStorage.setItem('staffToken', data.token);
      router.push('/staff-dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const testTenantLoginEmail = async () => {
    try {
      const data = await authService.tenantLogin(
        'test@example.com',
        'password123'
      );
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.data));
        setSuccess('Tenant login successful!');
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const testTenantLoginPhone = async () => {
    try {
      const data = await authService.tenantLogin(
        '1234567890',
        'password123'
      );
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.data));
        setSuccess('Tenant login successful!');
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message);
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
                  activeTab === 'existing' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('existing')}
              >
                Existing Tenant
              </button>
              <button
                className={`flex-1 py-4 text-center font-semibold ${
                  activeTab === 'staff' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('staff')}
              >
                Staff Login
              </button>
              <button
                className={`flex-1 py-4 text-center font-semibold ${
                  activeTab === 'new' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('new')}
              >
                New User
              </button>
            </div>

            {/* Messages */}
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

            {/* Forms */}
            <div className="p-8">
              {/* Existing Tenant Login Form */}
              {activeTab === 'existing' && (
                <>
                  <form onSubmit={handleTenantLogin} className="space-y-6">
                    <h2 className="text-2xl font-bold text-center mb-8">Welcome Back!</h2>
                    
                    {/* Login Method Toggle */}
                    <div className="flex justify-center space-x-4 mb-4">
                      <button
                        type="button"
                        onClick={() => setLoginMethod('email')}
                        className={`px-4 py-2 rounded-full ${
                          loginMethod === 'email' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginMethod('phone')}
                        className={`px-4 py-2 rounded-full ${
                          loginMethod === 'phone' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                        placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
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
                      <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
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

                  {/* Test Buttons - Only shown in development mode */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 pt-8 border-t">
                      <h3 className="text-lg font-semibold mb-4">Test Tenant Login</h3>
                      <div className="space-y-4">
                        <button
                          onClick={testTenantLoginEmail}
                          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                          Test Tenant Login (Email)
                        </button>
                        <button
                          onClick={testTenantLoginPhone}
                          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                        >
                          Test Tenant Login (Phone)
                        </button>
                        <button
                          onClick={() => {
                            localStorage.clear();
                            setSuccess('Local storage cleared!');
                          }}
                          className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                          Clear Local Storage
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )} 

               {/* Staff Login Form */}
               {activeTab === 'staff' && (
                <>
                  <form onSubmit={handleStaffLogin} className="space-y-6">
                    <h2 className="text-2xl font-bold text-center mb-8">Staff Login</h2>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={staffData.email}
                        onChange={handleStaffChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                        placeholder="Enter your staff email"
                        required
                      />
                    </div>

                    {staffLevel === 1 ? (
                      <div>
                        <label className="block text-gray-700 mb-2">Password Hint</label>
                        <input
                          type="password"
                          name="password_hint"
                          value={staffData.password_hint}
                          onChange={handleStaffChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                          placeholder="Enter your password hint"
                          required
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-gray-700 mb-2">Actual Password</label>
                        <input
                          type="password"
                          name="actual_password"
                          value={staffData.actual_password}
                          onChange={handleStaffChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                          placeholder="Enter your actual password"
                          required
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400"
                    >
                      {loading ? 'Processing...' : staffLevel === 1 ? 'Next' : 'Sign In'}
                    </button>
                  </form>

                  {/* Test Buttons - Only shown in staff tab and development mode */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 pt-8 border-t">
                      <h3 className="text-lg font-semibold mb-4">Test Staff Login</h3>
                      <div className="space-y-4">
                        <button
                          onClick={testStaffLoginLevel1}
                          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                          Test Staff Login (Level 1)
                        </button>
                        <button
                          onClick={testStaffLoginLevel2}
                          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                        >
                          Test Staff Login (Level 2)
                        </button>
                        <button
                          onClick={() => {
                            localStorage.clear();
                            setSuccess('Local storage cleared!');
                          }}
                          className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                          Clear Local Storage
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* New User Registration Form */}
              {activeTab === 'new' && (
                <form onSubmit={handleRegister} className="space-y-6">
                  <h2 className="text-2xl font-bold text-center mb-8">Create New Account</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleRegisterChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
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
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
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
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
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
                    <label className="text-sm text-gray-600">
                      I agree to the Terms and Conditions
                    </label>
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