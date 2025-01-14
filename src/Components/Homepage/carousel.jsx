import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'

// Import local images
import logo1 from '../../Components/assets/logo.png'
import logo2 from '../../Components/assets/logo.png'
import logo3 from '../../Components/assets/logo.png'
import logo4 from '../../Components/assets/logo.png'
import logo5 from '../../Components/assets/logo.png'

const cardData = [
  {
    image: logo1,
    description: 'Welcome to IWC AIRDROP'
  },
  {
    image: logo2,
    description: 'Welcome to IWC AIRDROP'
  },
  {
    image: logo3,
    description: 'Welcome to IWC AIRDROP'
  },
  {
    image: logo4,
    description: 'Welcome to IWC AIRDROP'
  },
  {
    image: logo5,
    description: 'Welcome to IWC AIRDROP'
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
                height: '50vh',
                borderRadius: 2,
                border: 'none', // Explicitly remove border
                boxShadow: 3,
                '&:focus': { outline: 'none' } // Remove focus outline
              }}
            >
              <CardMedia
                component='img'
                height='200'
                image={card.image}
                alt={card.description}
              />
              <CardContent>
                <Typography variant='h5' component='div'>
                  {card.title || 'Default Title'}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default Slider
