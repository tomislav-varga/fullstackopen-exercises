import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Cake as CakeIcon,
  Wc as GenderIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';

import { Patient, Entry } from '../../types';
import patientService from '../../services/patients';
import EntryDetails from '../PatientEntryDetails/EntryDetails';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setError('No patient ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const patientData = await patientService.getById(id);
        setPatient(patientData);
        setError('');
      } catch (err) {
        console.error('Error fetching patient:', err);
        setError('Failed to fetch patient information');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!patient) {
    return (
      <Box m={2}>
        <Alert severity="warning">Patient not found</Alert>
      </Box>
    );
  }

  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return '♂️';
      case 'female':
        return '♀️';
      default:
        return '⚲';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box m={2}>
      {/* Patient Header */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {patient.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip
                  icon={<GenderIcon />}
                  label={`${getGenderIcon(patient.gender)} ${patient.gender}`}
                  variant="outlined"
                  size="small"
                />
                {patient.ssn && (
                  <Chip
                    icon={<BadgeIcon />}
                    label={`SSN: ${patient.ssn}`}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Patient Details */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            Personal Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <List>
            <ListItem>
              <CakeIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText
                primary="Date of Birth"
                secondary={formatDate(patient.dateOfBirth || '')}
              />
            </ListItem>
            
            <ListItem>
              <WorkIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText
                primary="Occupation"
                secondary={patient.occupation || 'Not specified'}
              />
            </ListItem>
            
            <ListItem>
              <GenderIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText
                primary="Gender"
                secondary={`${getGenderIcon(patient.gender)} ${patient.gender}`}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Medical Entries */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            Medical Entries
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          {patient.entries && patient.entries.length > 0 ? (
            <Box>
              {patient.entries.map((entry: Entry) => (
                <EntryDetails key={entry.id} entry={entry} />
              ))}
            </Box>
          ) : (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                No medical entries available for this patient.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientPage;
