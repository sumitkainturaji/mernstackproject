import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../Components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
         <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'> 
         <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
         <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-600'>
           <p>Ecommerce Website Builders Several platforms, such as Shopify, Wix, and Squarespace, offer all-in-one solutions for building and managing ecommerce websites.:</p>
           <p>A well-designed ecommerce website is crucial for building trust, driving sales, and establishing a strong online presence.</p>
           <b className='text-gray-800'>Our Mission</b>
           <p>By incorporating essential components, best practices, and leveraging ecommerce website builders, you can create a successful online store that meets the needs of your customers and grows your business.</p>
         </div>
      </div>
      
         <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
         </div>

         <div className='flex flex-col md:flex-row test-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b>Quality Assurance:</b>
             <p className='text-gray-600' >Ecommerce Website Builders Several platforms, such as Shopify, Wix, and Squarespace, offer all-in-one solutions for building and managing</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b>Convenience:</b>
             <p className='text-gray-600' >Ecommerce Website Builders Several platforms, such as Shopify, Wix, and Squarespace, offer all-in-one solutions for building and managing</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b>Eceptional Customer Service:</b>
             <p className='text-gray-600' >Ecommerce Website Builders Several platforms, such as Shopify, Wix, and Squarespace, offer all-in-one solutions for building and managing</p>
          </div>
         </div>

         <NewsLetterBox/>

    </div>
  )
}

export default About