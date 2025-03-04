import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getAuthToken, removeAuthToken } from '../utils/auth'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      setUser(null)
    } else {
      axios
        .get('http://localhost:2000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data)
        })
        .catch(() => {
          removeAuthToken()
          setUser(null)
        })
    }
  }, [])

  const handleLogout = () => {
    removeAuthToken()
    // Redirect to home page after logout
    navigate('/')
  }

  return (
    <div
      className={`flex flex-col items-center mt-10 text-gray-800 p-4 rounded-md ${
        user ? 'bg-green-100' : 'bg-white'
      }`}
    >
      {user ? (
        <>
          <h2 className="text-3xl font-semibold">Profile</h2>
          <div className="mt-4">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-medium mt-4">
            Log in to browse cloths and make purchases.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-black text-white px-6 py-2 mt-4 rounded-md hover:bg-gray-800 transition-all"
          >
            Login/SignUp
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile
