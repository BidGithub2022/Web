import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

// Image path helper function
const getImagePath = (imageName) => {
  return `/images/${imageName}`;
};

// Image with fallback and loading state
const ImageWithFallback = ({ src, alt, isDetail = false, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setLoading(true);
    setError(false);
  }, [src]);

  return (
    <>
      {loading && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        onError={() => {
          console.error('Image failed to load:', src);
          setError(true);
          setLoading(false);
          const fallbackImage = isDetail ? 
            getImagePath('Property-1-room.png') : 
            getImagePath('Property-1.png');
          setImgSrc(fallbackImage);
        }}
        onLoadingComplete={() => {
          console.log('Image loaded successfully:', src);
          setLoading(false);
        }}
      />
    </>
  );
};

// Property data
const properties = [
  {
    id: 1,
    title: "Single Occupancy Room - Patia",
    location: "Patia, Bhubaneswar",
    price: "₹8,000/month",
    mainImage: getImagePath('Property-1-room.png'),
    images: [
      getImagePath('Property-1-room.png'),
      getImagePath('Property-2-room.png'),
      getImagePath('Property-3-room.png'),
    ],
    amenities: ["AC", "Attached Bathroom", "WiFi", "Power Backup"],
    description: "Fully furnished single occupancy room with modern amenities...",
    features: [
      "24/7 Security",
      "Daily Cleaning",
      "Laundry Service",
      "Food Available",
    ]
  },
  {
    id: 2,
    title: "Double Occupancy Room - Patia",
    location: "Patia, Bhubaneswar",
    price: "₹6,000/month",
    mainImage: getImagePath('Property-2-room.png'),
    images: [
      getImagePath('Property-1-room.png'),
      getImagePath('Property-2-room.png'),
      getImagePath('Property-3-room.png'),
    ],
    amenities: ["AC", "Shared Bathroom", "WiFi", "Power Backup"],
    description: "Comfortable double occupancy room with essential amenities...",
    features: [
      "24/7 Security",
      "Weekly Cleaning",
      "Laundry Service",
      "Food Available",
    ]
  },
  {
    id: 3,
    title: "Triple Sharing Room - Patia",
    location: "Patia, Bhubaneswar",
    price: "₹4,000/month",
    mainImage: getImagePath('Property-3-room.png'),
    images: [
      getImagePath('Property-1-room.png'),
      getImagePath('Property-2-room.png'),
      getImagePath('Property-3-room.png'),
    ],
    amenities: ["Fan", "Shared Bathroom", "WiFi", "Power Backup"],
    description: "Economical triple sharing room with basic amenities...",
    features: [
      "24/7 Security",
      "Weekly Cleaning",
      "Common Laundry Area",
      "Food Available",
    ]
  }
];

export default function Properties() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Modal for property details
  const PropertyModal = ({ property, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Image Gallery */}
            <div className="relative h-64 md:h-96 mb-6">
              <ImageWithFallback
                src={property.images[currentImageIndex]}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
                isDetail={true}
              />
              {/* Image Navigation */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === 0 ? property.images.length - 1 : prev - 1
                  )}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === property.images.length - 1 ? 0 : prev + 1
                  )}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  aria-label="Next image"
                >
                  →
                </button>
              </div>
            </div>

            {/* Property Details */}
            <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
            <p className="text-gray-600 mb-4">{property.location}</p>
            <p className="text-xl font-semibold text-purple-600 mb-6">{property.price}</p>

            {/* Preview Content */}
            <div className="space-y-4">
              <h3 className="font-semibold">Amenities:</h3>
              <ul className="grid grid-cols-2 gap-2">
                {property.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">✓</span> {amenity}
                  </li>
                ))}
              </ul>

              <div className="border-t pt-4 mt-6">
                <p className="text-gray-600 mb-4">
                  Sign up to see more details including:
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Complete property description</li>
                  <li>Additional amenities</li>
                  <li>Booking availability</li>
                  <li>Contact information</li>
                </ul>
                <Link
                  href="/login"
                  className="block text-center bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors mt-6"
                >
                  Register to View More
                </Link>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
          
          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Property Card */}
                <div className="relative h-48">
                  <ImageWithFallback
                    src={property.mainImage}
                    alt={property.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={property.id <= 3}
                    isDetail={false}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  <p className="text-lg font-semibold text-purple-600 mb-4">
                    {property.price}
                  </p>
                  <button
                    onClick={() => setSelectedProperty(property)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => {
            setSelectedProperty(null);
            setCurrentImageIndex(0);
          }}
        />
      )}
    </div>
  );
}