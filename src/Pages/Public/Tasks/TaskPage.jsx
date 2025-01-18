import { useState } from "react";
import { Box, Button, Typography, Stack, Tab, Tabs } from "@mui/material";
import logoImage from "../../../../src/assets/logo.png";
import Carousel from "../../../Components/Homepage/carousel";
import { useClaimbyID } from "../../../Hooks/Claim";
import { native } from "../../../constants/colors";

const DailyTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      category: "Basic",
      title: "Daily Check-in",
      reward: "+1M",
      description: "Log in daily to claim your reward.",
      claimed: false
    },
    {
      id: 2,
      category: "Social",
      title: "Tap Tap Tripps",
      reward: "+50K",
      description: "Play Tap Tap Tripps to earn coins.",
      claimed: false
    },
    {
      id: 3,
      category: "Social ",
      title: "Like the tweet",
      reward: "+10K",
      description: "Like and retweet the provided tweet.",
      claimed: false
    },
    {
      id: 4,
      category: "Social",
      title: "Comment tweet",
      reward: "+20K",
      description: "Retweet and comment on the tweet.",
      claimed: false
    },
    {
      id: 5,
      category: "Social",
      title: "Share a Post",
      reward: "+10K",
      description: "Share and react to the social media post.",
      claimed: false
    },
    {
      id: 6,
      category: "Basic",
      title: "Daily Check-in",
      reward: "+1M",
      description: "Log in daily to claim your reward.",
      claimed: false
    },
  ]);

  const [selectedTab, setSelectedTab] = useState(0);
  const { claimTask } = useClaimbyID();

  const handleClaim = async (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, claimed: "pending" } // Mark as pending while waiting
          : task
      )
    );

    try {
      const userData = { taskId }; // Replace with actual user data
      const { success } = await claimTask(userData);

      if (success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? { ...task, claimed: true } // Mark as successfully claimed
              : task
          )
        );
      }
    } catch (error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, claimed: false } // Reset the task if an error occurs
            : task
        )
      );
      console.error("Error claiming task:", error);
    }
  };

  const filteredTasks = tasks.filter(
    (task) => task.category === ["Basic", "Social"][selectedTab]
  );

  return (
    <Box>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Carousel />
      </Box>

      {/* Tabs Section */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          indicatorColor="#FFC107"
          textColor="#fff"
          color="#fff"
          variant="fullWidth"
          aria-label="task categories"
          sx={{
            marginBottom: 1,
            justifyContent: "center",
            alignItems: "center",
            pb: 1,
            "& .MuiTab-root": {
              color: "gray" // Inactive tab color
            },
            "& .Mui-selected": {
              color: native.primary // Active tab color
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "yellow"
            }
          }}
        >
          <Tab label="Basic" />
          <Tab label="Social" />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 2 // Ensure tasks are above overlay and other background elements
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1a1a1a",
            opacity: 0.6,
            borderRadius: 2,
            padding: 1.5,
            alignItems: "center",
            height: "auto",
            overflow: "hidden",
            textAlign: "center",
            zIndex: 2
          }}
        >
          {filteredTasks.map((task) => (
            <Stack
              key={task.id}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                mt: 1,
                mb:1,
                width: "100%",
                borderBottom: "1px solid green"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ fontSize: "0.9rem", color: "#fff" }}>
                  {task.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="gold"
                  sx={{
                    fontSize: "0.5rem",
                    marginLeft: 0.5
                  }} // Add a small margin between title and reward
                >
                  {task.reward}
                </Typography>
              </Box>

              <Button
                variant="contained"
                sx={{
                  borderRadius: 100,
                  mb:1,
                  width: "70px",
                  backgroundColor:
                    task.claimed === "pending"
                      ? "#FFD700"
                      : task.claimed
                      ? "#4CAF50"
                      : "#DOA106",
                  fontSize: "0.8rem",
                  "&:hover": {
                    backgroundColor:
                      task.claimed === "pending"
                        ? "#FFC107"
                        : task.claimed
                        ? "#388E3C"
                        : "#FFC107"
                  }
                }}
                onClick={() => handleClaim(task.id)}
                disabled={task.claimed === "pending" || task.claimed}
              >
                {task.claimed === "pending"
                  ? "Claiming..."
                  : task.claimed
                  ? "Claimed"
                  : "Claim"}
              </Button>
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DailyTasks;
