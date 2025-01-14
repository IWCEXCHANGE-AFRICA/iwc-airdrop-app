import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import logo from "../assets/logo.png"; // Adjust path as necessary

const ImageCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        textAlign: "center",
        mb: 5,
        bgcolor: "black",
        borderRadius: 2, // Optional: Add rounded corners
        color: "white", // Text color for dark background
      }}
    >
      <CardMedia
        component="img"
        alt="Example Image"
        image={logo}
        sx={{
          objectFit: "cover",
          height: 100,
          width: 100,
          margin: "16px auto", // Center the image
          borderRadius: "50%", // Make the image circular
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          Example Title
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: "gray" }}>
          This is some example text below the image in the card.
          You can customize this to fit your content.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
