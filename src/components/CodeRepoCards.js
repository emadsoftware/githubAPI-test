import * as React from 'react';
import './CodeRepoCards.css';

export default class CodeRepoCards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            codeData: []
        };
    }

    async componentDidMount(){
        this.getData();
    }

    async getData(){
        // get
        const url = 'https://api.github.com/users/icyrealm/repos';
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

        this.setState({
            codeData: dataArr
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

