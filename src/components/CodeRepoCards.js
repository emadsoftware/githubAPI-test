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
        console.log(codeArr);
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
                        <div className='code-date'>
                            Created: {new Date(item.created_at).toLocaleDateString()}
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

