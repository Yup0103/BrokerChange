import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PersonSearch as ClientIcon,
  SwapHoriz as BrokerIcon,
  Description as FormIcon,
  Send as SubmitIcon,
  CheckCircle as CheckIcon,
  AccountBalance as MutualFundIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FormGenerator from '../components/FormGenerator';

const steps = ['Select Client', 'Choose New Broker', 'Review & Submit'];

import { getBrokers, getReasonCodes } from '../services/demoData';

// Get broker and reason code data from service
const mockBrokers = getBrokers();
const reasonCodes = getReasonCodes();

const BrokerChange: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state (from ClientSearch)
  const clientData = location.state?.client;
  const selectedPortfolio = location.state?.selectedPortfolio;

  const [activeStep, setActiveStep] = useState(clientData ? 1 : 0);
  const [selectedClient, setSelectedClient] = useState(clientData || null);
  const [selectedBroker, setSelectedBroker] = useState('');
  const [reason, setReason] = useState('');
  const [reasonCode, setReasonCode] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [showFormGenerator, setShowFormGenerator] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Submit the request
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    // Show form generator instead of immediate submission
    setShowFormGenerator(true);
  };

  const handleFormSubmit = () => {
    // Simulate request submission
    alert('Broker change request submitted successfully!');
    setShowFormGenerator(false);
    navigate('/requests');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return selectedClient !== null;
      case 1:
        return selectedBroker !== '' && reasonCode !== '';
      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Client
              </Typography>
              
              {selectedClient ? (
                <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Client selected from search results
                  </Alert>
                  
                  <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {selectedClient.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {selectedClient.clientCode} • PAN: {selectedClient.panNumber}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total AUM: {formatCurrency(selectedClient.totalAUM)}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Please use the Client Search page to find and select a client first.
                  </Alert>
                  
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/clients')}
                  >
                    Go to Client Search
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Choose New Broker
              </Typography>
              
                                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                  <FormControl fullWidth size="medium">
                                    <InputLabel sx={{ fontSize: '1rem', fontWeight: 500 }}>Select New Broker</InputLabel>
                                    <Select
                                      value={selectedBroker}
                                      label="Select New Broker"
                                      onChange={(e) => setSelectedBroker(e.target.value)}
                                      sx={{
                                        height: 56,
                                        fontSize: '1rem',
                                        '& .MuiSelect-select': {
                                          paddingTop: '16px',
                                          paddingBottom: '16px',
                                        },
                                      }}
                                    >
                                      {mockBrokers.map((broker) => (
                                        <MenuItem key={broker.id} value={broker.id} sx={{ fontSize: '1rem', py: 1.5 }}>
                                          {broker.name} ({broker.arnCode})
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                  <FormControl fullWidth size="medium">
                                    <InputLabel sx={{ fontSize: '1rem', fontWeight: 500 }}>Reason for Change</InputLabel>
                                    <Select
                                      value={reasonCode}
                                      label="Reason for Change"
                                      onChange={(e) => setReasonCode(e.target.value)}
                                      sx={{
                                        height: 56,
                                        fontSize: '1rem',
                                        '& .MuiSelect-select': {
                                          paddingTop: '16px',
                                          paddingBottom: '16px',
                                        },
                                      }}
                                    >
                                      {reasonCodes.map((reason) => (
                                        <MenuItem key={reason.code} value={reason.code} sx={{ fontSize: '1rem', py: 1.5 }}>
                                          {reason.description}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="medium"
                    label="Additional Notes (Optional)"
                    multiline
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Enter any additional information or special instructions..."
                    sx={{
                      '& .MuiInputBase-root': {
                        fontSize: '1rem',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {selectedPortfolio && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected Portfolio Item:
                  </Typography>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <MutualFundIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2">
                          {selectedPortfolio.schemeName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Current Value: {formatCurrency(selectedPortfolio.currentValue)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Current Broker: {selectedPortfolio.broker}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        const selectedBrokerDetails = mockBrokers.find(b => b.id === selectedBroker);
        const selectedReasonDetails = reasonCodes.find(r => r.code === reasonCode);
        
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Review & Submit
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ClientIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Client"
                    secondary={`${selectedClient?.name} (${selectedClient?.clientCode})`}
                  />
                </ListItem>
                
                <Divider />
                
                <ListItem>
                  <ListItemIcon>
                    <BrokerIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="New Broker"
                    secondary={selectedBrokerDetails ? `${selectedBrokerDetails.name} (${selectedBrokerDetails.arnCode})` : 'Not selected'}
                  />
                </ListItem>
                
                <Divider />
                
                <ListItem>
                  <ListItemIcon>
                    <FormIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reason"
                    secondary={selectedReasonDetails?.description || 'Not specified'}
                  />
                </ListItem>
                
                {additionalNotes && (
                  <>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Additional Notes"
                        secondary={additionalNotes}
                      />
                    </ListItem>
                  </>
                )}
              </List>

              <Alert severity="info" sx={{ mt: 2 }}>
                Once submitted, this request will be processed and you'll receive notifications about the status updates.
              </Alert>

              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  onClick={() => setShowFormGenerator(true)}
                >
                  Preview Form
                </Button>
              </Box>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  // Prepare form data for FormGenerator
  const getFormData = () => ({
    clientName: selectedClient?.name || '',
    clientCode: selectedClient?.clientCode || '',
    panNumber: selectedClient?.panNumber || '',
    email: selectedClient?.email || '',
    phone: selectedClient?.phone || '',
    oldBroker: selectedPortfolio?.broker || '',
    newBroker: selectedBroker || '',
    schemeName: selectedPortfolio?.schemeName || '',
    schemeType: selectedPortfolio?.type || '',
    folioNumber: `FOL-${selectedClient?.clientCode}-${Math.floor(Math.random() * 1000)}`,
    reason: reason,
    reasonCode: reasonCode,
    additionalNotes: additionalNotes,
    declarations: {
      termsAccepted: true,
      dataAccuracy: true,
      consentGiven: true,
    },
  });

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Broker Change Request
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Initiate a broker change request for your client's investment schemes.
        </Typography>
      </Box>

      {/* Stepper */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid()}
            startIcon={activeStep === steps.length - 1 ? <SubmitIcon /> : undefined}
          >
            {activeStep === steps.length - 1 ? 'Submit Request' : 'Next'}
          </Button>
        </Box>
      </Box>

      {/* Form Generator Dialog */}
      <Dialog
        open={showFormGenerator}
        onClose={() => setShowFormGenerator(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Broker Change Request Form</Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormGenerator
            formData={getFormData()}
            onClose={() => setShowFormGenerator(false)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowFormGenerator(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleFormSubmit}
            startIcon={<SubmitIcon />}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrokerChange;