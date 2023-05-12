import React, { Component } from "react";
import '../App.css';

class LiveClockUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date()};
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
    const myTimestamp = new Date(this.props.time).getTime();  

    if(this.props.status==="empty"){
      return (
        <div>
          <text>
            Status: &nbsp;
          </text>
          <text style={{color:"LightCoral"}}>
            Tea Ran Out {"\n"}
          </text>        
          <text>
            Ready In: 
            {"\n"}
          </text>
          <text>
            Last Brewing Time: {"\n"}
            <span className="highlight">
            {parseInt((this.state.date.getTime()-myTimestamp)/60000)} Minutes Ago
            </span>
          </text>          
        </div>
        
      );    
    }
    else{

      if(parseInt(21-((this.state.date.getTime()-myTimestamp))/60000)>0){
        return (
          <div>
            <text>
              Status: &nbsp;
            </text>
            <text style={{color:"Orange"}}>
              Getting Ready {"\n"}
            </text>        
            <text>
              Ready In: &nbsp;
              <span className="highlight">
                {parseInt(21-((this.state.date.getTime()-myTimestamp))/60000)} Minutes
              </span>
              {"\n"}
            </text>
            <text>
              Last Brewing Time: {"\n"}
              <span className="highlight">
              {parseInt((this.state.date.getTime()-myTimestamp)/60000)} Minutes Ago
              </span>              
              
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
              Last Brewing Time: {"\n"}
              <span className="highlight">
              {parseInt((this.state.date.getTime()-myTimestamp)/60000)} Minutes Ago
              </span>              
              
            </text>             
          </div>
          
        );
      }
      
    }
  }
}

export default LiveClockUpdate;
