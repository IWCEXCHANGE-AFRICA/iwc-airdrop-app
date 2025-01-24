import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CircularProgress,
  Button
} from "@mui/material";
import { useGetUsers } from "../../../Hooks/admin";

const Users = () => {
  const { users, loading } = useGetUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const usersPerPage = 15;

  // Pagination Logic
  useEffect(() => {
    if (users.length > 0) {
      const startIndex = (currentPage - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;
      setPaginatedUsers(users.slice(startIndex, endIndex));
    }
  }, [users, currentPage]);

  const handleNext = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "#333"
          }}
        >
          Users Management
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
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress color="secondary" />
                  </TableCell>
                </TableRow>
              ) : paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
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
                          ? "Active"
                          : user.status === 0
                          ? "Inactive"
                          : "Pending"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No registered users at the moment
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography variant="body2">
            Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          >
            Next
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Users;
