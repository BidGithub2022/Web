import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          {/* Logo Section */}
          <Link href="/" className="relative w-[200px] h-[100px] py-2 block cursor-pointer">
            <Image
              src="/images/Logo.jpeg"
              alt="Company Logo"
              fill
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-4"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-4"
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-4"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-4"
            >
              Contact Us
            </Link>
          </div>

          {/* Auth button */}
          <div className="ml-auto">
            <Link
              href="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors px-6 py-2 rounded-full"
            >
              Login/Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}