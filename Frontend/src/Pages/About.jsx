import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../Components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[550px] rounded-lg"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col gap-6 justify-center md:w-2/4 text-gray-600">
          <p>
            Welcome to SK-SHOP, your one-stop destination for premium men's and
            women's clothing. We are committed to providing high-quality,
            trendy, and comfortable fashion that suits every style and occasion.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            At SK-SHOP, we prioritize quality, affordability, and customer
            satisfaction, ensuring a seamless shopping experience with secure
            payments, fast delivery, and 24/7 customer support. Whether you're
            looking for casual wear, formal outfits, or stylish essentials,
            we’ve got you covered!
          </p>
          <p>
            Join us and upgrade your wardrobe with the latest trends at
            unbeatable prices! 🛍️✨
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row test-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance 🏆</b>
          <p className="text-gray-600">
            We maintain high-quality standards by thoroughly inspecting every
            product before shipping. Our commitment ensures durability,
            authenticity, and customer satisfaction with every purchase.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience 🛍️</b>
          <p className="text-gray-600">
            Enjoy a seamless shopping experience with an intuitive interface,
            multiple payment options, and quick checkouts. We make online
            shopping fast, easy, and hassle-free.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Customer Support 📞</b>
          <p className="text-gray-600">
            Our dedicated support team is available 24/7 to assist with
            inquiries, orders, and returns. We prioritize customer satisfaction
            and ensure a smooth shopping experience.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
