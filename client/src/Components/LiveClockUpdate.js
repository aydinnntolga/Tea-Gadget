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
    const myTimestamp = new Date(this.props.time).getTime()
    var remainingTime = parseInt(21-((this.state.date.getTime()-myTimestamp))/60000)
    var hoursElapsed = parseInt((this.state.date.getTime()-myTimestamp)/3600000)
    var minutesElapsed = parseInt(((this.state.date.getTime()-myTimestamp)/60000)%60)

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
            {hoursElapsed> 0 &&
            <span className="highlight">
              {hoursElapsed} Hour(s)
            </span>
            }
            {minutesElapsed >0 &&
            <span className="highlight">
              {' '}{minutesElapsed} Minute(s)        
            </span>
            }
            { 
              (hoursElapsed > 0 || minutesElapsed > 0) ?           
              <span className="highlight">
              {' '}Ago      
              </span>:
              <span className="highlight">Now</span>
            }
          </text>          
        </div>
        
      );    
    }
    else{

      if(remainingTime>0){
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
                {remainingTime} Minutes
              </span>
              {"\n"}
            </text>
            <text>
              Last Brewing Time: {"\n"}
              {hoursElapsed > 0 &&
              <span className="highlight">
                {hoursElapsed} Hour(s)
              </span>
              }
              {minutesElapsed >0 &&
              <span className="highlight">
                {' '}{minutesElapsed} Minute(s)        
              </span>
              }
              { 
                (hoursElapsed > 0 || minutesElapsed > 0) ?            
                <span className="highlight">
                {' '}Ago      
                </span>:
                <span className="highlight">Now</span>
                
              }                                     
              
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
              {hoursElapsed> 0 &&
              <span className="highlight">
                {hoursElapsed} Hour(s)
              </span>
              }
              {minutesElapsed >0 &&
              <span className="highlight">
                {' '}{minutesElapsed} Minute(s)        
              </span>
              }
              { 
                (hoursElapsed > 0 || minutesElapsed > 0) ?            
                <span className="highlight">
                {' '}Ago      
                </span>
                :
                <span className="highlight">Now</span>
                

              }                           
            </text>             
          </div>
          
        );
      }
      
    }
  }
}

export default LiveClockUpdate;
