//import { useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
//import { List, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Button, Modal } from "@mui/material";
//import { sidebarLinks } from "../../data/sidebarLinks";
//import SidebarLink from "./sidebarlink";
//import { logout } from "../../services/operations/authAPI";
//
//export default function Sidebar() {
//  const { user, loading: profileLoading } = useSelector((state) => state.profile);
//  const { loading: authLoading } = useSelector((state) => state.auth);
//  const dispatch = useDispatch();
//  const navigate = useNavigate();
//
//  if (profileLoading || authLoading) {
//    // Placeholder for your loading state
//    return <div>Loading...</div>;
//  }
//
//  const handleLogoutClick = () => {
//   dispatch(logout(navigate));
//
//  };
//
//  return (
//    <>
//      <Box
//        sx={{
//          height: 'calc(100vh - 3.5rem)',
//          minWidth: '220px',
//          borderRight: '1px solid',
//          borderColor: 'grey.700',
//          backgroundColor: 'grey.800',
//          py: 3,
//          display: 'flex',
//          flexDirection: 'column',
//          justifyContent: 'space-between',
//        }}
//      >
//        <List>
//          {sidebarLinks.map((link) => {
//            if (link.type && user?.accountType !== link.type) {
//              return null;
//            }
//            return (
//              <SidebarLink key={link.id} link={link} iconName={link.icon} />
//            );
//          })}
//        </List>
//        <Box sx={{ mx: 'auto', my: 2, height: '1px', width: '80%', bgcolor: 'grey.700' }} />
//        <List>
//          <ListItemButton onClick={handleLogoutClick}>
//            <ListItemIcon>
//              Logout
//            </ListItemIcon>
//            <ListItemText primary="Logout" />
//          </ListItemButton>
//        </List>
//      </Box>
//
//
//    </>
//  );
//}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {sidebarLinks} from "../../data/sidebarLinks";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate,NavLink} from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (profileLoading || authLoading) {
      return <div>Loading...</div>;
    }
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleLogoutClick = () => {
    dispatch(logout(navigate));

  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {sidebarLinks
          .filter((item) => !item.type || user?.accountType === item.type)
          .map((item) => (
            <NavLink key={item.id} to={item.path} >
              <ListItem key={item.id} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogoutClick}>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {sidebarLinks
              .filter((item) => !item.type || user?.accountType === item.type) // Filter out items that don't match the condition
              .map((item) => (
                <NavLink key={item.id} to={item.path} >
                  <Button key={item.id} sx={{ color: '#fff' }}>
                    {item.name}
                  </Button>
                </NavLink>

              ))}
            <Button sx={{ color: '#fff' }} onClick={handleLogoutClick}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

    </Box>
  );
}


export default DrawerAppBar;