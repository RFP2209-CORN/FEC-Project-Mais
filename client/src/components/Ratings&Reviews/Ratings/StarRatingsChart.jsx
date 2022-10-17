import React from 'react';
import Chart from 'chart.js/auto';
import { Bar }  from 'react-chartjs-2';

const StarRatingsChart = ({ rating, totalReviews }) => {

  const ratingsPercentage = rating / totalReviews;

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
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 0.1,
      },
    },
    responsive: true,
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
      // {
      //   // Total Rating
      //   data: [ totalReviews ],
      //   barThickness: 14,

      //   fillColor: 'rgba(50, 50, 50, 0.5)',
      //   borderColor: 'rgba(50, 50, 50, 0.5)',
      //   backgroundColor: 'rgba(50, 50, 50, 0.5)',
      //   datalabels: {
      //     display: false
      //   },
      //   order: 1,
      // },
      {
        // label: 'Star Rating',
        data: [ ratingsPercentage ],
        barThickness: 14,
        categoryPercentage: 0.5,
        height: 0.5,
        fillColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'rgba(0, 255, 0, 0.5)',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        datalabels: {
          display: false
        },
        order: 0,
      },
    ]
  }

  return (
    <div className="star-ratings-chart">
        <Bar data={data} options={options}/>
    </div>
  )

}

export default StarRatingsChart;

