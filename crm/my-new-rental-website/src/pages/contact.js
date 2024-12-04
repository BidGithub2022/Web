import Navbar from '../components/Navbar';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Contact Us</h1>
            <p className="text-xl text-center mt-4">We&apos;d love to hear from you</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Email Us</h2>
            <p className="text-gray-600 mb-4">
              For inquiries about our properties or services, please email us at:
            </p>
            <a 
              href="mailto:omsmartstay@gmail.com"
              className="text-blue-600 hover:text-blue-800 text-lg font-semibold"
            >
              omsmartstay@gmail.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}