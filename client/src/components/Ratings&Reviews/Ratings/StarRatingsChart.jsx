import React from 'react';
import Chart from 'chart.js/auto';
import { Bar }  from 'react-chartjs-2';

const StarRatingsChart = ({ rating, totalNumberOfReviews }) => {

  const options = {
    scales: {
      y: {
        stacked: true,
        display: false,
        grid: {
          drawBorder: false,
          display: false,
      },
        ticks: {
          beginAtZero: true,
          display: false,
        },
      },
      x: {
        stacked: true,
        display: false,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          beginAtZero: true,
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 0.1,
      },
    },
    responsive: false,
    // makes it a horizontal bar
    indexAxis: 'y',
    // hide labels
    plugins: {
      legend: {
        display: false
      }
    },
    title: {
      display: false,
      text: 'Percentage as based on total Reviews',
    }
  }

  const data = {
    labels: [''],
    datasets: [
      {
        backgroundColor: 'rgba(0,255,0,0.2)',
        borderColor: 'rgba(0,255,0,0.2)',
        borderWidth: 0.5,
        stack: 1,
        barThickness: 14,
        categoryPercentage: 0.5,
        height: 0.3,
        hoverBackgroundColor: 'rgba(0,255,0,0.2)',
        hoverBorderColor: 'rgba(0,255,0,0.2)',
        data: [rating]
      },
      {
        backgroundColor: 'rgba(30,30,30,0.2)',
        borderColor: 'rgba(30,30,30,0.2)',
        borderWidth: 0.5,
        stack: 1,
        barThickness: 14,
        categoryPercentage: 0.5,
        height: 0.3,
        hoverBackgroundColor: 'rgba(30,30,30,0.2)',
        hoverBorderColor: 'rgba(30,30,30,0.2)',
        data: [totalNumberOfReviews]
      }
    ]
  }

  return (
    // <div className="ratings-sidebar">
    //   <div className="star-ratings-chart">
        <Bar data={data} options={options}/>
    //   </div>
    // </div>
  )
}

export default StarRatingsChart;

