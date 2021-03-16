import React from 'react';
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
        return <div className='card-container'>
            {
                this.state.codeData.map((item, index) =>                    
                    
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
                            Created: {item.created_at}
                        </div>
                        <div className='code-url'>
                            <a href={item.html_url} target='_blank'>View Code</a>
                        </div>
                    </div>
                )
            }
        </div>
    }

}

