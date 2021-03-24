import * as React from 'react';
import {Bar} from 'react-chartjs-2';

export default class BarComponent extends React.Component{  
  constructor(props){
    super(props);
    this.randomCode = this.randomCode.bind(this);
    this.state = {
        codeData: [],
        responseShown: [],
        user: 'icyrealm',
        maxGraphItems: '10',
        graphXData: [],
        graphYData: [10,4,3,5,6,8,3,5,6,7,8,10]
    };
  }

  async componentDidMount(){
    this.randomCode();
  }  

  async randomCode(){
    // Generate data
    // TODO: Get recent commit number by month https://api.github.com/users/icyrealm/events

    async function getData1(){
      // get
      const url = 'https://api.github.com/users/icyrealm/repos';
      const response = await fetch(url);
      const data = await response.json();

      // set
      let dataArr = [];
      try {
          dataArr = data;
      } catch(e) {
          console.log("Data could not be parsed.");     
      }
      if (!Array.isArray(dataArr)){
          dataArr = [];
      }

      // Add new object to array: freshness
      for (let i = dataArr.length - 1; i >= 0; i -= 1) {
        const date1 = new Date();
        const date2 = new Date(dataArr[i].updated_at);            
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        dataArr[i].freshness = diffDays;                           
      }

      return dataArr;
    }

    const ids = [1];
    // Clean the arr
    Promise.all(ids.map(id => getData1(id))).then(results => {
      let resultantArr = results[0];
      let cleanedArr = [], appendedNumbers = [];
      for (let i = 0; i <= this.state.maxGraphItems; i++) {
        try{
          cleanedArr.push(resultantArr[i].name);
          appendedNumbers.push(resultantArr[i].freshness);
        } catch (error){
        }
      }

      // Update state
      this.setState({
        graphXData: cleanedArr,
        graphYData: appendedNumbers
      }); 
    })
  }

  render() {
    // Render data
    const data = {
      labels: this.state.graphXData,
      datasets: [
        {
          label: 'My Repository History',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.graphYData
        }
      ]
    };

    return (
      <div> 
        <Bar
          data={data}
          width={100}
          height={20}
          options={{
            maintainAspectRatio: true,
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }, scaleLabel: {
                    display: true,
                    labelString: 'Freshness'
                  }
              }], xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Code Repository'
                }
            }]
            }
          }}
        />
      </div>
    );
  }
};