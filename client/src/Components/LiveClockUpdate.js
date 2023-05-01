import React, { Component } from "react";

class LiveClockUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {

    this.setState({
      date: new Date()
    });
  }

  render() {

    if(parseInt(21-((this.state.date.getTime()-this.props.time))/60000)>0){
      return (
        <div>
          <text>
            Status: &nbsp;
          </text>
          <text style={{color:"LightCoral"}}>
            Not Ready {"\n"}
          </text>        
          <text>
            Ready In: {parseInt(21-((this.state.date.getTime()-this.props.time))/60000)} Minutes
            {"\n"}
          </text>
          <text>
            Last Brewing Time: {this.props.date}
            
          </text>          
        </div>
        
      );      
    }
    else{
      return (
        <div>
          <text>
            Status: &nbsp;
          </text>
          <text style={{color:"DeepSkyBlue"}}>
            Ready {"\n"}
          </text>         
          <text>
            Ready In:{"\n"}
          </text>
          <text>
            Last Brewing Time: {"\n"} {this.props.date}
            
          </text>             
        </div>
        
      );
    }
    
  }
}

export default LiveClockUpdate;
