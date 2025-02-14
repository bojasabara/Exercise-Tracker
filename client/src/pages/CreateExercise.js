import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Container, Typography } from '@material-ui/core';
import axios from 'axios';

function CreateExercise() {
  const [exercise, setExercise] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data);
          setExercise(prev => ({
            ...prev,
            username: response.data[0].username
          }));
        }
      })
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    
    window.location = '/';
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Create New Exercise Log</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label="User"
          value={exercise.username}
          onChange={(e) => setExercise({...exercise, username: e.target.value})}
          margin="normal"
        >
          {users.map(user => (
            <MenuItem key={user._id} value={user.username}>
              {user.username}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Description"
          value={exercise.description}
          onChange={(e) => setExercise({...exercise, description: e.target.value})}
          margin="normal"
        />

        <TextField
          fullWidth
          type="number"
          label="Duration (in minutes)"
          value={exercise.duration}
          onChange={(e) => setExercise({...exercise, duration: e.target.value})}
          margin="normal"
        />

        <TextField
          fullWidth
          type="date"
          label="Date"
          value={exercise.date}
          onChange={(e) => setExercise({...exercise, date: e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />

        <Button 
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Create Exercise Log
        </Button>
      </form>
    </Container>
  );
}

export default CreateExercise;
