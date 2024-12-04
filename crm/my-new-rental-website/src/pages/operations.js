import Navbar from '../components/Navbar';
import Image from 'next/image';

export default function Operations() {
  const services = [
    {
      title: "Regular Maintenance",
      description: "Scheduled maintenance of all facilities and equipment",
      items: [
        "Monthly AC service",
        "Quarterly deep cleaning",
        "Regular pest control",
        "Electrical maintenance",
        "Plumbing maintenance"
      ]
    },
    {
      title: "Emergency Services",
      description: "24/7 support for urgent maintenance needs",
      items: [
        "Power backup support",
        "Emergency plumbing",
        "Electrical emergencies",
        "Lock & key services",
        "Emergency repairs"
      ]
    },
    {
      title: "Housekeeping",
      description: "Professional cleaning and maintenance services",
      items: [
        "Weekly house cleaning",
        "Bathroom sanitization",
        "Kitchen cleaning",
        "Waste management",
        "Common area maintenance"
      ]
    },
    {
      title: "Property Management",
      description: "Complete property care and management",
      items: [
        "Security services",
        "Visitor management",
        "Utility bill payments",
        "Vendor management",
        "Regular inspections"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Operations & Maintenance
            </h1>
            <p className="text-xl text-center mt-4">
              Professional property maintenance services for your comfort
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <svg 
                        className="w-5 h-5 mr-3 text-blue-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Maintenance Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Emergency maintenance support available round the clock
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
                <p className="text-gray-600">
                  Swift response to all maintenance requests
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
                <p className="text-gray-600">
                  Professional maintenance by qualified technicians
                </p>
              </div>
            </div>
          </div>

          {/* Maintenance Request Button */}
          <div className="mt-16 text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
              Submit Maintenance Request
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
