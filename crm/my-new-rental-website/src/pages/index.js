import Image from 'next/image';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Image path helper function
const getImagePath = (imageName) => {
  return `/images/${imageName}`;
};

// Image with fallback component
const ImageWithFallback = ({ src, alt, ...props }) => {
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
          setImgSrc(getImagePath('Property-1.png')); // Fallback image
        }}
        onLoadingComplete={() => {
          console.log('Image loaded successfully:', src);
          setLoading(false);
        }}
      />
    </>
  );
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProperties = () => {
    setCurrentIndex((prev) => (prev + 2 >= 3 ? 0 : prev + 2));
  };

  const propertyDetails = [
    {
      image: getImagePath('Property-1.png'),
      address: "20°20'34.2\"N+85°49'51.1\"E",
      mapUrl: "https://www.google.com/maps/place/20%C2%B020'34.2%22N+85%C2%B049'51.1%22E/@20.3428195,85.8282863,17z",
      title: "Patia",
      price: "9000",
      coordinates: {
        lat: 20.3428195,
        lng: 85.8308612
      }
    },
    {
      image: getImagePath('Property-2.png'),
      address: "20°20'34.2\"N+85°49'51.1\"E",
      mapUrl: "https://www.google.com/maps/place/20%C2%B020'34.2%22N+85%C2%B049'51.1%22E/@20.3428195,85.8282863,17z",
      title: "Patia",
      price: "15000",
      coordinates: {
        lat: 20.3428195,
        lng: 85.8308612
      }
    },
    {
      image: getImagePath('Property-3.png'),
      address: "20°20'34.2\"N+85°49'51.1\"E",
      mapUrl: "https://www.google.com/maps/place/20%C2%B020'34.2%22N+85%C2%B049'51.1%22E/@20.3428195,85.8282863,17z",
      title: "Patia",
      price: "8000",
      coordinates: {
        lat: 20.3428195,
        lng: 85.8308612
      }
    }
  ];

  const prevProperties = () => {
    setCurrentIndex((prev) => (prev - 2 < 0 ? Math.max(0, 3 - 2) : prev - 2));
  };

  return (
    <main className="min-h-screen">
      <nav className="bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center">
            {/* Logo Section */}
            <Link href="/" className="relative w-[200px] h-[100px] py-2">
              <ImageWithFallback
                src="/images/Logo.jpeg"
                alt="Company Logo"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </Link>
            {/* Navigation Links */}
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-4">
                Home
              </Link>
              <Link href="/properties" className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-4">
                Properties
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-4">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-4">
                Contact Us
              </Link>
            </div>
            {/* Auth buttons */}
            <div className="flex space-x-4 ml-auto">
              <Link href="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors px-6 py-2 rounded-full">
                Login/Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Featured Properties Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900">
            Featured Properties
          </h2>
          <div className="relative">
            <button
              onClick={prevProperties}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-4 rounded-r shadow-xl hover:bg-white text-2xl"
            >
              ←
            </button>
            <button
              onClick={nextProperties}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-4 rounded-l shadow-xl hover:bg-white text-2xl"
            >
              →
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[1, 2, 3].map((index) => {
                if (index > currentIndex && index <= currentIndex + 2) {
                  const property = propertyDetails[index - 1];
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-2xl overflow-hidden">
                      <div className="relative aspect-[4/3] w-full">
                        <ImageWithFallback
                          src={property.image}
                          alt={`OmSmartStay ${property.title}`}
                          fill
                          style={{ objectFit: 'contain' }}
                          className="p-1"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                        />
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                          OmSmartStay {property.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 font-medium">
                          Starting from ₹{property.price}/month
                        </p>
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <a
                            href={property.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                          >
                            {property.title}, Bhubaneswar
                          </a>
                        </div>
                        <Link
                          href="/properties"
                          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-xl mb-8">Browse our available properties and start your journey today.</p>
          <Link
            href="/properties"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}