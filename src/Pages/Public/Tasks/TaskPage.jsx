import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Tab,
  Tabs,
  CircularProgress
} from "@mui/material";
import Carousel from "../../../Components/Homepage/carousel";
import { useClaimbyID } from "../../../Hooks/Claim";
import { native } from "../../../constants/colors";
import { useGetTasks } from "../../../Hooks/admin";

const TASK_CATEGORIES = ["Basic", "Social", "Special"];

const DailyTasks = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { claimTask } = useClaimbyID();
  const { tasks, loading } = useGetTasks();

  const filteredTasks = tasks.filter(
    (task) => task.category === TASK_CATEGORIES[selectedTab]
  );

  return (
    <Box>
      {/* Carousel Section */}
      <Box sx={{ position: "relative", zIndex: 2, mt: 5 }}>
        <Carousel />
      </Box>

      {/* Tabs Section */}
      <Box sx={{ position: "relative", zIndex: 2, mt: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          variant="fullWidth"
          aria-label="task categories"
          sx={{ marginBottom: 1, pb: 1 }}
        >
          {TASK_CATEGORIES.map((category) => (
            <Tab
              key={category}
              label={category}
              sx={{
                color: "gray",
                "&.Mui-selected": { color: native.primary }
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Task List Section */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, zIndex: 2 }}>
        <Box
          sx={{
            backgroundColor: "#1a1a1a",
            opacity: 0.9,
            borderRadius: 2,
            p: 2,
            textAlign: "center"
          }}
        >
          {loading ? (
            <CircularProgress
              color="secondary"
              sx={{ display: "block", marginX: "auto", my: 3 }}
            />
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Stack
                key={task.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mt: 1,
                  mb: 1,
                  width: "100%",
                  borderBottom: "1px solid green"
                }}
              >
                {/* Task Title and Reward */}
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5
                    }}
                  >
                    {task.task_title}
                    <Box
                      component="span"
                      sx={{
                        ml: 0.5,
                        fontSize: "0.8rem",
                        color: "#D0A106",
                        fontWeight: "bold"
                      }}
                    >
                      +{task.task_point}
                    </Box>
                  </Box>
                </Typography>
                {/* Claim Button */}
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 100,
                    mb: 1,
                    width: "80px",
                    backgroundColor: task.claimed ? "#4CAF50" : "#D0A106",
                    fontSize: "0.8rem",
                    "&:hover": { backgroundColor: "#FFC107" }
                  }}
                  disabled={task.claimed}
                  onClick={() => claimTask(task.id)}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Start"
                  )}
                </Button>
              </Stack>
            ))
          ) : (
            <Typography color="gray">No tasks available.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DailyTasks;
