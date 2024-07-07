import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PredictionChart = ({ prediction }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('predictionChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Prediction'],
        datasets: [{
          label: 'Turbine Status',
          data: [prediction],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
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
            beginAtZero: true
          }
        }
      }
    });
  }, [prediction]);

  return (
    <canvas id="predictionChart"></canvas>
  );
}

export default PredictionChart;

