import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  BusinessCenter as BusinessIcon,
  Favorite as HealthIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

import { Entry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../../types';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getHealthRatingDisplay = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return { color: 'success', icon: '💚', text: 'Healthy' };
      case HealthCheckRating.LowRisk:
        return { color: 'info', icon: '💛', text: 'Low Risk' };
      case HealthCheckRating.HighRisk:
        return { color: 'warning', icon: '🧡', text: 'High Risk' };
      case HealthCheckRating.CriticalRisk:
        return { color: 'error', icon: '❤️', text: 'Critical Risk' };
      default:
        return { color: 'default', icon: '❓', text: 'Unknown' };
    }
  };

  const getEntryIcon = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalIcon sx={{ mr: 1, color: 'error.main' }} />;
      case 'OccupationalHealthcare':
        return <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />;
      case 'HealthCheck':
        return <HealthIcon sx={{ mr: 1, color: 'success.main' }} />;
      default:
        return assertNever(entry);
    }
  };

  const renderHospitalEntry = (entry: HospitalEntry) => (
    <Box sx={{ mt: 2, p: 1, bgcolor: 'error.light', borderRadius: 1 }}>
      <Typography variant="subtitle2" color="error.dark">
        🏥 Hospital Discharge Information
      </Typography>
      <Typography variant="body2">
        <strong>Discharge Date:</strong> {formatDate(entry.discharge.date)}
      </Typography>
      <Typography variant="body2">
        <strong>Discharge Criteria:</strong> {entry.discharge.criteria}
      </Typography>
    </Box>
  );

  const renderOccupationalHealthcareEntry = (entry: OccupationalHealthcareEntry) => (
    <Box sx={{ mt: 2, p: 1, bgcolor: 'primary.light', borderRadius: 1 }}>
      <Typography variant="subtitle2" color="primary.dark">
        💼 Occupational Healthcare Information
      </Typography>
      <Typography variant="body2">
        <strong>Employer:</strong> {entry.employerName}
      </Typography>
      {entry.sickLeave && (
        <Typography variant="body2">
          <strong>Sick Leave:</strong> {formatDate(entry.sickLeave.startDate)} - {formatDate(entry.sickLeave.endDate)}
        </Typography>
      )}
    </Box>
  );

  const renderHealthCheckEntry = (entry: HealthCheckEntry) => {
    const ratingDisplay = getHealthRatingDisplay(entry.healthCheckRating);
    return (
      <Box sx={{ mt: 2, p: 1, bgcolor: 'success.light', borderRadius: 1 }}>
        <Typography variant="subtitle2" color="success.dark">
          ❤️ Health Check Information
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">
            <strong>Health Rating:</strong>
          </Typography>
          <Chip
            label={`${ratingDisplay.icon} ${ratingDisplay.text}`}
            size="small"
            sx={{
              backgroundColor: ratingDisplay.color === 'success' ? 'success.main' : 
                              ratingDisplay.color === 'info' ? 'info.main' :
                              ratingDisplay.color === 'warning' ? 'warning.main' :
                              ratingDisplay.color === 'error' ? 'error.main' : 'grey.main',
              color: 'white'
            }}
          />
        </Box>
      </Box>
    );
  };

  // Exhaustive type checking helper function
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const renderEntrySpecificDetails = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return renderHospitalEntry(entry);
      case 'OccupationalHealthcare':
        return renderOccupationalHealthcareEntry(entry);
      case 'HealthCheck':
        return renderHealthCheckEntry(entry);
      default:
        return assertNever(entry);
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      {/* Entry Header */}
      <Box display="flex" alignItems="center" mb={1}>
        {getEntryIcon(entry)}
        <Typography variant="h6" color="primary">
          {entry.type === 'OccupationalHealthcare' 
            ? 'Occupational Healthcare' 
            : entry.type === 'HealthCheck' 
            ? 'Health Check' 
            : entry.type}
        </Typography>
        <Box ml="auto">
          <Chip
            icon={<CalendarIcon />}
            label={formatDate(entry.date)}
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>

      {/* Entry Description */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Date:</strong> {formatDate(entry.date)} <br />
        <strong>Description:</strong> {entry.description}
      </Typography>

      {/* Specialist */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        <strong>Specialist:</strong> {entry.specialist}
      </Typography>

      {/* Diagnosis Codes */}
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Diagnosis Codes:</strong>
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {entry.diagnosisCodes.map((code) => (
              <Chip key={code} label={code} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>
      )}

      {/* Type-specific information using switch case with exhaustive checking */}
      {renderEntrySpecificDetails(entry)}
    </Paper>
  );
};

export default EntryDetails;