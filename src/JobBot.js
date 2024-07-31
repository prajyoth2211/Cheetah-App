import React, { useState } from 'react';
import { fetchJobs } from './jobService';
import { TextField, Button, Card, CardContent, Typography, Grid, Box, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const JobBot = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  // Fetch location suggestions using Nominatim API
  const fetchLocationSuggestions = async (input) => {
    if (!input) return;

    // Clear previous suggestions
    setLocationSuggestions([]);

    // Delay the API call by 2 seconds
    setTimeout(async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${input}&format=json`);
        const data = await response.json();
        const filtered = data.map(location => location.display_name).slice(0, 5); // Take top 5 suggestions
        setLocationSuggestions(filtered);
      } catch (error) {
        console.error("Error fetching location suggestions", error);
      }
    }, 2000); // 2000 milliseconds delay
  };

  const handleSearch = async () => {
    // Split description by commas and trim whitespace
    const keywords = description.split(',').map(keyword => keyword.trim()).filter(keyword => keyword);
    
    if (keywords.length === 0) {
      alert("Please enter at least one job description keyword.");
      return;
    }

    const allJobs = [];
    // Fetch jobs for each keyword and combine results
    for (const keyword of keywords) {
      const result = await fetchJobs(keyword, location);
      allJobs.push(...result);
    }

    setJobs(allJobs);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Job Roles (comma separated)"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            options={locationSuggestions}
            onInputChange={(event, value) => fetchLocationSuggestions(value)}
            renderInput={(params) => (
              <TextField {...params} label="Location" variant="outlined" />
            )}
            value={location}
            onChange={(event, newValue) => setLocation(newValue)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Search Jobs
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {job.title}
                </Typography>
                <Typography color="textSecondary">
                  {job.company.display_name}
                </Typography>
                <Typography color="textSecondary">
                  {job.location.display_name}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  href={job.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Job
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobBot;
