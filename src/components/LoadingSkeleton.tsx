import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Grid } from '@mui/material';

interface SkeletonCardProps {
  height?: number;
  width?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ height = 120, width = '100%' }) => (
  <Card>
    <CardContent>
      <Skeleton variant="rectangular" height={height} width={width} />
    </CardContent>
  </Card>
);

export const DashboardSkeleton: React.FC = () => (
  <Box>
    {/* Header Skeleton */}
    <Box sx={{ mb: 4 }}>
      <Skeleton variant="text" height={48} width="40%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="60%" />
    </Box>

    {/* Quick Actions Skeleton */}
    <SkeletonCard height={80} />

    {/* Stats Cards Skeleton */}
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[1, 2, 3, 4].map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={40} width="40%" />
                </Box>
                <Skeleton variant="circular" width={48} height={48} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* Content Skeleton */}
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Skeleton variant="text" height={32} width="30%" />
              <Skeleton variant="rectangular" height={32} width={80} />
            </Box>
            <List>
              {[1, 2, 3].map((item) => (
                <ListItem key={item} sx={{ px: 0, py: 2 }}>
                  <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Skeleton variant="text" height={24} width="70%" />}
                    secondary={<Skeleton variant="text" height={20} width="50%" />}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SkeletonCard height={200} />
          </Grid>
          <Grid item xs={12}>
            <SkeletonCard height={150} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export const TableSkeleton: React.FC = () => (
  <Card>
    <CardContent>
      {/* Header Skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Skeleton variant="text" height={32} width="30%" />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Skeleton variant="rectangular" height={40} width={120} />
          <Skeleton variant="rectangular" height={40} width={100} />
        </Box>
      </Box>

      {/* Table Skeleton */}
      <Table>
        <TableHead>
          <TableRow>
            {['Client', 'Request Type', 'Status', 'Date', 'Actions'].map((header) => (
              <TableCell key={header}>
                <Skeleton variant="text" height={20} width="80%" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5].map((row) => (
            <TableRow key={row}>
              {[1, 2, 3, 4, 5].map((cell) => (
                <TableCell key={cell}>
                  <Skeleton variant="text" height={20} width="90%" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export const FormSkeleton: React.FC = () => (
  <Box>
    {/* Header Skeleton */}
    <Box sx={{ mb: 4 }}>
      <Skeleton variant="text" height={48} width="40%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="60%" />
    </Box>

    {/* Stepper Skeleton */}
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          {[1, 2, 3].map((step) => (
            <Box key={step} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" height={20} width="60%" sx={{ ml: 1 }} />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>

    {/* Form Fields Skeleton */}
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={20} width="30%" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={56} width="100%" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={20} width="30%" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={56} width="100%" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="text" height={20} width="30%" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={120} width="100%" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Box>
); 