// import React from 'react'
// import { assets } from '../assets/frontend_assets/assets'

// const Footer = () => {
//   return (
//     <div>
//       <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-base">
//         <div>
//           <img src={assets.logo} className="mb-5 w-28" alt="Logo" />
//           <p className="w-full md:w-2/3 text-gray-600 ">
//             At <span className="font-semibold">SK Shop</span> , we are dedicated
//             to delivering quality products and an exceptional shopping
//             experience. Our mission is to combine style, comfort, and innovation
//             in every piece we offer.
//           </p>
//         </div>

//         <div>
//           <p className="text-xl font-medium mb-5">COMPANY</p>
//           <ul className="flex flex-col gap-1 text-gray-600">
//             <li>Home</li>
//             <li>About Us</li>
//             <li>Delivery</li>
//             <li>Privacy Policy</li>
//             <li>FAQs</li>
//             <li>Careers</li>
//           </ul>
//         </div>

//         <div>
//           <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
//           <ul className="flex flex-col gap-1 text-gray-600">
//             <li>+91-6395734863</li>
//             <li>sumitkaintura@gmail.com</li>
//             <li>
//               <span>Follow Us: </span>
//               <a
//                 href="https://www.facebook.com/sumit.kaintura.56"
//                 className="text-blue-600 hover:underline"
//               >
//                 Facebook
//               </a>{' '}
//               |{' '}
//               <a
//                 href="https://x.com/james_kim87"
//                 className="text-blue-600 hover:underline"
//               >
//                 Twitter
//               </a>{' '}
//               |{' '}
//               <a
//                 href="https://www.instagram.com/sumit__kaintura/"
//                 className="text-blue-600 hover:underline"
//               >
//                 Instagram
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div>
//         <hr />
//         <p className="py-5 text-sm text-center">
//           © 2025 SK Shop - All Rights Reserved.
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Footer

import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  const location = useLocation()

  const handleNavigation = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-base">
        <div>
          <img src={assets.logo} className="mb-5 w-28" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            At <span className="font-semibold">SK Shop</span>, we are dedicated
            to delivering quality products and an exceptional shopping
            experience. Our mission is to combine style, comfort, and innovation
            in every piece we offer.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <NavLink
                to="/"
                className="hover:underline"
                onClick={(e) => handleNavigation(e, '/')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:underline"
                onClick={(e) => handleNavigation(e, '/about')}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="hover:underline"
                onClick={(e) => handleNavigation(e, '/contact')}
              >
                Contact
              </NavLink>
            </li>
            <li>FAQs</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-6395734863</li>
            <li>sumitkaintura@gmail.com</li>
            <li>
              <span>Follow Us: </span>
              <a
                href="https://www.facebook.com/sumit.kaintura.56"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>{' '}
              |{' '}
              <a
                href="https://x.com/james_kim87"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>{' '}
              |{' '}
              <a
                href="https://www.instagram.com/sumit__kaintura/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © 2025 SK Shop - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
