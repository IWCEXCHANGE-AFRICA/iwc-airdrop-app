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
import Carousel from "../../../Components/carousel";
import { useClaimbyID } from "../../../Hooks/Claim";
import { native } from "../../../constants/colors";
import { useGetTasks } from "../../../Hooks/admin";
import { toast } from "react-toastify";
import { useBalance } from "../../../contexts/BalanceContext";
import { grey } from "../../../constants/colors";

const TASK_CATEGORIES = ["Basic", "Social", "Special"];

const DailyTasks = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const { claimTask } = useClaimbyID();
  const { tasks, loading, refetch } = useGetTasks();
  const { updateBalance, fetchBalance } = useBalance();
  const [startedTasks, setStartedTasks] = useState({});
  const [taskTimers, setTaskTimers] = useState({});

  const filteredTasks = tasks.filter(
    (task) => task.category === TASK_CATEGORIES[selectedTab]
  );

  useEffect(() => {
    fetchBalance();

    // Restore timers from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("startedTasks")) || {};
    const timers = {};

    Object.keys(storedTasks).forEach((taskId) => {
      const startTime = storedTasks[taskId];
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = Math.max(60 - elapsed, 0);

      if (remainingTime > 0) {
        timers[taskId] = remainingTime;
        setStartedTasks((prev) => ({ ...prev, [taskId]: true }));

        const interval = setInterval(() => {
          setTaskTimers((prev) => {
            if (prev[taskId] > 1) {
              return { ...prev, [taskId]: prev[taskId] - 1 };
            } else {
              clearInterval(interval);
              return { ...prev, [taskId]: 0 };
            }
          });
        }, 1000);
      }
    });

    setTaskTimers(timers);
  }, []);

  const handleStartTask = (task) => {
    const startTime = Date.now();
    setStartedTasks((prev) => ({ ...prev, [task.id]: true }));
    setTaskTimers((prev) => ({ ...prev, [task.id]: 60 }));

    // Store the start time in localStorage
    localStorage.setItem(
      "startedTasks",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("startedTasks") || "{}"),
        [task.id]: startTime
      })
    );

    const timer = setInterval(() => {
      setTaskTimers((prev) => {
        if (prev[task.id] > 1) {
          return { ...prev, [task.id]: prev[task.id] - 1 };
        } else {
          clearInterval(timer);
          return { ...prev, [task.id]: 0 };
        }
      });
    }, 1000);

    window.open(task.task_link, "_blank");
  };

  const handleClaimById = async (task) => {
    try {
      setLoadingTaskId(task.id);
      const response = await claimTask(task.id);
      if (response.success) {
        toast.success(response.data.message);
        updateBalance(task.task_point);
        await refetch();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while claiming the task.");
    } finally {
      setLoadingTaskId(null);
      localStorage.removeItem("startedTasks"); // Clear stored start time after claiming
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
                    backgroundColor: task.completed
                      ? "#808080"
                      : startedTasks[task.id]
                      ? taskTimers[task.id] > 0
                        ? "#FF5733"
                        : "#4CAF50"
                      : "#D0A106",
                    fontSize: "0.8rem",
                    "&:hover": { backgroundColor: "#80B400" }
                  }}
                  disabled={
                    task.completed || loadingTaskId === task.id
                  }
                  onClick={
                    startedTasks[task.id]
                      ? taskTimers[task.id] > 0
                        ? null // Do nothing while timer is running
                        : () => handleClaimById(task)
                      : () => handleStartTask(task)
                  }
                >
                  {loadingTaskId === task.id ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : task.completed ? (
                    "Claimed"
                  ) : startedTasks[task.id] ? (
                    taskTimers[task.id] > 0 ? (
                      `${taskTimers[task.id]}s`
                    ) : (
                      "Claim"
                    )
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
