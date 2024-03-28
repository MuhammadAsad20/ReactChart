import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  console.log("hello",chartData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://flask-api-402512.ew.r.appspot.com/salesReport?limit=10');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Cleanup previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.map(item => item.interval.slice(0, 10)), // Extracts 'YYYY-MM' from the interval string

        datasets: [{
          label: 'Unit Count',
          data: chartData.map(item => item.unitCount),
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red color for price dataset
            borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                return 'Unit Count: ' + context.parsed.y;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              font: {
                weight: 'bold' // Make x-axis labels bold
              }
            }
          }
        }
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };

  }, [chartData]);

  return <canvas ref={chartRef} style={{ width: '90vw', height: "600px" }} />;
};

export default LineChart;
