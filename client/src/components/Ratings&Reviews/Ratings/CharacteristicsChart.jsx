import React from 'react';
import Chart from 'chart.js/auto';
import { Bar }  from 'react-chartjs-2';

const CharacteristicsChart = ({ reviews, metaData }) => {

  let chararcteristicsObj = metaData.characteristics;
  let characteristicsArray = [];
  if (chararcteristicsObj) {
    characteristicsArray = Object.entries(chararcteristicsObj);
  }
  for (let i = 0; i < characteristicsArray.length; i++) {
    switch (characteristicsArray[i][0]) {
      case 'Size':
        characteristicsArray[i].push('too small');
        characteristicsArray[i].push('too wide');
        break;
      case 'Width':
        characteristicsArray[i].push('too narrow');
        characteristicsArray[i].push('too wide');
        break;
      case 'Comfort':
        characteristicsArray[i].push('uncomfortable');
        characteristicsArray[i].push('perfect');
        break;
      case 'Quality':
        characteristicsArray[i].push('poor');
        characteristicsArray[i].push('perfect');
        break;
      case 'Length':
        characteristicsArray[i].push('runs short');
        characteristicsArray[i].push('runs long');
        break;
      case 'Fit':
        characteristicsArray[i].push('runs tight');
        characteristicsArray[i].push('runs long');
        break;
      default:
        break;
    }
  }

  console.log('characteristicsArray', characteristicsArray);


  const calculateLeftStart = (value) => {

    // math needed to account for 77% of the width and a 5-point rating scale
    value *= .77;
    value -= 5;
    value *= .77
    value += 5;
    value /= 5;
    value -= 1;

    // multiply by 100 to get a percentage
    return value * 100;
  }

  return (
  <>
   {characteristicsArray.map((characteristic, index) => {
      return <div key={index} >
        <div>
          {characteristic[0]}
        </div>
        <div style={{display:"flex"}}>
          <div className="char-bar">
            <hr/>
          </div>
          <div className="square-icon" style={{'left': `${calculateLeftStart(characteristic[1].value)}%`}}>
          ▼
          </div>
        </div>
        <div style={{display:"flex", justifyContent:"space-between", width:"77%"}} >
          <sup> {characteristic[2]}
          </sup>
          <sup > {characteristic[3]}
          </sup>
        </div>
        <br/>
        <br/>
      </div>
    })}

  </>
  )
}

export default CharacteristicsChart;
