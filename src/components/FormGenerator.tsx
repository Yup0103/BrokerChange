import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Print as PrintIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface FormData {
  clientName: string;
  clientCode: string;
  panNumber: string;
  email: string;
  phone: string;
  oldBroker: string;
  newBroker: string;
  schemeName: string;
  schemeType: string;
  folioNumber: string;
  reason: string;
  reasonCode: string;
  additionalNotes: string;
  declarations: {
    termsAccepted: boolean;
    dataAccuracy: boolean;
    consentGiven: boolean;
  };
}

interface FormGeneratorProps {
  formData: FormData;
  onClose: () => void;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ formData, onClose }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  const handlePrint = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 100);
  };

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    alert('PDF download functionality would be implemented here');
  };

  const renderFormContent = () => (
    <Box sx={{ 
      maxWidth: 800, 
      mx: 'auto', 
      p: printMode ? 0 : 3,
      '@media print': {
        p: 0,
        '& .no-print': { display: 'none' },
      }
    }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4, borderBottom: '2px solid #1976d2', pb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
          BROKER CHANGE REQUEST FORM
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Mutual Fund / NPS / Insurance Portfolio Transfer
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Form Reference: {new Date().getTime().toString().slice(-8)}
        </Typography>
      </Box>

      {/* Client Information Section */}
      <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
            1. CLIENT INFORMATION
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client Name"
                value={formData.clientName}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client Code"
                value={formData.clientCode}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="PAN Number"
                value={formData.panNumber}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                value={formData.email}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Portfolio Information Section */}
      <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
            2. PORTFOLIO INFORMATION
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Scheme Name"
                value={formData.schemeName}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Scheme Type"
                value={formData.schemeType}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Folio Number"
                value={formData.folioNumber}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Broker Change Information */}
      <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
            3. BROKER CHANGE DETAILS
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Current Broker"
                value={formData.oldBroker}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="New Broker"
                value={formData.newBroker}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Reason Code"
                value={formData.reasonCode}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Reason Description"
                value={formData.reason}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                value={formData.additionalNotes}
                variant="outlined"
                multiline
                rows={3}
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Declarations Section */}
      <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
            4. DECLARATIONS
          </Typography>
          <Box sx={{ pl: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={formData.declarations.termsAccepted} disabled />}
              label="I have read and understood the terms and conditions"
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              control={<Checkbox checked={formData.declarations.dataAccuracy} disabled />}
              label="I confirm that all information provided is accurate and complete"
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              control={<Checkbox checked={formData.declarations.consentGiven} disabled />}
              label="I consent to the processing of this request"
              sx={{ mb: 1 }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Signature Section */}
      <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
            5. SIGNATURE
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ borderTop: '1px solid #000', pt: 1, mt: 4 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Client Signature
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ borderTop: '1px solid #000', pt: 1, mt: 4 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Date
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', mt: 4, pt: 2, borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="caption" color="text.secondary">
          This form is generated electronically and is valid without physical signature
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
          Generated on: {new Date().toLocaleString('en-IN')}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Action Buttons */}
      <Box className="no-print" sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<PreviewIcon />}
          onClick={() => setShowPreview(true)}
        >
          Preview Form
        </Button>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Print Form
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Close
        </Button>
      </Box>

      {/* Form Content */}
      {renderFormContent()}

      {/* Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Form Preview</Typography>
          <IconButton onClick={() => setShowPreview(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ maxHeight: '70vh', overflow: 'auto' }}>
            {renderFormContent()}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)}>Close</Button>
          <Button onClick={handlePrint} startIcon={<PrintIcon />}>
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormGenerator; 