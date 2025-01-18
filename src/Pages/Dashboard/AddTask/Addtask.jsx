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
  CircularProgress
} from "@mui/material";
import { useStoreTasks } from "../../../Hooks/admin";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    task_title: "",
    task_link: "",
    task_point: "",
    task_description: "",
    status: ""
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
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const tasksInfo = { formData };
      const response = await storeTask(tasksInfo);
      console.log("Login successful:", response);
    } catch (err) {
      console.error("Login error:", err);
    }
    setErrors({});
    setFormData({
      category: "",
      task_title: "",
      task_link: "",
      task_point: "",
      task_description: "",
      status: ""
    });
  };

  const fieldStyles = {
    width: "100%", // All fields take full width of the form container
    height: "40px" // Reduced height for compact fields
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Task
      </Typography>
      <Grid container spacing={2}>
        {/* Category Field */}
        <Grid item xs={12}>
          <TextField
            label="Category"
            name="category"
            fullWidth
            value={formData.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
          />
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
            error={!!errors.task_link}
            helperText={errors.task_link}
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
            error={!!errors.task_description}
            helperText={errors.task_description}
          />
        </Grid>

        {/* Task Points Field */}
        <Grid item xs={12}>
          <TextField
            label="Task Points"
            name="task_point"
            fullWidth
            type="number"
            value={formData.task_point}
            onChange={handleChange}
            error={!!errors.task_point}
            helperText={errors.task_point}
          />
        </Grid>

        {/* Status Field */}
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.status} sx={fieldStyles}>
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
            <FormHelperText>{errors.status}</FormHelperText>
          </FormControl>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: "40px", mt: 4 }}
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Add Task"
            )}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskForm;
