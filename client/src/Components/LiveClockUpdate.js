import React, { Component } from "react";
import '../App.css';
import { withTranslation } from 'react-i18next';
import i18n from '../resource'; 

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
    const { t } = i18n
    var remainingTime = parseInt(21-((this.state.date.getTime()-myTimestamp))/60000)
    var hoursElapsed = parseInt((this.state.date.getTime()-myTimestamp)/3600000)
    var minutesElapsed = parseInt(((this.state.date.getTime()-myTimestamp)/60000)%60)

    if(this.props.status==="empty"){
      return (
        <div>
          <text>
          {t('status')}: &nbsp;
          </text>
          <text style={{color:"LightCoral"}}>
          {t('tea_ran_out')} {"\n"}
          </text>        
          <text>
          {t('ready_in')}
            {"\n"}
          </text>
          <text>
          {t('last_brewing_time')} {"\n"}
            {hoursElapsed> 0 &&
            <span className="highlight">
              {hoursElapsed} {t('hours')}
            </span>
            }
            {minutesElapsed >0 &&
            <span className="highlight">
              {' '}{minutesElapsed} {t('minutes')}        
            </span>
            }
            { 
              (hoursElapsed > 0 || minutesElapsed > 0) ?           
              <span className="highlight">
              {' '}{t('ago')}        
              </span>:
              <span className="highlight">{t('now')}</span>
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
            {t('status')}: &nbsp;
            </text>
            <text style={{color:"Orange"}}>
            {t('getting_ready')} {"\n"}
            </text>        
            <text>
            {t('ready_in')} &nbsp;
              <span className="highlight">
                {remainingTime} {t('minutes')} 
              </span>
              {"\n"}
            </text>
            <text>
            {t('last_brewing_time')} {"\n"}
              {hoursElapsed > 0 &&
              <span className="highlight">
                {hoursElapsed} {t('hours')}
              </span>
              }
              {minutesElapsed >0 &&
              <span className="highlight">
                {' '}{minutesElapsed} {t('minutes')}        
              </span>
              }
              { 
                (hoursElapsed > 0 || minutesElapsed > 0) ?            
                <span className="highlight">
                {' '}{t('ago')}        
                </span>:
                <span className="highlight">{t('now')}</span>
                
              }                                     
              
            </text>          
          </div>
          
        );      
      }
      else{
        return (
          <div>
            <text>
            {t('status')} : &nbsp;
            </text>
            <text style={{color:"DeepSkyBlue"}}>
            {t('ready')} {"\n"}
            </text>         
            <text>
            {t('ready_in')}:{"\n"}
            </text>
            <text>
              {t('last_brewing_time')} {"\n"}
              {hoursElapsed> 0 &&
              <span className="highlight">
                {hoursElapsed} {t('hours')}
              </span>
              }
              {minutesElapsed >0 &&
              <span className="highlight">
                {' '}{minutesElapsed} {t('minutes')}       
              </span>
              }
              { 
                (hoursElapsed > 0 || minutesElapsed > 0) ?            
                <span className="highlight">
                {' '} {t('ago')}     
                </span>
                :
                <span className="highlight">{t('now')}</span>
                

              }                           
            </text>             
          </div>
          
        );
      }
      
    }
  }
}

export default  withTranslation()(LiveClockUpdate);
