import { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Typography,
  Container,
  FormHelperText,
  CircularProgress,
  Paper,
  Box
} from "@mui/material";
import { useStoreTasks } from "../../../Hooks/admin";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    task_title: "",
    task_link: "",
    task_point: "",
    task_code: "",
    task_description: "",
    status: "",
    task_duration: ""
  });

  const { storeTask, loading } = useStoreTasks();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.task_title) newErrors.task_title = "Task Title is required";
    if (!formData.task_point) newErrors.task_point = "Task Points are required";
    if (!formData.task_duration)
      newErrors.task_duration = "Task Interal is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const tasks = {
        category: String(formData.category),
        task_title: formData.task_title,
        task_link: formData.task_link,
        task_description: formData.task_description,
        task_code: Number(formData.task_code),
        task_point: Number(formData.task_point),
        status: formData.status ? 1 : 2,
        task_duration: String(formData.task_duration)
      };
      console.log(tasks);
      const response = await storeTask(tasks);
      console.log("response:", response);
    } catch (err) {
      console.error("Error submitting task:", err);
    }
    setErrors({});
  };

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          p: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Typography variant="h5" mb={2} fontWeight="bold">
          Add New Task
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={3}>
            {/* Category Field */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Special">Special</MenuItem>
                  <MenuItem value="Social">Social</MenuItem>
                </Select>
                <FormHelperText>{errors.category}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Task Field */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.task_duration}>
                <InputLabel id="task_duration-label">Interval</InputLabel>
                <Select
                  labelId="task_duration-label"
                  name="task_duration"
                  value={formData.task_duration}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="one-time">Once</MenuItem>
                </Select>
                <FormHelperText>{errors.task_duration}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Task Title Field */}
            <Grid item xs={12}>
              <TextField
                label="Task Title"
                name="task_title"
                fullWidth
                value={formData.task_title}
                onChange={handleChange}
                error={!!errors.task_title}
                helperText={errors.task_title}
              />
            </Grid>

            {/* Task Link Field */}
            <Grid item xs={12}>
              <TextField
                label="Task Link (Optional)"
                name="task_link"
                fullWidth
                value={formData.task_link}
                onChange={handleChange}
                type="uri"
              />
            </Grid>

            {/* Task Code Field */}
            <Grid item xs={12}>
              <TextField
                label="Task Code (Optional)"
                name="task_code"
                fullWidth
                value={formData.task_code}
                onChange={handleChange}
                type="number"
              />
            </Grid>

            {/* Task Description Field */}
            <Grid item xs={12}>
              <TextField
                label="Task Description (Optional)"
                name="task_description"
                fullWidth
                multiline
                rows={4}
                value={formData.task_description}
                onChange={handleChange}
              />
            </Grid>

            {/* Task Points Field */}
            <Grid item xs={12}>
              <TextField
                label="Task Points"
                name="task_point"
                type="number"
                fullWidth
                value={formData.task_point}
                onChange={handleChange}
                error={!!errors.task_point}
                helperText={errors.task_point}
              />
            </Grid>

            {/* Status Field */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status (Optional)</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="2">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  mt: 2
                }}
                onClick={handleSubmit}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add Task"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskForm;
