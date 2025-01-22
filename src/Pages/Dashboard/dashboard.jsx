import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TableCell,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableHead,
  Paper,
  Card,
  Tooltip,
  IconButton,
  Button,
  CircularProgress
} from "@mui/material";
import SummaryCards from "../../Components/Dashboard/SummaryCards";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useGetUsers } from "../../Hooks/admin";

const IwcAirdropDashboard = () => {
  const { fetchUsers, users, data, loading } = useGetUsers();
  const [visibleUsers, setVisibleUsers] = useState(10);

  const handleViewMore = () => {
    setVisibleUsers((prev) => prev + 10); // Increment visible users by 10
  };

  return (
    <Box
      sx={{
        backgroundColor: "#E6E6FA", // Improved contrast
        color: "black", // Changed to black for better readability
        p: 5
      }}
    >
      <Typography variant="h4" color="rgb(42, 27, 8)" gutterBottom>
        IWC Airdrop Dashboard
      </Typography>

      {/* Summary Cards Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SummaryCards title="Total Participants" value={users.length} />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCards title="Total Points" value={data.total_points} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCards title="Eligible Participants" value={users.length} />
        </Grid>
      </Grid>

      {/* Participants Table Section */}
      <Card
        sx={{
          mt: 2,
          p: 2,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "#333"
          }}
        >
          Participants
        </Typography>

        {/* Users Table */}
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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress color="secondary" />
                  </TableCell>
                </TableRow>
              ) : users.length > 0 ? (
                users.slice(0, visibleUsers).map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f1f1f1"
                      }
                    }}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.decrypted_balance}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            user.status === 1
                              ? "green"
                              : user.status === 0
                              ? "red"
                              : "orange",
                          fontWeight: "bold"
                        }}
                      >
                        {user.status === 1
                          ? "active"
                          : user.status === 0
                          ? "inactive"
                          : "pending"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton color="primary">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton color="success">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No registered user at the moment
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* View More Button */}
        {users.length > visibleUsers && (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewMore}
            >
              View More
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default IwcAirdropDashboard;
