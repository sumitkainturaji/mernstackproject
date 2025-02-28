import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate() // 🔹 Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
        localStorage.setItem('authToken', res.data.token)
        navigate('/')
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Something went wrong')
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? null : (
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required={currentState !== 'Login'}
          onChange={handleChange}
        />
      )}

      <input
        type="email"
        name="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        onChange={handleChange}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      {message && <p className="text-black-500 mt-2">{message}</p>}
    </form>
  )
}

export default Login
