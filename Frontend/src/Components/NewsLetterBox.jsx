import React, { useState } from 'react'

const NewsLetterBox = () => {
  const [result, setResult] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    setResult('Sending....')

    const formData = new FormData(event.currentTarget)
    formData.append('access_key', '353db92f-91da-4a66-a696-1e1c8eb88435')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data.success) {
      setResult('You Have Subscribed for 20% off')
      event.target.reset()
    } else {
      console.error('Error:', data)
      setResult(data.message)
    }
  }

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now and get 20% off 🎉
      </p>

      <form
        method="post"
        onSubmit={onSubmit}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter Your Email"
          required
          name="email"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
      <span>{result}</span>
    </div>
  )
}

export default NewsLetterBox
