import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  InputAdornment,
  Alert,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  AccountBalance as MutualFundIcon,
  AccountBox as NPSIcon,
  Security as InsuranceIcon,
  SwapHoriz as ChangeIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { getClients, searchClients, type Client } from '../services/demoData';

// Simulate API delay for demo
const simulateApiDelay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

const ClientSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    kycStatus: '',
    riskProfile: '',
    portfolioType: '',
  });
  const [allClients, setAllClients] = useState<Client[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await simulateApiDelay();
      const clients = getClients();
      setAllClients(clients);
    } catch (err) {
      setError('Failed to load clients. Please try again.');
      console.error('Client loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim().length >= 2) {
      try {
        setIsLoading(true);
        setError(null);
        await simulateApiDelay(500);
        const results = searchClients(searchTerm);
        setSearchResults(results);
      } catch (err) {
        setError('Search failed. Please try again.');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Filter clients based on search term and filters
  const filteredClients = useMemo(() => {
    let filtered = allClients;

    // Apply search filter
    if (searchTerm.trim().length >= 2) {
      filtered = searchClients(searchTerm);
    }

    // Apply KYC status filter
    if (filters.kycStatus) {
      filtered = filtered.filter(client => client.kycStatus === filters.kycStatus);
    }

    // Apply risk profile filter
    if (filters.riskProfile) {
      filtered = filtered.filter(client => client.riskProfile === filters.riskProfile);
    }

    // Apply portfolio type filter
    if (filters.portfolioType) {
      filtered = filtered.filter(client => 
        client.portfolios.some(portfolio => portfolio.type === filters.portfolioType)
      );
    }

    return filtered;
  }, [allClients, searchTerm, filters]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'EXPIRED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getSchemeIcon = (type: string) => {
    switch (type) {
      case 'MUTUAL_FUND':
        return <MutualFundIcon color="primary" />;
      case 'NPS':
        return <NPSIcon color="success" />;
      case 'INSURANCE':
        return <InsuranceIcon color="warning" />;
      default:
        return <PersonIcon />;
    }
  };

  const handleBrokerChange = (client: any, portfolio?: any) => {
    navigate('/broker-change', { 
      state: { 
        client, 
        selectedPortfolio: portfolio 
      } 
    });
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Client Search & Portfolio Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search for clients and manage their investment portfolios and broker relationships.
        </Typography>
      </Box>

      {/* Search Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SearchIcon />
            Find Client
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
                                    <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                            <Autocomplete
                              freeSolo
                              options={allClients.map(client => ({
                                label: `${client.name} (${client.clientCode})`,
                                value: client.name,
                                client
                              }))}
                              loading={isLoading}
                              value={searchTerm}
                              onChange={(_, newValue) => {
                                if (typeof newValue === 'string') {
                                  setSearchTerm(newValue);
                                } else if (newValue) {
                                  setSearchTerm(newValue.value);
                                  setSelectedClient(newValue.client);
                                }
                              }}
                              onInputChange={(_, newInputValue) => {
                                setSearchTerm(newInputValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  placeholder="Search by client name, PAN, or client code..."
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                      </InputAdornment>
                                    ),
                                  }}
                                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                              )}
                              sx={{ flex: 1, minWidth: 400 }}
                            />
                            <Button
                              variant="contained"
                              onClick={handleSearch}
                              disabled={isLoading}
                              sx={{ 
                                minWidth: 160,
                                height: 56,
                                fontSize: '1rem',
                                fontWeight: 500,
                                px: 3,
                              }}
                            >
                              {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Search'}
                            </Button>
                          </Box>

          {/* Advanced Filters */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterIcon fontSize="small" />
              Advanced Filters
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="medium">
                  <InputLabel sx={{ fontSize: '1rem', fontWeight: 500 }}>KYC Status</InputLabel>
                  <Select
                    value={filters.kycStatus}
                    label="KYC Status"
                    onChange={(e) => setFilters(prev => ({ ...prev, kycStatus: e.target.value }))}
                    sx={{
                      height: 56,
                      fontSize: '1rem',
                      '& .MuiSelect-select': {
                        paddingTop: '16px',
                        paddingBottom: '16px',
                      },
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '1rem', py: 1.5 }}>All</MenuItem>
                    <MenuItem value="VERIFIED" sx={{ fontSize: '1rem', py: 1.5 }}>Verified</MenuItem>
                    <MenuItem value="PENDING" sx={{ fontSize: '1rem', py: 1.5 }}>Pending</MenuItem>
                    <MenuItem value="REJECTED" sx={{ fontSize: '1rem', py: 1.5 }}>Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="medium">
                  <InputLabel sx={{ fontSize: '1rem', fontWeight: 500 }}>Risk Profile</InputLabel>
                  <Select
                    value={filters.riskProfile}
                    label="Risk Profile"
                    onChange={(e) => setFilters(prev => ({ ...prev, riskProfile: e.target.value }))}
                    sx={{
                      height: 56,
                      fontSize: '1rem',
                      '& .MuiSelect-select': {
                        paddingTop: '16px',
                        paddingBottom: '16px',
                      },
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '1rem', py: 1.5 }}>All</MenuItem>
                    <MenuItem value="CONSERVATIVE" sx={{ fontSize: '1rem', py: 1.5 }}>Conservative</MenuItem>
                    <MenuItem value="MODERATE" sx={{ fontSize: '1rem', py: 1.5 }}>Moderate</MenuItem>
                    <MenuItem value="AGGRESSIVE" sx={{ fontSize: '1rem', py: 1.5 }}>Aggressive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="medium">
                  <InputLabel sx={{ fontSize: '1rem', fontWeight: 500 }}>Portfolio Type</InputLabel>
                  <Select
                    value={filters.portfolioType}
                    label="Portfolio Type"
                    onChange={(e) => setFilters(prev => ({ ...prev, portfolioType: e.target.value }))}
                    sx={{
                      height: 56,
                      fontSize: '1rem',
                      '& .MuiSelect-select': {
                        paddingTop: '16px',
                        paddingBottom: '16px',
                      },
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '1rem', py: 1.5 }}>All</MenuItem>
                    <MenuItem value="MUTUAL_FUND" sx={{ fontSize: '1rem', py: 1.5 }}>Mutual Fund</MenuItem>
                    <MenuItem value="NPS" sx={{ fontSize: '1rem', py: 1.5 }}>NPS</MenuItem>
                    <MenuItem value="INSURANCE" sx={{ fontSize: '1rem', py: 1.5 }}>Insurance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {searchTerm.length > 0 && searchTerm.length < 2 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Please enter at least 2 characters to search.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {filteredClients.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Search Results ({filteredClients.length})
            </Typography>
            
            {isLoading ? (
              <Box>
                {[1, 2, 3].map((item) => (
                  <Box key={item} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" height={24} width="60%" />
                        <Skeleton variant="text" height={20} width="40%" />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <List>
                {filteredClients.map((client, index) => (
                <React.Fragment key={client.id}>
                  <ListItem
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: 1,
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                    onClick={() => setSelectedClient(client)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        {client.name.split(' ').map((n: string) => n[0]).join('')}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {client.name}
                          </Typography>
                          <Chip
                            label={client.kycStatus}
                            size="small"
                            color={getKycStatusColor(client.kycStatus) as any}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {client.clientCode} • PAN: {client.panNumber}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            AUM: {formatCurrency(client.totalAUM)} • {client.portfolios.length} schemes
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                                     {index < filteredClients.length - 1 && <Divider />}
                 </React.Fragment>
               ))}
             </List>
            )}
          </CardContent>
        </Card>
      )}

      {/* Selected Client Portfolio */}
      {selectedClient && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                  {selectedClient.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Client Code: {selectedClient.clientCode}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    PAN: {selectedClient.panNumber}
                  </Typography>
                  <Chip
                    label={selectedClient.kycStatus}
                    size="small"
                    color={getKycStatusColor(selectedClient.kycStatus) as any}
                  />
                </Box>
              </Box>
              
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {formatCurrency(selectedClient.totalAUM)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total AUM
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Investment Portfolio
            </Typography>

            <Grid container spacing={2}>
              {selectedClient.portfolios.map((portfolio: any, index: number) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ mt: 0.5 }}>
                        {getSchemeIcon(portfolio.type)}
                      </Box>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                          {portfolio.schemeName}
                        </Typography>
                        
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                          Current Broker: {portfolio.broker}
                        </Typography>
                        
                        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                          {formatCurrency(portfolio.currentValue)}
                        </Typography>
                        
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<ChangeIcon />}
                          sx={{ mt: 2 }}
                          onClick={() => handleBrokerChange(selectedClient, portfolio)}
                        >
                          Change Broker
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<ChangeIcon />}
                onClick={() => handleBrokerChange(selectedClient)}
              >
                Bulk Broker Change
              </Button>
              <Button
                variant="outlined"
                onClick={() => setSelectedClient(null)}
              >
                Clear Selection
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Instructions when no search performed */}
      {filteredClients.length === 0 && !selectedClient && searchTerm.length === 0 && !isLoading && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Search for a Client
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
              Use the search bar above to find a client by their name, PAN number, or client code. 
              Once selected, you'll be able to view their portfolio and initiate broker changes.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ClientSearch;