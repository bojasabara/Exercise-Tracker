import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, TextField, Button, MenuItem } from '@material-ui/core';
import axios from 'axios';

const Exercises = () => {
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    duration: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [users, setUsers] = useState([]);
  
  // Fetch available users when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const exerciseData = {
      ...formData,
      duration: Number(formData.duration)
    };

    axios.post('http://localhost:5000/exercises/add', exerciseData)
      .then(() => {
        alert('Exercise logged successfully!');
        window.location.href = '/dashboard';
      })
      .catch(err => console.error('Error logging exercise:', err));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Record Fitness Activity
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            name="username"
            label="Select User"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          >
            {users.map(user => (
              <MenuItem key={user._id} value={user.username}>
                {user.username}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            name="description"
            label="Exercise Description"
            placeholder="e.g., Morning Run, Weight Training"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            name="duration"
            type="number"
            label="Duration (minutes)"
            value={formData.duration}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            name="date"
            type="date"
            label="Date"
            value={formData.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          <Button 
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Log Exercise
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Exercises;
