import * as React from 'react';
import {Bar} from 'react-chartjs-2';

// Generate data
let myArr = [2,2,3,5,3,2,3];

// Render data
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My Repository History',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: myArr
    }
  ]
};

export default class BarComponent extends React.Component{

  render() {
    return (
      <div>        
        <Bar
          data={data}
          width={100}
          height={10}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
};