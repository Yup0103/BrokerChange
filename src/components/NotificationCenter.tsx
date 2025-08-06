import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Badge,
  IconButton,
  Drawer,
  Divider,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Collapse,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  Close as CloseIcon,
  MarkEmailRead as MarkReadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  requestId?: string;
  clientName?: string;
}

interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Request Completed',
      message: 'Broker change request REQ-002 for Priya Mehta has been completed successfully.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      requestId: 'REQ-002',
      clientName: 'Priya Mehta',
    },
    {
      id: '2',
      type: 'info',
      title: 'Request Under Review',
      message: 'Broker change request REQ-001 for Rajesh Kumar Sharma is now under review.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: false,
      requestId: 'REQ-001',
      clientName: 'Rajesh Kumar Sharma',
    },
    {
      id: '3',
      type: 'warning',
      title: 'Document Required',
      message: 'Additional documents are required for request REQ-003. Please review and upload.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
      requestId: 'REQ-003',
      clientName: 'Amit Singh',
    },
    {
      id: '4',
      type: 'error',
      title: 'Request Rejected',
      message: 'Broker change request REQ-004 has been rejected due to incomplete information.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      requestId: 'REQ-004',
      clientName: 'Suresh Patel',
    },
  ]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new notifications (in a real app, this would come from WebSocket)
      const shouldAddNotification = Math.random() < 0.1; // 10% chance every 30 seconds
      
      if (shouldAddNotification) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)] as any,
          title: 'New Request Submitted',
          message: `A new broker change request has been submitted for review.`,
          timestamp: new Date(),
          read: false,
          requestId: `REQ-${Math.floor(Math.random() * 1000)}`,
          clientName: 'New Client',
        };
        
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
        return <InfoIcon color="info" />;
      default:
        return <InfoIcon />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'info':
        return '#2196f3';
      default:
        return '#757575';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setShowDeleteDialog(false);
    setSelectedNotification(null);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // In a real app, this would navigate to the relevant page
    if (notification.requestId) {
      // Navigate to request details
      console.log(`Navigate to request: ${notification.requestId}`);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { width: 400, maxWidth: '90vw' }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid', 
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NotificationsIcon color="primary" />
              <Typography variant="h6">Notifications</Typography>
              {unreadCount > 0 && (
                <Chip 
                  label={unreadCount} 
                  size="small" 
                  color="primary" 
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Actions */}
          {unreadCount > 0 && (
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Button
                size="small"
                startIcon={<MarkReadIcon />}
                onClick={markAllAsRead}
                sx={{ mr: 1 }}
              >
                Mark all as read
              </Button>
            </Box>
          )}

          {/* Notifications List */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {notifications.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <NotificationsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography color="text.secondary">
                  No notifications
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      sx={{
                        backgroundColor: notification.read ? 'transparent' : 'action.hover',
                        '&:hover': { backgroundColor: 'action.selected' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'transparent' }}>
                          {getNotificationIcon(notification.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: notification.read ? 400 : 600,
                                color: notification.read ? 'text.secondary' : 'text.primary',
                              }}
                            >
                              {notification.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatTimestamp(notification.timestamp)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {notification.message}
                            </Typography>
                            {notification.requestId && (
                              <Chip
                                label={`Request: ${notification.requestId}`}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 1 }}
                              />
                            )}
                            {notification.clientName && (
                              <Chip
                                label={notification.clientName}
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        }
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNotification(notification);
                          setShowDeleteDialog(true);
                        }}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete Notification</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this notification? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => selectedNotification && deleteNotification(selectedNotification.id)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotificationCenter; 