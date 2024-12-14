import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function PropertyDetails( { propertyData = {} }) {
  const router = useRouter();
  const { id } = router.query;
  const [activeImage, setActiveImage] = useState(0);

  // In a real app, fetch property data based on ID
  const property = properties.find(p => p.id === parseInt(id)) || propertyData;

  if (!property) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[400px]">
              <Image
                src={property.images[activeImage]}
                alt={property.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {property.images.map((image, index) => (
                <div 
                  key={index}
                  className={`relative h-32 cursor-pointer ${
                    activeImage === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image}
                    alt={`View ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Information */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Details */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                <p className="text-gray-600 mb-4">{property.address}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                  <span className="text-gray-600">per month</span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(property.features).map(([key, value]) => (
                    <div key={key} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="capitalize">{key}: {value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Nearby Places</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(property.nearbyPlaces).map(([category, places]) => (
                    <div key={category}>
                      <h3 className="font-semibold mb-2 capitalize">{category}</h3>
                      <ul className="space-y-2">
                        {places.map((place, index) => (
                          <li key={index} className="text-gray-600 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {place}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <p className="text-gray-600">{property.availability}</p>
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Security Deposit</h3>
                  <p className="text-gray-600">{property.deposit}</p>
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">House Rules</h3>
                  <ul className="space-y-2">
                    {property.rules.map((rule, index) => (
                      <li key={index} className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => router.push({
                    pathname: '/application',
                    query: { propertyId: property.id, propertyTitle: property.title }
                  })}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  return {
    props: {
      propertyData: {}, // Initially empty, will be populated client-side
      properties: []
    }
  }
}
