import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container } from "@mui/material";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import Loading from "../../Loading";
import { blockUser, unblockUser } from "../../redux/userSlice";

const ViewUsersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("/admin/view-users");
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useLayoutEffect(() => {
    fetchAllUsers();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "To Logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-danger",
        cancelButton: "btn bg-success",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin");
        navigate("/admin/login");
      }
    });
  };

  const handleNavigate = (link) => {
    navigate(link);
  };

  const handleBlock = (userId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "To block!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "block",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-danger",
        cancelButton: "btn bg-success",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`/admin/block/${userId}`);
          const updatedUser = response.data.status;
          dispatch(blockUser({ userId, isBlock: updatedUser.isBlock }));
          await fetchAllUsers();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleUnblock = (userId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "To unblock!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "unblock",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-success",
        cancelButton: "btn bg-success",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`/admin/unblock/${userId}`);
          const updatedUser = response.data.status;
          dispatch(unblockUser({ userId, isBlock: updatedUser.isBlock }));
          await fetchAllUsers();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      {users.length === 0 ? (
        <Loading />
      ) : (
        <>
          <AdminHeader
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
          />
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
            navigate={handleNavigate}
          />
          <main>
            <Box sx={{ py: 4 }}>
              <Container maxWidth="md">
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    View Users
                  </Typography>
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ "@media (max-width: 600px)": { display: "none" } }}
                        >
                          No
                        </TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user, index) => (
                        <TableRow key={user._id}>
                          <TableCell
                            sx={{ "@media (max-width: 600px)": { display: "none" } }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell>{user.UserName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>

                          <TableCell align="center">
                            {user.isBlock ? (
                              <Button
                                variant="contained"
                                color={"success"}
                                onClick={() => handleUnblock(user._id)}
                              >
                                Un Block
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color={"error"}
                                onClick={() => handleBlock(user._id)}
                              >
                                Block
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </Box>
          </main>
        </>
      )}
    </>
  );
};

export default ViewUsersPage;
