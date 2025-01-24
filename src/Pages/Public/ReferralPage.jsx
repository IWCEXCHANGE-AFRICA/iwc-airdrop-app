import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  IconButton,
  Divider,
  CircularProgress
} from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useGetReferrals } from "../../Hooks/Claim";
import { toast } from "react-toastify";

const FriendsReward = () => {
  const user = useSelector((state) => state.user);
  const { refData, loading } = useGetReferrals();
  const referralCode = user?.username || "";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  const renderReferralCodeSection = () => (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        borderRadius: "12px",
        padding: 3,
        textAlign: "center"
      }}
    >
      <Typography variant="subtitle1" mb={2}>
        Your Referral Code
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          value={referralCode}
          InputProps={{
            readOnly: true,
            sx: {
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "5px",
              overflow: "hidden"
            }
          }}
          size="small"
          sx={{ width: "60%" }}
        />
        <IconButton onClick={handleCopyCode} sx={{ color: "#D0A106" }}>
          <CopyIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2" color="#888" mt={2}>
        Share this code with your friends to earn rewards!
      </Typography>
    </Box>
  );

  const renderFriendsList = () => {
    if (loading) {
      return (
        <CircularProgress
          color="secondary"
          sx={{ display: "block", marginX: "auto" }}
        />
      );
    }

    if (refData?.length === 0) {
      return (
        <Typography variant="body2" color="#888" textAlign="center">
          No friends invited yet
        </Typography>
      );
    }

    return (
      <Box>
        <Typography variant="subtitle1" mb={1}>
          Invited Friends
        </Typography>
        <Divider sx={{ backgroundColor: "#555", mb: 2 }} />
        {refData.map((friend, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 2,
              backgroundColor: "#1a1a1a",
              borderRadius: "10px",
              marginBottom: 1
            }}
          >
            <Typography variant="body1">{friend.name}</Typography>
            <Typography variant="body2" color="#D0A106">
              +{friend.point_balance} IWCP
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        opacity: 0.7,
        color: "#fff",
        padding: 3
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Invite friends to get more{" "}
        <span style={{ color: "#D0A106" }}>IWCP</span>
      </Typography>
      <Typography variant="body2" textAlign="center" color="#888" mb={3}>
        Use your referral code to invite and earn rewards
      </Typography>

      {renderReferralCodeSection()}

      <Box mt={4}>{renderFriendsList()}</Box>
    </Box>
  );
};

export default FriendsReward;
