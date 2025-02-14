import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const Dashboard = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      console.log('Fetching exercises from:', 'http://localhost:5000/exercises');
      const response = await axios.get('http://localhost:5000/exercises');
      console.log('Response:', response);
      
      if (!response.data) {
        throw new Error('No data received');
      }
      
      setExercises(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(`Failed to fetch exercises: ${err.message}`);
      setLoading(false);
    }
  };

  const deleteExercise = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/exercises/${id}`);
      setExercises(prevExercises => prevExercises.filter(exercise => exercise._id !== id));
    } catch (err) {
      console.error('Error deleting exercise:', err);
      alert('Failed to delete exercise');
    }
  };

  if (loading) return (
    <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
      <CircularProgress />
    </Container>
  );

  if (error) return (
    <Container>
      <Typography color="error" variant="h6">{error}</Typography>
    </Container>
  );

  return (
    <Container maxWidth="lg">
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Exercise Dashboard
        </Typography>
        
        {exercises.length === 0 ? (
          <Typography>No exercises found. Create one to get started!</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Duration (min)</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises.map((exercise) => (
                  <TableRow key={exercise._id}>
                    <TableCell>{exercise.username}</TableCell>
                    <TableCell>{exercise.description}</TableCell>
                    <TableCell>{exercise.duration}</TableCell>
                    <TableCell>{new Date(exercise.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteExercise(exercise._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard;
