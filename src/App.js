import React from 'react';
import { Container, Typography, AppBar, Toolbar } from '@mui/material';
import JobBot from './JobBot';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div>
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography variant="h2" style={{ flexGrow: 1,textAlign: 'center' }}>
            Cheetah
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <JobBot />
      </Container>
    </div>
  );
};

export default App;
