import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        setFormStatus('error');
        console.error('Contact form submission failed:', errorData);
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Network error during contact form submission:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Information Section */}
            <div className="p-8 bg-purple-500 border-r border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Get in Touch</h2>
                <p className="text-amber-50 text-sm">We're here to help. Reach out to us!</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white">
                  <FaEnvelope className="text-black" />
                  <span>support@grapeslab.com</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <FaPhone className="text-black" />
                  <span>+91 (123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <FaMapMarkerAlt className="text-black" />
                  <span>123 Learning Lane, Knowledge City, World</span>
                </div>
              </div>
              <p className="text-white text-xs mt-6">
                Our team typically responds within 24-48 hours.
              </p>
            </div>

            {/* Contact Form Section */}
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      formStatus === 'submitting'
                        ? 'bg-indigo-300 cursor-wait'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    } focus-ring-indigo-500 disabled:opacity-50`}
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                  {formStatus === 'success' && (
                    <p className="mt-2 text-green-500 text-sm">Message sent successfully!</p>
                  )}
                  {formStatus === 'error' && (
                    <p className="mt-2 text-red-500 text-sm">Failed to send message. Please try again.</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;