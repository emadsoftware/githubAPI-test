import * as React from 'react';
import './CodeRepoCards.css';

export default class CodeRepoCards extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            codeData: [],
            responseShown: [],
            user: 'icyrealm',
            cardsToShow: '10'
        };
    }

    handleChange(e) {
        this.setState({             
            user: e.target.value
        }, () => {
            this.getData(1);
        });
    } 

    async componentDidMount(){
        this.getData(2);
    }

    componentDidUpdate(prevProps){
        if(prevProps.name !== this.props.name){
            this.setState({          
                user: this.props.name
            });
        }
        this.getData();
      }

    async getData(){
        // get
        const url = 'https://api.github.com/users/'+this.props.name+'/repos';
        const response = await fetch(url);
        const data = await response.json();

        // log api call imit
        const urlLimit = 'https://api.github.com/rate_limit';
        const responseLimit = await fetch(urlLimit);
        const dataLimit = await responseLimit.json();
        console.log(dataLimit);

        // set
        let dataArr = [];
        try {
            dataArr = data;
            console.log(dataArr);
        } catch(e) {
            console.log("Data could not be parsed.");     
        }

        if (!Array.isArray(dataArr)){
            dataArr = [];
        }

        this.setState({
            codeData: dataArr,
            responseShown: dataArr.slice(0,this.state.cardsToShow)
        });

    }

    render(){
        // Don't show forked repositories
        var codeArr = this.state.codeData;
        var i;
        for (i = codeArr.length - 1; i >= 0; i -= 1) {
            if (codeArr[i].fork == true) {
                codeArr.splice(i, 1);
            }
        }

        // Add new object to array: freshness
        for (i = codeArr.length - 1; i >= 0; i -= 1) {
            const date1 = new Date();
            const date2 = new Date(codeArr[i].updated_at);            
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            codeArr[i].freshness = diffDays;                           
        }
        
        return <div className='card-container'>       

            <div className="code-card-container">
                {                    
                    codeArr.map((item, index) =>                    
                        
                        <div key={index} className='code-card'>                        
                            {/* <div className='code-index'>
                                {index+1}
                            </div> */}
                            <div className='code-title'>
                                {item.name}
                            </div>                        
                            <div className='code-description'>
                                Description: {item.description}
                            </div>
                            <div className='code-date-created'>
                                Created: {new Date(item.created_at).toLocaleDateString()}
                            </div>
                            <div className='code-date-modified'>
                                Modified: {new Date(item.updated_at).toLocaleDateString()}, {item.freshness} days ago
                            </div>                        
                            <div className='code-size'>
                                Size: {item.size.toLocaleString()} KB
                            </div>
                            <div className='code-url'>
                                <a href={item.html_url} rel="noreferrer" target='_blank'>View Code</a> - {item.homepage ? <a href={item.homepage} target='_blank' rel="noreferrer">View Demo</a> : <s>View Demo</s>}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    }

}

// IDEAS for BASIC data visualization (start small bro)

// 1. Bar: Least updated repo (days since last modified) - arrange bar graph from largest to smallest, (optional: splice to only inc first 3-5, otherwise split graphs by tab to show max i.e. 10 data)

// 2. Doughnut: Size of all repos into doughnut graph

// 3. Area-line-bounary: number of commits (aka contributions) per repository for first user https://api.github.com/repos/icyrealm/icyrealm.github.io/contributors, repositories arranged by date created

// Generate graphs for only the first 6-9 repos
