import { useState, useEffect } from 'react';
import StaffDashboardLayout from '../../components/StaffDashboardLayout';

export default function StaffDashboard() {
  const [stats, setStats] = useState({
    totalTenants: 0,
    activeBookings: 0,
    pendingMaintenance: 0,
    availableRooms: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('staffToken');
        const response = await fetch('/api/staff/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setStats(data.stats);
        setRecentActivities(data.recentActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <StaffDashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Staff Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Tenants</h3>
            <p className="text-2xl font-semibold">{stats.totalTenants}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Active Bookings</h3>
            <p className="text-2xl font-semibold">{stats.activeBookings}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Pending Maintenance</h3>
            <p className="text-2xl font-semibold">{stats.pendingMaintenance}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Available Rooms</h3>
            <p className="text-2xl font-semibold">{stats.availableRooms}</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 py-3 border-b">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activity.type === 'booking' ? 'bg-green-100 text-green-800' :
                    activity.type === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
}