import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { assets } from '../assets/frontend_assets/assets' // Ensure correct image path

const LoginPage = () => {
  const [currentState, setCurrentState] = useState('Login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const [forgotPassword, setForgotPassword] = useState(false)
  const [emailForReset, setEmailForReset] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Submit Handler for Login & Signup
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const url =
        currentState === 'Login'
          ? 'http://localhost:2000/api/auth/login'
          : 'http://localhost:2000/api/auth/register'

      const res = await axios.post(url, formData)
      setMessage(
        `Success: ${currentState === 'Login' ? 'Logged in' : 'Registered'}`
      )

      if (currentState === 'Login') {
        Cookies.set('authToken', res.data.token, { expires: 7 })
        Cookies.set('user', JSON.stringify(res.data.user), { expires: 7 })
        navigate('/')
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Something went wrong')
    }
  }

  // Forgot Password Handler
  const handleForgotPassword = async () => {
    if (!emailForReset) {
      setMessage('Please enter your email.')
      return
    }
    try {
      const res = await axios.post(
        'http://localhost:2000/api/auth/forgot-password',
        { email: emailForReset }
      )
      setMessage(res.data.msg || 'Password reset link sent to email')
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Something went wrong')
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 ">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end p-4">
        <img
          src={assets.login_img}
          alt="Login"
          className="w-full h-auto object-cover  shadow-md "
          style={{ maxWidth: '24rem' }}
        />
      </div>

      {/* Login Form Container */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg p-6 md:h-[70vh] ">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {forgotPassword
              ? 'Reset Password'
              : currentState === 'Login'
              ? 'Sign In'
              : 'Sign Up'}
          </h2>
          <hr className="border-none h-[1.5px] w-16 bg-gray-800 mx-auto mt-2" />
        </div>

        {forgotPassword ? (
          // Forgot Password Form
          <div className="flex flex-col w-full gap-4 mt-6">
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your email"
              onChange={(e) => setEmailForReset(e.target.value)}
              required
            />
            <button
              onClick={handleForgotPassword}
              className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-800 transition-all duration-300"
            >
              Send Reset Link
            </button>
            <p
              className="cursor-pointer text-blue-500 text-sm text-center"
              onClick={() => setForgotPassword(false)}
            >
              Back to Login
            </p>
          </div>
        ) : (
          // Login / Signup Form
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-full gap-4 mt-6"
          >
            {currentState === 'Sign Up' && (
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="Name"
                required
                onChange={handleChange}
              />
            )}

            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Email"
              required
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            {/* Forgot Password & Toggle Form */}
            <div className="flex justify-between text-sm text-gray-600">
              <p
                className="cursor-pointer hover:text-gray-800"
                onClick={() => setForgotPassword(true)}
              >
                Forgot your password?
              </p>
              <p
                onClick={() =>
                  setCurrentState(
                    currentState === 'Login' ? 'Sign Up' : 'Login'
                  )
                }
                className="cursor-pointer text-blue-500 hover:underline"
              >
                {currentState === 'Login' ? 'Create Account' : 'Login Here'}
              </p>
            </div>

            {/* Submit Button */}
            <button className="bg-gray-900 text-white font-medium px-4 py-2 mt-4 rounded-md hover:bg-gray-700 transition-all duration-300">
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>

            {message && (
              <p className="text-red-500 text-sm text-center mt-2">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginPage
