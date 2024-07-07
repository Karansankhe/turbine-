import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, TextField, Button, CssBaseline, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement, LineController, BarController } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement, LineController, BarController);

const Dashboard = () => {
  const [windSpeed, setWindSpeed] = useState('');
  const [theoreticalPowerCurve, setTheoreticalPowerCurve] = useState('');
  const [windDirection, setWindDirection] = useState('');
  const [lvActivePower, setLvActivePower] = useState('');
  const [powerDeficit, setPowerDeficit] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [predictionStatus, setPredictionStatus] = useState(null);

  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  const handlePredict = () => {
    // Replace with your actual prediction logic
    const newPrediction = Math.random() * 100;
    setPrediction(newPrediction);

    // Example logic: If prediction is greater than a threshold, consider it a success (1), otherwise failure (0)
    if (newPrediction > 50) {
      setPredictionStatus(0); // Failure
    } else {
      setPredictionStatus(1); // Success
    }
  };

  useEffect(() => {
    // Update the bar chart based on prediction status
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }
    const barCtx = document.getElementById('barChart').getContext('2d');
    barChartRef.current = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Prediction Status'],
        datasets: [{
          label: 'Turbine Status',
          data: [predictionStatus],
          backgroundColor: predictionStatus === 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)', // Red for failure, green for success
          borderColor: predictionStatus === 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            ticks: {
              autoSkip: false
            }
          },
          y: {
            beginAtZero: true,
            max: 1 // Maximum value of 1 for success/failure representation
          }
        }
      }
    });

    // Update the line chart with updated data (if needed)
    if (lineChartRef.current) {
      lineChartRef.current.update();
    }
  }, [predictionStatus]);

  useEffect(() => {
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    lineChartRef.current = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Wind Speed', 'Theoretical Power Curve', 'Wind Direction', 'LV Active Power', 'Power Deficit'],
        datasets: [{
          label: 'Values',
          data: [windSpeed, theoreticalPowerCurve, windDirection, lvActivePower, powerDeficit],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            ticks: {
              autoSkip: false
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [windSpeed, theoreticalPowerCurve, windDirection, lvActivePower, powerDeficit]);

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <TextField
                label="Wind Speed"
                value={windSpeed}
                onChange={(e) => setWindSpeed(e.target.value)}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                label="Theoretical Power Curve"
                value={theoreticalPowerCurve}
                onChange={(e) => setTheoreticalPowerCurve(e.target.value)}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                label="Wind Direction"
                value={windDirection}
                onChange={(e) => setWindDirection(e.target.value)}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                label="LV Active Power"
                value={lvActivePower}
                onChange={(e) => setLvActivePower(e.target.value)}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                label="Power Deficit"
                value={powerDeficit}
                onChange={(e) => setPowerDeficit(e.target.value)}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <Button variant="contained" color="primary" onClick={handlePredict} fullWidth>
                Predict
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container>
          <Typography variant="h4" gutterBottom>
            Wind Turbine Dashboard
          </Typography>
          <Box>
            <Typography variant="h6">Bar Chart</Typography>
            <canvas id="barChart"></canvas>
          </Box>
          <Box>
            <Typography variant="h6">Line Chart</Typography>
            <canvas id="lineChart"></canvas>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;

