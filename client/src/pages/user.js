import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const User = () => {
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users/add', { username });
      alert('User created successfully!');
      setUsername('');
      history.push('/dashboard'); // Redirect to dashboard after successful creation
    } catch (err) {
      console.error('Error creating user:', err);
      alert('Error creating user. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Create New User
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Create User
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default User;
