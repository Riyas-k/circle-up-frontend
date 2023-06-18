import * as React from "react";
import { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PostAddIcon from "@mui/icons-material/PostAdd";

const SidebarOptions = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    link: "/admin",
  },
  {
    text: "View Users",
    icon: <GroupIcon />,
    link: "/admin/view-users",
  },
  {
    text: "View Posts",
    icon: <PostAddIcon />,
    link: "/admin/view-posts",
  },
];

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isSidebarOpen, closeSidebar, navigate }) => {
  return (
    <SwipeableDrawer
      anchor="left"
      open={isSidebarOpen}
      onClose={closeSidebar}
      onOpen={() => {}}
    >
      <Box
        sx={{ width: 240 }}
        role="presentation"
        onClick={closeSidebar}
        onKeyDown={closeSidebar}
      >
        <IconButton onClick={closeSidebar}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          {SidebarOptions.map((option, index) => (
            <ListItem
              button
              key={index}
              onClick={() => navigate(option.link)}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default Sidebar;
