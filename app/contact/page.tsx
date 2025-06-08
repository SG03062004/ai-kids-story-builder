"use client"
import React, { useState } from 'react'

function ContactUs() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    // Optionally, reset form fields or send data to backend here.
    setTimeout(() => {
      setSubmitted(false) // Auto-hide message after 3 seconds
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] py-16 px-6 md:px-20 lg:px-40">
      <h2 className="text-4xl font-bold text-center text-[#4a5c99] mb-10">Contact Us</h2>

      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8">
        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-[#333]">Send Us a Message</h3>

          {submitted && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
              ✅ Thanks for your feedback!
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a5c99] text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a5c99] text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a5c99] text-black"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#4a5c99] hover:bg-[#3a4d85] text-white font-medium px-6 py-2 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-[#4a5c99] mb-1">Email</h4>
            <p className="text-gray-700">support@storybuilder.com</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-[#4a5c99] mb-1">Phone</h4>
            <p className="text-gray-700">+91 98765 43210</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-[#4a5c99] mb-1">Address</h4>
            <p className="text-gray-700">123, Creative Lane, Mumbai, Maharashtra, India</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-[#4a5c99] mb-1">Working Hours</h4>
            <p className="text-gray-700">Monday – Friday: 9:00 AM – 6:00 PM IST</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
