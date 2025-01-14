import React from 'react';
import Slider from "react-slick";
import { Box, Card, CardContent, Typography } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay interval to 3 seconds
    arrows: false, // Remove side arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const cardsData = [
    {
      title: "Daily Refresh Time",
      tasks: "Complete All Daily Tasks: 2/8",
      buttonLabel: "Claim Reward",
    },
    {
      title: "Check In",
      tasks: "Check-in Daily for Rewards",
      buttonLabel: "Claim Check-In",
    },
    {
      title: "Social Share",
      tasks: "Share and Like the Post",
      buttonLabel: "Earn Coins",
    },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Slider {...settings}>
        {cardsData.map((card, index) => (
          <Box 
            key={index} 
            sx={{
              padding: "0 10px",
              gap:4 // Add padding around each card
            }}
          >
            <Card
              sx={{
                backgroundColor: '#FFD700',
                color: '#000',
                borderRadius: 2,
                padding: 1,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {card.tasks}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#000',
                    color: '#FFD700',
                    textAlign: 'center',
                    padding: 1,
                    borderRadius: 1,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    mt: 2,
                  }}
                >
                  {card.buttonLabel}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselSection;
