import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function PredictionForm({ onPrediction }) {
  const [formData, setFormData] = useState({
    windSpeed: '',
    powerCurve: '',
    windDirection: '',
    activePower: '',
    powerDeficit: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        "Wind Speed (m/s)": parseFloat(formData.windSpeed),
        "Theoretical_Power_Curve (KWh)": parseFloat(formData.powerCurve),
        "Wind Direction (°)": parseFloat(formData.windDirection),
        "LV ActivePower (kW)": parseFloat(formData.activePower),
        "power_deficit_percentage": parseFloat(formData.powerDeficit),
      });
      onPrediction(response.data.turbine_status_prediction);
    } catch (error) {
      console.error('There was an error making the prediction!', error);
      setError('There was an error making the prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Wind Speed (m/s)"
        name="windSpeed"
        value={formData.windSpeed}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Theoretical Power Curve (KWh)"
        name="powerCurve"
        value={formData.powerCurve}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Wind Direction (°)"
        name="windDirection"
        value={formData.windDirection}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="LV Active Power (kW)"
        name="activePower"
        value={formData.activePower}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Power Deficit Percentage"
        name="powerDeficit"
        value={formData.powerDeficit}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
        {loading ? 'Predicting...' : 'Predict'}
      </Button>
      {error && <Typography color="error" style={{ marginTop: '16px' }}>{error}</Typography>}
    </form>
  );
}

export default PredictionForm;
