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
        console.log("HC - " + e.target.value);
        this.setState({             
            user: e.target.value
        }, () => {
            this.getData();
        });
    } 

    async componentDidMount(){
        this.getData();
    }

    async getData(){
        // get
        const url = 'https://api.github.com/users/'+this.state.user+'/repos';
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
                  <div className="group">
                                <label>User: </label>
                                <input
                                    type="text"
                                    id="markdown-content"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.user}
                                />
                </div>
            {
                console.log("1"), 
                console.log("2")}          

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
    }

}

// IDEAS for BASIC data visualization (start small bro)
// Average size of all repos, compare each repo size to that
// Time / freshness of each repo (creation date vs last modified)
// Generate graphs for only the first 6-9 repos
/// file size (easy)
/// freshness (last modified -- medium difficulty)
/// number of commits (difficult)

