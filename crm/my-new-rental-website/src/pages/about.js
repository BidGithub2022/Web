import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section - Changed from blue to purple */}
        <div className="bg-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">About OmSmartStay</h1>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
          {/* Mission Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-purple-900">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to provide customized homes, catering towards customer needs that prioritize tenant comfort and satisfaction. We are dedicated to harnessing cutting-edge technology to provide self service capabilities which would make our customers onboarding and stay hassle free and convenient. By integrating advanced software solutions, we aim to deliver exceptional value to our customers, reduce operational costs, and ensure a seamless living experience for our tenants.
            </p>
          </section>

          {/* Vision Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-purple-900">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              &ldquo;To provide hassle free rental house experience.&rdquo;
            </p>
          </section>

          {/* Objectives Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-purple-900">Our Objectives</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-600">
              <li>To acquire, develop, and maintain a portfolio of residential properties for rental purposes.</li>
              <li>To provide high-quality, well-maintained, and affordable rental housing options for individuals, families, and groups.</li>
              <li>To create a user-friendly and efficient online platform for marketing, booking, and managing rental properties which can be commercialized to support other companies.</li>
              <li>To ensure prompt and courteous customer service, ensuring a positive rental experience for tenants.</li>
              <li>To establish and maintain relationships with reputable property owners, real estate agents, and industry partners.</li>
              <li>To continuously monitor and improve the rental properties and services to meet the evolving needs of tenants.</li>
              <li>To expand the rental property portfolio through strategic acquisitions and partnerships.</li>
              <li>To achieve and maintain a high level of occupancy and customer satisfaction.</li>
              <li>To ensure compliance with relevant laws, regulations, and industry standards.</li>
              <li>To generate sustainable profits and growth for the Company and its stakeholders.</li>
              <li>Minimize waste reduction and maintain a hygienic environment for all properties managed under our umbrella.</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}