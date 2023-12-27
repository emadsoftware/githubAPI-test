import * as React from 'react';
import {Bar, Doughnut, Line} from 'react-chartjs-2';


export default class BarComponent extends React.Component{  

  // Initialize variables
  constructor(props){
    super(props);
    this.randomCode = this.randomCode.bind(this);
    this.state = {
        user: 'icyrealm',
        maxGraphItems: '10',
        graphXData: [],
        graphYDataFreshness: [10,4,3,5,6,8,3,5,6,7,8,10],
        graphYDataSize: [1,2,3,4,5,6,7,8,9,10]
    };
  }

  // Called after component is rendered, call randomCode
  componentDidMount(){
    this.randomCode();
  }

  componentDidUpdate(prevProps){
    if(prevProps.name !== this.props.name){
        this.setState({          
            user: this.props.name
        });
    }
    // this.randomCode();
  }

  // 
  async randomCode(){

    // Get rest api data
    const getApiData = async (userRepo) => {
      const url = 'https://api.github.com/users/'+userRepo+'/repos';
      const response = await fetch(url);
      const data = await response.json();
      let dataArr = [];
      try {
          dataArr = data;
      } catch(e) {
          console.log("Data could not be parsed.");     
      }
      if (!Array.isArray(dataArr)){
          dataArr = [];
      }

      // Append attribute (freshness) to each object (repo) in dataArr
      for (let i = dataArr.length - 1; i >= 0; i -= 1) {
        const date1 = new Date();
        const date2 = new Date(dataArr[i].updated_at);            
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        dataArr[i].freshness = diffDays;                           
      }

      return dataArr;
    }

    try {
      // Use a single promise to get API data
      const resultantArr = await getApiData(this.props.name);

      // Use slice instead of a loop to get a subset of resultantArr
      const slicedResult = resultantArr.slice(0, this.state.maxGraphItems);

      // Use map to extract specific properties
      const repoNameArr = slicedResult.map((repo) => repo.name);
      const repoFreshnessArr = slicedResult.map((repo) => repo.freshness);
      const repoSizeArr = slicedResult.map((repo) => repo.size);

      this.setState({
        graphXData: repoNameArr,
        graphYDataFreshness: repoFreshnessArr,
        graphYDataSize: repoSizeArr,
      });
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }

  }

  render() {

    // Data Commit Days Object
    const dataCommitDays = {
      labels: this.state.graphXData,
      datasets: [
        {
          label: 'Days since last commit',
          backgroundColor: 'rgba(185, 198, 255,0.2)',
          borderColor: 'rgba(185, 198, 255,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(185, 198, 255,0.4)',
          hoverBorderColor: 'rgba(185, 198, 255,1)',
          data: this.state.graphYDataFreshness
        }
      ]
    };

    // Data Size Object
    const dataSize = {
      labels: this.state.graphXData,
      datasets: [
        {
          label: 'Days since last commit',
          backgroundColor: 'rgba(185, 198, 255,0.2)',
          borderColor: 'rgba(185, 198, 255,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(185, 198, 255,0.4)',
          hoverBorderColor: 'rgba(185, 198, 255,1)',
          data: this.state.graphYDataSize
        }
      ]
    };

    return (
      <div className="charts-container">
        
        <div> 
          <Bar
            data={dataCommitDays}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: true,
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }, scaleLabel: {
                      display: true,
                      labelString: 'Days Since Last Commit'
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

        <div> 
            <Doughnut
            data={dataSize}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: true,
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }, scaleLabel: {
                      display: true,
                      labelString: 'Size (KB)'
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

       
    </div>
      
    );
  }
};