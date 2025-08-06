import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  Visibility as ViewIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Error as ErrorIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import { getRequests, type BrokerChangeRequest } from '../services/demoData';

// Get request data from service
const mockRequests = getRequests();

const RequestTracking: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const filteredRequests = mockRequests.filter(request => {
    const matchesStatus = !statusFilter || request.status === statusFilter;
    const matchesSearch = !searchTerm || 
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.clientCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckIcon />;
      case 'PROCESSING':
        return <ScheduleIcon />;
      case 'UNDER_REVIEW':
        return <AssignmentIcon />;
      case 'REJECTED':
        return <ErrorIcon />;
      default:
        return <ScheduleIcon />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleExpandRow = (requestId: string) => {
    setExpandedRows(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const getTimelineItemColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'current':
        return 'primary';
      case 'rejected':
        return 'error';
      default:
        return 'grey';
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Request Tracking
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and track the status of all broker change requests.
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
                                    <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                              <TextField
                                fullWidth
                                size="medium"
                                label="Search"
                                placeholder="Search by client name, request ID, or client code..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{
                                  '& .MuiInputBase-root': {
                                    height: 56,
                                    fontSize: '1rem',
                                  },
                                  '& .MuiInputLabel-root': {
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <FormControl fullWidth size="medium">
                                <InputLabel sx={{ fontSize: '1rem', fontWeight: 500 }}>Status Filter</InputLabel>
                                <Select
                                  value={statusFilter}
                                  label="Status Filter"
                                  onChange={(e) => setStatusFilter(e.target.value)}
                                  sx={{
                                    height: 56,
                                    fontSize: '1rem',
                                    '& .MuiSelect-select': {
                                      paddingTop: '16px',
                                      paddingBottom: '16px',
                                    },
                                  }}
                                >
                                  <MenuItem value="" sx={{ fontSize: '1rem', py: 1.5 }}>All Statuses</MenuItem>
                                  <MenuItem value="PROCESSING" sx={{ fontSize: '1rem', py: 1.5 }}>Processing</MenuItem>
                                  <MenuItem value="COMPLETED" sx={{ fontSize: '1rem', py: 1.5 }}>Completed</MenuItem>
                                  <MenuItem value="REJECTED" sx={{ fontSize: '1rem', py: 1.5 }}>Rejected</MenuItem>
                                  <MenuItem value="UNDER_REVIEW" sx={{ fontSize: '1rem', py: 1.5 }}>Under Review</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Requests ({filteredRequests.length})
        </Typography>
      </Box>

      {/* Requests Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Broker Change</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((request) => (
                <React.Fragment key={request.id}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {request.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                          {request.clientName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {request.clientName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {request.clientCode}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={request.requestType}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {request.oldBroker} → {request.newBroker}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={request.status.replace('_', ' ')}
                        color={getStatusColor(request.status) as any}
                        icon={getStatusIcon(request.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(request.submittedAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleExpandRow(request.id)}
                      >
                        {expandedRows.includes(request.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                      <Collapse in={expandedRows.includes(request.id)} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                          <Grid container spacing={3}>
                            {/* Request Details */}
                            <Grid item xs={12} md={6}>
                              <Typography variant="h6" gutterBottom>
                                Request Details
                              </Typography>
                              <List dense>
                                <ListItem>
                                  <ListItemIcon>
                                    <PersonIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Reason"
                                    secondary={request.reason}
                                  />
                                </ListItem>
                                {request.status === 'COMPLETED' && request.completedAt && (
                                  <ListItem>
                                    <ListItemIcon>
                                      <CheckIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="Completed At"
                                      secondary={formatDate(request.completedAt)}
                                    />
                                  </ListItem>
                                )}
                                {request.status === 'REJECTED' && request.rejectionReason && (
                                  <ListItem>
                                    <ListItemIcon>
                                      <ErrorIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="Rejection Reason"
                                      secondary={request.rejectionReason}
                                    />
                                  </ListItem>
                                )}
                                {request.estimatedCompletion && request.status === 'PROCESSING' && (
                                  <ListItem>
                                    <ListItemIcon>
                                      <ScheduleIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary="Estimated Completion"
                                      secondary={formatDate(request.estimatedCompletion)}
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </Grid>

                            {/* Timeline */}
                            <Grid item xs={12} md={6}>
                              <Typography variant="h6" gutterBottom>
                                Request Timeline
                              </Typography>
                              <Timeline>
                                {request.timeline.map((item, index) => (
                                  <TimelineItem key={index}>
                                    <TimelineSeparator>
                                      <TimelineDot color={getTimelineItemColor(item.status) as any}>
                                        {getStatusIcon(item.status)}
                                      </TimelineDot>
                                      {index < request.timeline.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                      <Typography variant="subtitle2">
                                        {item.event}
                                      </Typography>
                                      <Typography variant="caption" color="textSecondary">
                                        {formatDate(item.date)}
                                      </Typography>
                                    </TimelineContent>
                                  </TimelineItem>
                                ))}
                              </Timeline>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {filteredRequests.length === 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <AssignmentIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No Requests Found
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {searchTerm || statusFilter 
                ? 'Try adjusting your search criteria or filters.'
                : 'No broker change requests have been submitted yet.'
              }
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default RequestTracking;