import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Tab,
  Tabs,
  CircularProgress
} from "@mui/material";
import { toast } from "react-toastify";
import Carousel from "../../../Components/carousel";
import { useClaimbyID } from "../../../Hooks/Claim";
import { useGetTasks } from "../../../Hooks/admin";
import { useBalance } from "../../../contexts/BalanceContext";
import { native, grey } from "../../../constants/colors";
import { formatTime, getRemainingTime } from "../../../utilities/functions";

const TASK_CATEGORIES = ["Basic", "Social", "Special"];

const DailyTasks = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const { claimTask } = useClaimbyID();
  const { tasks, loading, refetch } = useGetTasks();
  const { updateBalance } = useBalance();
  const [startedTasks, setStartedTasks] = useState({});
  const [taskTimers, setTaskTimers] = useState({});
  const [dailyTimers, setDailyTimers] = useState({});

  const filteredTasks = tasks.filter(
    (task) => task.category === TASK_CATEGORIES[selectedTab]
  );

  useEffect(() => {
    filteredTasks.forEach((task) => {
      if (task.lastclaimedtime) {
        const timeRemaining = task.lastclaimedtime ? getRemainingTime(task.lastclaimedtime, 86400) : 0;
        setDailyTimers((prev) => ({
          ...prev,
          [task.id]: timeRemaining
        }));
      }
    });
  }, [loading]);
  
  // Handle starting a task
  const handleStartTask = (task) => {
    const startTime = Date.now();
    setStartedTasks((prev) => ({ ...prev, [task.id]: true }));
    setTaskTimers((prev) => ({ ...prev, [task.id]: 30 }));

    // Store start time in localStorage
    localStorage.setItem(
      "startedTasks",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("startedTasks") || "{}"),
        [task.id]: startTime
      })
    );

    // Countdown timer
    const interval = setInterval(() => {
      setTaskTimers((prev) => {
        if (prev[task.id] > 1) {
          return { ...prev, [task.id]: prev[task.id] - 1 };
        } else {
          clearInterval(interval);
          return { ...prev, [task.id]: 0 };
        }
      });
    }, 1000);

    if (task.task_duration !== "daily") {
      window.open(task.task_link, "_blank");
    }
  };

  // Handle claiming a task
  const handleClaimById = async (task) => {
    try {
      setLoadingTaskId(task.id);
      const response = await claimTask(task.id);

      if (response.success) {
        toast.success(response.data.message);
        updateBalance(task.task_point);

        await refetch();
      } else {
        toast.error(response.error || "Failed to claim the task.");
      }
    } catch (error) {
      toast.error("An error occurred while claiming the task.");
      console.error(error);
    } finally {
      setLoadingTaskId(null);
    }
  };

  return (
    <Box>
      <Box sx={{ position: "relative", zIndex: 2, mt: 5 }}>
        <Carousel />
      </Box>

      <Box sx={{ position: "relative", zIndex: 2, mt: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          variant="fullWidth"
          aria-label="task categories"
          sx={{ marginBottom: 1, pb: 1 }}
        >
          {TASK_CATEGORIES.map((category, index) => (
            <Tab
              key={index}
              label={category}
              sx={{
                color: "gray",
                "&.Mui-selected": { color: native.primary }
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, zIndex: 2 }}>
        <Box
          sx={{
            backgroundColor: grey.default,
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
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", fontWeight: 300, fontSize: 12 }}
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
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 100,
                    mb: 1,
                    width: "80px",
                    backgroundColor: task.task_duration !== "daily" && task.completed
                      ? "#808080"
                      : dailyTimers[task.id] > 0
                      ? "#FF5733"
                      : startedTasks[task.id]
                      ? dailyTimers[task.id] > 0
                        ? "#FF5733"
                        : "#4CAF50"
                      : "#D0A106",
                    fontSize: "0.8rem",
                    "&:hover": { backgroundColor: "#80B400" }
                  }}
                  disabled={
                    loadingTaskId === task.id ||
                    dailyTimers[task.id] > 0
                  }
                  onClick={() =>
                    startedTasks[task.id]
                      ? taskTimers[task.id] > 0
                        ? null
                        : handleClaimById(task)
                      : handleStartTask(task)
                  }
                >
                {console.log(task, dailyTimers[task.id])}
                  {loadingTaskId === task.id ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : task.task_duration !== "daily" && task.completed ? (
                    "Claimed"
                  ) : startedTasks[task.id] ? (
                    taskTimers[task.id] > 0 ? (
                      "Checking..."
                    ) : (
                      "Claim"
                    )
                  ) : dailyTimers[task.id] > 0 ? formatTime(dailyTimers[task.id],true) : (
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
