import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loading from './Loading';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Invalid token');
        }

        const data = await response.json();
        setUserData(data.user);
        setLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Om Smart Stay</h2>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" 
                  className={`block p-2 rounded-lg ${
                    router.pathname === '/dashboard' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'hover:bg-gray-50'
                  }`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/bookings"
                  className={`block p-2 rounded-lg ${
                    router.pathname === '/dashboard/bookings' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'hover:bg-gray-50'
                  }`}>
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile"
                  className={`block p-2 rounded-lg ${
                    router.pathname === '/dashboard/profile' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'hover:bg-gray-50'
                  }`}>
                  Profile
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}