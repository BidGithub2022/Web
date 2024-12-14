import Image from 'next/image';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/luxury-home.jpg"
            alt="Luxury Home"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Dream Home Awaits
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Hassle-free rental experience with cutting-edge technology
            </p>
            <Link 
        href="/properties"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300"
>
           Explore Properties
         </Link>
          </div>
        </div>
      </div>

{/* Featured Properties Section */}
<section className="py-16 px-4 bg-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold mb-12 text-center">Featured Properties</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64">
            <Image
              src={`/images/property-${index}.jpg`}
              alt={`Property ${index}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Luxury Apartment {index}</h3>
            <p className="text-gray-600 mb-4">Starting from ₹9999/month</p>
            <Link 
              href="/properties"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors duration-300"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Home Technology",
                description: "Experience modern living with integrated smart home features"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock assistance for all your needs"
              },
              {
                title: "Easy Booking",
                description: "Seamless online booking and property management"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
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
