import { useState } from "react";
import {
  Stack,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Paper,
  Button,
  Card,
  Box,
  Typography
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useGetTasks } from "../../../Hooks/admin";
import { toast } from "react-toastify";
import { grey } from "../../../constants/colors";

const Tasks = () => {
  const navigate = useNavigate();
  const { tasks, loading } = useGetTasks();

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        p: 4
      }}
    >
      <Card
        sx={{
          mt: 2,
          p: 2,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "bold", color: grey.default }}
        >
          Manage Tasks
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Link to="/dashboard/tasks/add" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Add Task
            </Button>
          </Link>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px"
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "secondary.main",
                "& th": { color: "white", fontWeight: "bold" }
              }}
            >
              <TableRow>
                <TableCell>Task Title</TableCell>
                <TableCell>Task Point</TableCell>
                <TableCell>Task Link</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress color="secondary" />
                  </TableCell>
                </TableRow>
              ) : tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "action.hover"
                      }
                    }}
                  >
                    <TableCell>{task.task_title}</TableCell>
                    <TableCell>{task.task_point}</TableCell>
                    <TableCell>{task.task_link}</TableCell>
                    <TableCell>{task.category}</TableCell>
                    <TableCell>
                      <Badge
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "12px",
                          backgroundColor:
                            task.status === 1 ? "success.light" : "error.light",
                          color:
                            task.status === 1 ? "success.main" : "error.main",
                          fontWeight: "bold"
                        }}
                      >
                        {task.status === 1 ? "Active" : "Disabled"}
                      </Badge>
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() =>
                            navigate(`/dashboard/tasks/edit`, {
                              state: { data: task }
                            })
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() =>
                            toast.error("Delete action not yet implemented")
                          }
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Tasks available at the moment
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Tasks;
