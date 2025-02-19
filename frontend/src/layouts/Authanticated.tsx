import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useLogoutMutation } from "../services/api";
import { useAppSelector } from "../store/store";
import { motion } from "framer-motion";

export default function Navbar() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    handleMenuClose();
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #1A237E, #7B1FA2)",
          boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              transition: "0.3s",
              "&:hover": { color: "#FFD700", transform: "scale(1.1)" },
            }}
          >
            ChatSphere
          </Typography>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {isAuthenticated ? (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/groups">Groups</NavLink>
                <NavLink to="/invitations">Invitations</NavLink>
                <NavLink to="/contact-us">Contact</NavLink>
                <NavLink to="/policy">Policy</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </Box>

          {/* Profile Dropdown */}
          {isAuthenticated && (
            <Box>
              <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                  "& .MuiPaper-root": {
                    background: "linear-gradient(135deg, #1A237E, #7B1FA2)",
                    color: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                {/* <MenuItem
                  component={Link}
                  to="/profile"
                  sx={{
                    "&:hover": { background: "#FFD700", color: "black" },
                  }}
                >
                  Profile
                </MenuItem> */}
                <Divider />
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    "&:hover": { background: "#FFD700", color: "black" },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiPaper-root": {
            background: "linear-gradient(135deg, #1A237E, #7B1FA2)",
            color: "#fff",
            width: "250px",
          },
        }}
      >
        <List>
          {isAuthenticated ? (
            <>
              <MobileNavItem to="/">Home</MobileNavItem>
              <MobileNavItem to="/profile">Profile</MobileNavItem>
              <MobileNavItem to="/users">Users</MobileNavItem>
              <MobileNavItem to="/groups">Groups</MobileNavItem>
              <MobileNavItem to="/invitations">Invitations</MobileNavItem>
              <MobileNavItem to="/contact-us">Contact</MobileNavItem>
              <MobileNavItem to="/policy">Policy</MobileNavItem>
              <Divider sx={{ bgcolor: "#FFD700" }} />
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" sx={{ textAlign: "center", "&:hover": { color: "#FFD700" } }} />
              </ListItem>
            </>
          ) : (
            <>
              <MobileNavItem to="/login">Login</MobileNavItem>
              <MobileNavItem to="/register">Register</MobileNavItem>
            </>
          )}
        </List>
      </Drawer>

      <Outlet />
    </Box>
  );
}

/* NavLink Component with Smooth Animations */
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Typography
        component={Link}
        to={to}
        sx={{
          textDecoration: "none",
          color: "#fff",
          fontSize: "1.1rem",
          fontWeight: "500",
          transition: "0.3s",
          "&:hover": { color: "#FFD700" },
        }}
      >
        {children}
      </Typography>
    </motion.div>
  );
};

/* MobileNavItem Component */
const MobileNavItem = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <ListItem button component={Link} to={to}>
      <ListItemText primary={children} sx={{ textAlign: "center", "&:hover": { color: "#FFD700" } }} />
    </ListItem>
  );
};
