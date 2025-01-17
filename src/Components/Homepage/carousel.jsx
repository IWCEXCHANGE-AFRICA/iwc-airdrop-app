import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'

// Import local images
import logo1 from "../../../src/assets/logo.png"

const cardData = [
  {
    image: logo1
  },
  {
    image: logo1
  },
  {
    image: logo1
  },
  {
    image: logo1
  },
  {
    image: logo1
  }
]

const Slider = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} // Space between slides
        autoplay={{ delay: 3000 }}
        loop
        breakpoints={{
          // Breakpoint for small screens (mobile)
          0: {
            slidesPerView: 1 // Show 1 slide for screens 0px or more
          },
          // Breakpoint for medium screens (tablets)
          600: {
            slidesPerView: 2 // Show 2 slides for screens 600px or more
          },
          // Breakpoint for large screens (desktops)
          900: {
            slidesPerView: 4 // Show 4 slides for screens 900px or more
          }
        }}
      >
        {cardData.map((card, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                width: '100%',
                height: '20vh', // Maintain height of the card
                borderRadius: 2,
                border: 'none', // Explicitly remove border
                boxShadow: 3,
                '&:focus': { outline: 'none' } // Remove focus outline
              }}
            >
              <CardMedia
                component='img'
                sx={{
                  width: '100%', // Make sure the image spans the full width
                  height: '100%', // Make sure the image spans the full height
                  objectFit: 'cover', // Ensures the image covers the card without distortion
                  borderRadius: 'inherit' // Matches the card's border radius for seamless edges
                }}
                image={card.image}
                alt={card.description}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default Slider
