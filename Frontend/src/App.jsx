// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Home from './Pages/Home'
// import Collection from './Pages/Collection'
// import About from './Pages/About'
// import Contact from './Pages/Contact'
// import Product from './Pages/Product'
// import Orders from './Pages/Orders'
// import PlaceOrder from './Pages/placeOrder'
// import Navbar from './Components/Navbar'
// import Cart from './Pages/Cart'
// import Login from './Pages/Login'
// import Footer from './Components/Footer'
// import SearchBar from './Components/SearchBar'
// import Payment from './Components/Payment'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const App = () => {
//   return (
//     <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
//       <ToastContainer />
//       <Navbar />
//       <SearchBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Collection" element={<Collection />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="product/:productId" element={<Product />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/place-order" element={<PlaceOrder />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/Payment" element={<Payment />} />
//       </Routes>
//       <Footer />
//     </div>
//   )
// }

// export default App

import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Orders from './Pages/Orders'
import PlaceOrder from './Pages/placeOrder'
import Navbar from './Components/Navbar'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'
import Payment from './Components/Payment'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const location = useLocation() // Get current route

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
      {/* Conditionally render Footer except on Cart page */}
      {location.pathname !== '/cart' && <Footer />}
    </div>
  )
}

export default App
