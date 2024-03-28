import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const [chartData, setChartData] = useState([]);
  console.log("bar check --> ", chartData);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
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
    const dynamicChart = new Chart(ctx, {
      type: 'bar', // Set chart type to 'bar'
      data: {
        labels: chartData.products.map((item) => item.title),
        datasets: [
          {
            label: 'Price',
            data: chartData.products.map((item) => item.price),
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red color for price dataset
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Stock',
            data: chartData.products.map((item) => item.stock),
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color for rating dataset
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true // Start y-axis from zero
          }
        }
      }
    });

    return () => {
      dynamicChart.destroy();
    };
  }, [chartData]);

  return <canvas ref={chartRef} style={{ width: '90vw', height: '600px' }} />;
};

export default BarChart;
