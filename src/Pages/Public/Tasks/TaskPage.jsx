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
  const { tasks, loading } = useGetTasks();
  const { updateBalance, fetchBalance } = useBalance();
  const [startedTasks, setStartedTasks] = useState({}); // Track tasks that were started

  const filteredTasks = tasks.filter(
    (task) => task.category === TASK_CATEGORIES[selectedTab]
  );

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleStartTask = (task) => {
    setStartedTasks((prev) => ({ ...prev, [task.id]: true }));
    window.open(task.task_link, "_blank");
  };

  const handleClaimById = async (task) => {
    try {
      setLoadingTaskId(task.id);
      const response = await claimTask(task.id);
      console.log(response);
      if (response.success) {
        toast.success(response.data.message);
        updateBalance(task.task_point);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while claiming the task.");
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
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 100,
                    mb: 1,
                    width: "80px",
                    backgroundColor: startedTasks[task.id]
                      ? "#4CAF50"
                      : "#D0A106",
                    fontSize: "0.8rem",
                    "&:hover": { backgroundColor: "#80B400" }
                  }}
                  disabled={task.completed || loadingTaskId === task.id}
                  onClick={
                    startedTasks[task.id]
                      ? () => handleClaimById(task)
                      : () => handleStartTask(task)
                  }
                >
                  {loadingTaskId === task.id ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : startedTasks[task.id] ? (
                    "Claim"
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
