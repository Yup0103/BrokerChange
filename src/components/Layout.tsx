import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  SwapHoriz as SwapIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationCenter from './NotificationCenter';

const DRAWER_WIDTH = 280;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      text: 'Client Search',
      icon: <PeopleIcon />,
      path: '/clients',
    },
    {
      text: 'Broker Change',
      icon: <SwapIcon />,
      path: '/broker-change',
    },
    {
      text: 'Request Tracking',
      icon: <AssignmentIcon />,
      path: '/requests',
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Brand */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            textAlign: 'center',
            letterSpacing: '-0.5px',
          }}
        >
          BrokerChange
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            display: 'block',
            mt: 0.5,
            fontWeight: 500,
          }}
        >
          Digital Platform
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, py: 2 }}>
        <Typography
          variant="overline"
          sx={{
            px: 3,
            py: 1,
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.5px',
          }}
        >
          Main Menu
        </Typography>
        
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    minHeight: 48,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                    '&:hover': {
                      backgroundColor: isSelected ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isSelected ? 'inherit' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isSelected ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            display: 'block',
            fontSize: '0.75rem',
          }}
        >
          POC Version 1.0
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            display: 'block',
            mt: 0.5,
            fontSize: '0.75rem',
          }}
        >
          © 2024 Demo Platform
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          elevation: 0,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Digital Broker Change Platform
          </Typography>

          {/* Notifications */}
          <IconButton 
            color="inherit" 
            sx={{ mr: 1 }}
            onClick={() => setNotificationOpen(true)}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile */}
          <IconButton color="inherit" sx={{ p: 0 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <AccountIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Notification Center */}
      <NotificationCenter 
        open={notificationOpen} 
        onClose={() => setNotificationOpen(false)} 
      />
    </Box>
  );
};

export default Layout;