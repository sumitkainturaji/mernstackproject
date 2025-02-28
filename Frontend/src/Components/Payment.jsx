import { useState, useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import toast, { Toaster } from 'react-hot-toast'
import { assets } from '../assets/frontend_assets/assets'
export default function PaymentCard() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

  const totalAmount = getCartAmount() + delivery_fee

  const [amount, setAmount] = useState(totalAmount)

  const handleInputChange = (e) => {
    const value = e.target.value

    if (/^\d*\.?\d*$/.test(value)) {
      if (parseFloat(value) <= 10000000 || value === '') {
        setAmount(value) //
      } else {
        toast.error('Amount cannot exceed ₹10,000,000.')
      }
    }
  }

  const handlePayment = async () => {
    const numericAmount = parseFloat(amount)

    if (!numericAmount || numericAmount <= 0) {
      toast.error('Please enter a valid amount greater than 0.')
      return
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            amount: numericAmount,
          }),
        }
      )

      const data = await res.json()
      console.log(data)
      handlePaymentVerify(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: 'Sumit',
      description: 'Test Mode',
      order_id: data.id,
      handler: async (response) => {
        console.log('response', response)
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`,
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          )

          const verifyData = await res.json()

          if (verifyData.message) {
            toast.success(verifyData.message)
          }
        } catch (error) {
          console.log(error)
        }
      },
      theme: {
        color: '#5f63b8',
      },
    }
    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{
        backgroundImage: 'linear-gradient(60deg, #45d1dc 0%, #5b86e5 80%)',
      }}
    >
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm mx-4 md:mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className=" text-white rounded-full w-24 h-24 flex items-center justify-center text-lg font-bold"></div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <h2 className="mt-4 text-lg font-semibold">Paying to</h2>
          <p className="text-gray-700 text-center">SK Shop</p>
          <p className="text-sm text-gray-500"></p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-2xl font-bold">
            {currency}
            {amount || '0'}
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={handlePayment}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Pay {currency}
            {amount || '0'}
          </button>
        </div>
      </div>
    </div>
  )
}
