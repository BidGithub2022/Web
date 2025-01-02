import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loading from './Loading';

export default function StaffDashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    const checkStaffAuth = async () => {
      try {
        const token = localStorage.getItem('staffToken');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/staff/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Invalid token');
        }

        const data = await response.json();
        setStaffData(data.user);
        setLoading(false);
      } catch (error) {
        console.error('Staff auth error:', error);
        localStorage.removeItem('staffToken');
        router.push('/login');
      }
    };

    checkStaffAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('staffToken');
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
            <h2 className="text-xl font-semibold">Staff Portal</h2>
            <p className="text-sm text-gray-600">{staffData?.email}</p>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/staff-dashboard" 
                  className={`block p-2 rounded-lg ${
                    router.pathname === '/staff-dashboard' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'hover:bg-gray-50'
                  }`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/staff-dashboard/tenants"
                  className={`block p-2 rounded-lg ${
                    router.pathname === '/staff-dashboard/tenants' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'hover:bg-gray-50'
                  }`}>
                  Manage Tenants
                </Link>
              </li>
              <li>
                <Link href="/staff-dashboard/bookings"
                  className={`block p-2 rounded-lg ${
                    router.pathname === '/staff-dashboard/bookings' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'hover:bg-gray-50'
                  }`}>
                  Bookings
                </Link>
              </li>
              <li>
                <Link href="/staff-dashboard/properties"
                  className={`block p-2 rounded-lg ${
                    router.pathname === '/staff-dashboard/properties' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'hover:bg-gray-50'
                  }`}>
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/staff-dashboard/maintenance"
                  className={`block p-2 rounded-lg ${
                    router.pathname === '/staff-dashboard/maintenance' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'hover:bg-gray-50'
                  }`}>
                  Maintenance
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