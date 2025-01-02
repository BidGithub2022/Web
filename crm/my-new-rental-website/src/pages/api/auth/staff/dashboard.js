import { isStaffAuthenticated } from '../../../../utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify staff token
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await verifyToken(token);

    if (!decoded || decoded.role !== 'staff') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch dashboard data
    // This is where you'd normally query your database
    const dashboardData = {
      stats: {
        totalTenants: 45,
        activeBookings: 32,
        pendingMaintenance: 5,
        availableRooms: 8
      },
      recentActivities: [
        {
          type: 'booking',
          description: 'New booking for Room 203',
          timestamp: '2024-03-20T10:30:00Z'
        },
        {
          type: 'maintenance',
          description: 'Maintenance request for Room 105',
          timestamp: '2024-03-20T09:15:00Z'
        }
        // Add more activities as needed
      ]
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Staff dashboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}