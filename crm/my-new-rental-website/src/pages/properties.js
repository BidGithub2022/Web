import Navbar from '../components/Navbar';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Properties() {
  const router = useRouter();
  const [filter, setFilter] = useState('all'); // 'all', '1rk', '1bhk'

  const properties = [
    {
      id: 1,
      title: "Cozy 1RK Studio Apartment",
      type: "1rk",
      price: "₹7,999",
      location: "Temple City of India, Bhubaneswar",
      amenities: ["Furnished", "AC", "WiFi", "Power Backup", "Security"],
      image: "/images/property-1.jpg",
      features: [
        "1 Room Kitchen",
        "1 Bathroom",
        "Kitchenette",
        "350 sqft"
      ]
    },
    {
      id: 2,
      title: "Modern 1RK Apartment",
      type: "1rk",
      price: "₹8,499",
      location: "Temple City of India, Bhubaneswar",
      amenities: ["Semi-Furnished", "AC", "WiFi", "Power Backup", "Security"],
      image: "/images/property-2.jpg",
      features: [
        "1 Room Kitchen",
        "1 Bathroom",
        "Modular Kitchen",
        "400 sqft"
      ]
    },
    {
      id: 3,
      title: "Luxury 1BHK Apartment",
      type: "1bhk",
      price: "₹9,999",
      location: "Temple City of India, Bhubaneswar",
      amenities: ["Furnished", "AC", "WiFi", "Power Backup", "Security"],
      image: "/images/property-3.jpg",
      features: [
        "1 Bedroom",
        "1 Bathroom",
        "Modern Kitchen",
        "600 sqft"
      ]
    },
    {
      id: 4,
      title: "Premium 1BHK Apartment",
      type: "1bhk",
      price: "₹10,499",
      location: "Temple City of India, Bhubaneswar",
      amenities: ["Fully Furnished", "AC", "WiFi", "Power Backup", "Security"],
      image: "/images/property-1.jpg",
      features: [
        "1 Bedroom",
        "1 Bathroom",
        "Modular Kitchen",
        "650 sqft"
      ]
    }
  ];

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(prop => prop.type === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Available Properties</h1>
            <p className="text-xl text-center mt-4">Find your perfect home in Temple City of India</p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => setFilter('1rk')}
              className={`px-6 py-2 rounded-full ${
                filter === '1rk' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              1 RK
            </button>
            <button
              onClick={() => setFilter('1bhk')}
              className={`px-6 py-2 rounded-full ${
                filter === '1bhk' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              1 BHK
            </button>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Property Image */}
                <div className="relative h-64">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {property.type.toUpperCase()}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.location}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600 text-sm">
                          <svg className="w-4 h-4 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, index) => (
                        <span 
                          key={index}
                          className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                    <button 
                      onClick={() => router.push({
                        pathname: '/application',
                        query: { 
                          propertyId: property.id,
                          propertyTitle: property.title
                        }
                      })}
                      className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}