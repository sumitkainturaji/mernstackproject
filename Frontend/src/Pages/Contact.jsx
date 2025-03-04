import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../Components/Title'
import NewsLetterBox from '../Components/NewsLetterBox'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formEndpoint = 'https://api.web3forms.com/submit'
    const formKey = '353db92f-91da-4a66-a696-1e1c8eb88435'

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: JSON.stringify({ ...formData, access_key: formKey }),
        headers: { 'Content-Type': 'application/json' },
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Message sent successfully!', { position: 'top-right' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error('Something went wrong. Please try again.', {
          position: 'top-right',
        })
      }
    } catch (error) {
      toast.error('Network error. Please try again later.', {
        position: 'top-right',
      })
    }
  }

  return (
    <div className="container mx-auto px-4">
      <ToastContainer />
      <div className="text-center text-2xl pt-10 border-t ">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-12 flex flex-col md:flex-row justify-center items-center gap-12 mb-28">
        <img
          className="w-full md:w-[80%] md:max-w-[470px] object-cover"
          src={assets.contact_img}
          alt="Contact"
        />

        <div className="flex flex-col justify-center items-center flex-1 w-full">
          <div className="flex flex-col justify-center items-start gap-5 w-full md:w-[500px] text-lg">
            <p className="text-gray-600 leading-relaxed">
              <strong>💬 Need Help?</strong> Our support team is available 24/7
              for order tracking, returns, and product inquiries.
            </p>
            <p className="text-gray-600">
              📍 <strong>Address:</strong> Devprayag, Uttarakhand, 249301
            </p>
            <p className="text-gray-600">
              📞 <strong>Mobile:</strong> +91-6395734863 <br />
              📧 <strong>Email:</strong> sumitkaintura73@gmail.com
            </p>
          </div>

          <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full md:w-[500px] mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              📩 Queries & Feedback
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-1 border rounded-md text-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-1 border rounded-md text-lg"
              />
              <textarea
                name="message"
                rows="3"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-1 border rounded-md text-lg"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-900 transition-all text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact
