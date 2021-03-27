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
  async componentDidMount(){
    this.randomCode();
  }

  componentDidUpdate(prevProps){
    if(prevProps.name !== this.props.name){
        this.setState({          
            user: this.props.name
        });
    }
    this.randomCode();
}

  // 
  async randomCode(){

    // Get rest api data
    async function getApiData(userRepo){
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

    // Use promise to sequentially append resulting object attributes to state
    const ids = [1];
    Promise.all(ids.map(id => getApiData(this.props.name))).then(results => {
      let resultantArr = results[0];
      let repoNameArr = [], repoFreshnessArr = [], repoSizeArr = [];
      for (let i = 0; i <= this.state.maxGraphItems; i++) {
        try{
          repoNameArr.push(resultantArr[i].name);
          repoFreshnessArr.push(resultantArr[i].freshness);
          repoSizeArr.push(resultantArr[i].size);
        } catch (error){
        }
      }
      this.setState({
        graphXData: repoNameArr,
        graphYDataFreshness: repoFreshnessArr,
        graphYDataSize: repoSizeArr
      }); 
    })

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
        {this.props.name}
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

       
    </div>
      
    );
  }
};