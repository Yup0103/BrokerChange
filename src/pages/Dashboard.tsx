import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  LinearProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Error as ErrorIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getRequests } from '../services/demoData';
import { DashboardSkeleton } from '../components/LoadingSkeleton';

// Simulate API delay for demo
const simulateApiDelay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [showRefreshMessage, setShowRefreshMessage] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await simulateApiDelay(1000);
      
      const mockRequests = getRequests();
      
      const mockStats = {
        totalRequests: mockRequests.length,
        pendingRequests: mockRequests.filter(r => r.status === 'PENDING').length,
        completedRequests: mockRequests.filter(r => r.status === 'COMPLETED').length,
        rejectedRequests: mockRequests.filter(r => r.status === 'REJECTED').length,
        completionRate: Math.round((mockRequests.filter(r => r.status === 'COMPLETED').length / mockRequests.length) * 100),
        avgProcessingTime: 4.2,
      };

      const mockRecentRequests = mockRequests.slice(0, 3).map(request => ({
        id: request.id,
        clientName: request.clientName,
        type: request.requestType,
        status: request.status,
        submittedAt: new Date(request.submittedAt).toLocaleDateString('en-IN'),
      }));

      setData({ stats: mockStats, recentRequests: mockRecentRequests });
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Dashboard data loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setShowRefreshMessage(true);
    await loadDashboardData();
    setTimeout(() => setShowRefreshMessage(false), 3000);
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={loadDashboardData}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  // Safety check for data
  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">
          No data available. Please refresh the page.
        </Alert>
      </Box>
    );
  }

  const { stats, recentRequests } = data;

  const statsData = [
    {
      title: 'Total Requests',
      value: stats.totalRequests.toString(),
      icon: <AssignmentIcon />,
      color: 'primary.main',
    },
    {
      title: 'Pending',
      value: stats.pendingRequests.toString(),
      icon: <ScheduleIcon />,
      color: 'warning.main',
    },
    {
      title: 'Completed',
      value: stats.completedRequests.toString(),
      icon: <CheckCircleIcon />,
      color: 'success.main',
    },
    {
      title: 'Rejected',
      value: stats.rejectedRequests.toString(),
      icon: <ErrorIcon />,
      color: 'error.main',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PROCESSING':
        return 'info';
      case 'UNDER_REVIEW':
        return 'warning';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, Arjun!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your broker change requests and recent activity.
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', color: 'white' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'inherit' }}>
                Quick Actions
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Streamline your workflow with these common tasks
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  },
                }}
                startIcon={<PersonIcon />}
                onClick={() => navigate('/clients')}
              >
                Find Client
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  },
                }}
                startIcon={<AddIcon />}
                onClick={() => navigate('/broker-change')}
              >
                New Request
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  },
                }}
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline" sx={{ fontSize: '0.75rem' }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      color: stat.color,
                      backgroundColor: `${stat.color.replace('main', 'light')}`,
                      borderRadius: '50%',
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Requests */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Requests
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/requests')}
                >
                  View All
                </Button>
              </Box>
              
              <List sx={{ p: 0 }}>
                {recentRequests.map((request: any, index: number) => (
                  <React.Fragment key={request.id}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          {request.clientName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {request.clientName}
                            </Typography>
                            <Chip
                              label={request.status.replace('_', ' ')}
                              size="small"
                              color={getStatusColor(request.status) as any}
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {request.type} broker change
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Submitted {request.submittedAt}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentRequests.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Summary */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Completion Rate */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
                    <TrendingUpIcon color="primary" />
                    Performance
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="textSecondary">Completion Rate</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {stats.completionRate}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={stats.completionRate}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                  
                                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Average processing time: {stats.avgProcessingTime} days
                    </Typography>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/requests')}
                  >
                    View Detailed Reports
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Quick Stats */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    This Month
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="textSecondary">Total Requests</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {stats.totalRequests}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="textSecondary">Success Rate</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                        {stats.completionRate}%
                      </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<AddIcon />}
                      onClick={() => navigate('/broker-change')}
                    >
                      Create New Request
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Success Message */}
      <Snackbar
        open={showRefreshMessage}
        autoHideDuration={3000}
        onClose={() => setShowRefreshMessage(false)}
        message="Dashboard data refreshed successfully!"
      />
    </Box>
  );
};

export default Dashboard;