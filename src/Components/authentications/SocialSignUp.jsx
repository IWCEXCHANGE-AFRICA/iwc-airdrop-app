import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Google as GoogleIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const SocialSignup = () => {
  // Handle Google signup
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google signup successful", user);
    } catch (error) {
      console.error("Error during Google signup", error);
    }
  };

  // Handle Facebook signup
  const handleFacebookSignup = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Facebook signup successful", user);
    } catch (error) {
      console.error("Error during Facebook signup", error);
    }
  };

  return (
    <Stack spacing={3} alignItems="center" sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Sign Up with Social Accounts
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignup}
        sx={{ width: "80%", textTransform: "none" }}
      >
        Continue with Google
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<FacebookIcon />}
        onClick={handleFacebookSignup}
        sx={{ width: "80%", textTransform: "none" }}
      >
        Continue with Facebook
      </Button>
    </Stack>
  );
};

export default SocialSignup;
