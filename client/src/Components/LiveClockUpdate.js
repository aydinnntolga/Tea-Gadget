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
    const preptime = this.props.preptime

    const myTimestamp = new Date(this.props.time).getTime()
    const { t } = i18n
    var remainingTime = parseInt((preptime+1)-((this.state.date.getTime()-myTimestamp))/60000)
    var hoursElapsed = parseInt((this.state.date.getTime()-myTimestamp)/3600000)
    var minutesElapsed = parseInt(((this.state.date.getTime()-myTimestamp)/60000)%60)

    if(this.props.status==="empty" || remainingTime <-(12*60)){
      return (
        <div>
          {this.props.drinkname?
              <div className="verticalContainer">
                <text > {t(this.props.drinkname)} {"\n"}</text>
              </div>
            :<text></text>
          }
          <text>
          {t('status')}: &nbsp;
          </text>
          <text style={{color:"LightCoral"}}>
          {t('ran_out')} {"\n"}
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
            {this.props.drinkname?
              <div className="verticalContainer">
                <text > {t(this.props.drinkname)} {"\n"}</text>
              </div>
              :<text></text>
            }
            <text>
            {t('status')}: &nbsp;
            </text>
            <text style={{color:"Orange"}}>
            {t('getting_ready')} {"\n"}
            </text>        
            <text>
            {t('ready_in')}: &nbsp;
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
            {this.props.drinkname?
              <div className="verticalContainer">
                <text > {t(this.props.drinkname)} {"\n"}</text>
              </div>
              :<text></text>
            }
            <text>
            {t('status')} : &nbsp;
            </text>
            <text style={{color:"DeepSkyBlue"}}>
            {t('ready')} {"\n"}
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
            
            {this.props.teafullness?
              <div>
                {this.props.teafullness !==-1?
                  <text>
                      {t('tea_fullness')}: 
                     <span className="highlight">
                     {' '} {this.props.teafullness}% {"\n"}
                    </span>
                  </text>
                  :<div></div>
                }
              </div>
            :<div></div>}

            {this.props.waterfullness?
              <div>
              {this.props.waterfullness !==-1?
                <text>
                    {t('water_fullness')}:
                   <span className="highlight">
                   {' '} {this.props.waterfullness}% {"\n"}
                   </span>
                </text>
                :<div></div>
              }
              </div>
            :<div></div>}


          </div>
          
        );
      }
      
    }
  }
}

export default  withTranslation()(LiveClockUpdate);
