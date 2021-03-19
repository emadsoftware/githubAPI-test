import * as React from 'react';
import {Bar} from 'react-chartjs-2';

// Generate data
// TODO: Get recent commit number by month https://api.github.com/users/icyrealm/events
let myArr = [10,4,3,5,6,8,3,5,6,7,8,9];
let myArr2 = [1,2,3,4,5,6,7,8,9,8,7,6];

// Render data
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
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
    // ,{
    //   label: 'My Commit History',
    //   backgroundColor: 'rgba(255,99,132,0.2)',
    //   borderColor: 'rgba(255,99,132,1)',
    //   borderWidth: 1,
    //   hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    //   hoverBorderColor: 'rgba(255,99,132,1)',
    //   data: myArr2
    // }
  ],
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
            maintainAspectRatio: true,
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
            }
          }}
        />
      </div>
    );
  }
};