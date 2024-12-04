import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Application() {
  const router = useRouter();
  const { propertyId, propertyTitle } = router.query;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occupation: '',
    company: '',
    monthlyIncome: '',
    moveInDate: '',
    duration: '12',
    tenants: '1',
    documents: {
      idProof: false,
      addressProof: false,
      employmentProof: false,
      photo: false
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Rental Application</h1>
            {propertyTitle && (
              <p className="text-xl text-center mt-4">For {propertyTitle}</p>
            )}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </section>

              {/* Employment Information */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Employment Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Occupation *</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.occupation}
                      onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Monthly Income (₹) *</label>
                    <input
                      type="number"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                    />
                  </div>
                </div>
              </section>

              {/* Lease Details */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Lease Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Preferred Move-in Date *</label>
                    <input
                      type="date"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.moveInDate}
                      onChange={(e) => setFormData({...formData, moveInDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Lease Duration (months) *</label>
                    <select
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    >
                      <option value="12">12 months</option>
                      <option value="11">11 months</option>
                      <option value="6">6 months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Number of Tenants *</label>
                    <select
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                      value={formData.tenants}
                      onChange={(e) => setFormData({...formData, tenants: e.target.value})}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Required Documents */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Required Documents</h2>
                <p className="text-gray-600 mb-4">Please check the documents you can provide:</p>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={formData.documents.idProof}
                      onChange={(e) => setFormData({
                        ...formData,
                        documents: {...formData.documents, idProof: e.target.checked}
                      })}
                    />
                    <span>Government ID Proof (Aadhar/PAN/Passport)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={formData.documents.addressProof}
                      onChange={(e) => setFormData({
                        ...formData,
                        documents: {...formData.documents, addressProof: e.target.checked}
                      })}
                    />
                    <span>Address Proof</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={formData.documents.employmentProof}
                      onChange={(e) => setFormData({
                        ...formData,
                        documents: {...formData.documents, employmentProof: e.target.checked}
                      })}
                    />
                    <span>Employment Proof / Salary Slips</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={formData.documents.photo}
                      onChange={(e) => setFormData({
                        ...formData,
                        documents: {...formData.documents, photo: e.target.checked}
                      })}
                    />
                    <span>Passport Size Photo</span>
                  </label>
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}