import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const slides = [
    {
      image: assets.hero_img,
      title: 'Latest Arrivals',
      subtitle: 'New Collection',
    },
    {
      image: assets.hero_img2,
      title: 'Exclusive Deals',
      subtitle: 'Best Offers for You',
    },
    {
      image: assets.hero_img3,
      title: 'Trending Styles',
      subtitle: 'Stay in Fashion',
    },
    {
      image: assets.hero_img4,
      title: 'Hot Picks',
      subtitle: 'Must-Have Products',
    },
    {
      image: assets.hero_img5,
      title: 'Limited Edition',
      subtitle: 'Grab Before It’s Gone',
    },
  ]

  return (
    <div className="w-full h-[80vh] overflow-hidden relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative w-full h-full flex items-center justify-center"
          >
            {isMobile ? (
              <>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: activeIndex === index ? 1 : 0 }}
                />

                <div
                  className={`relative text-white text-center px-6 transition-opacity duration-1000 ${
                    activeIndex === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-5'
                  }`}
                >
                  <div className="bg-black bg-opacity-40 px-4 py-3 rounded-md">
                    <h1 className="text-3xl sm:text-4xl font-bold py-2 text-white drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-gray-300">{slide.subtitle}</p>
                    <div className="flex items-center gap-2 mt-3 justify-center">
                      <p className="font-semibold text-sm">SHOP NOW</p>
                      <p className="w-8 h-[1px] bg-white"></p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row items-center h-[80vh]">
                {/* Text Section */}
                <div
                  className={`w-full sm:w-[40%] flex items-center justify-center px-6 sm:px-12 transition-opacity duration-1000 ${
                    activeIndex === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-5'
                  }`}
                >
                  <div className="text-[#414141] max-w-[400px] text-center sm:text-left">
                    <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-gray-600">{slide.subtitle}</p>
                    <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                      <p className="font-semibold text-sm">SHOP NOW</p>
                      <p className="w-8 h-[1px] bg-[#414141]"></p>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full sm:w-[60%] flex justify-end items-center">
                  <img
                    className="h-[80vh] object-cover transition-opacity duration-1000"
                    style={{ opacity: activeIndex === index ? 1 : 0 }}
                    src={slide.image}
                    alt={slide.title}
                  />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Hero
