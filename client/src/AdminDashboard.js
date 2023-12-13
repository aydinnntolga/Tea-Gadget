import React,{useState,useEffect} from 'react';
import './AdminDashboard.css';
import axios from 'axios';
import 'chart.js/auto';
import { Bar,Line,Pie } from 'react-chartjs-2';
import LogoutIcon from './Images/Logout.png';

function AdminDashboard() {
  const [roomIndex, setIndex] = useState(0);
  const updateRoomIndex = (index)=>{
    setIndex(index);
  }

  return (
    <div className="admin-dashboard">
      <Sidebar updateRoomIndex={updateRoomIndex} roomIndex={roomIndex}  />
      <div className="main-content">
        <MainContent roomIndex={roomIndex} />
        
      </div>

    </div>
  );
}

function handleLogout() {
  window.location.href = 'https://login.sabanciuniv.edu/cas/logout';
}

function Sidebar({ updateRoomIndex, roomIndex }) {
  
  return (
    <div className="sidebar">
      <ul style={{display: 'flex', flexDirection: 'column', height: '85%'}}>
        <li style={{cursor:'pointer', background: roomIndex===0? '#4a5865':'none'}}>
        <a href='/' style={{padding:10}} onClick={(e) =>{
            e.preventDefault();
            updateRoomIndex(0);
            }}>FENS 2044</a>
        </li>
        
        <li style={{cursor:'pointer',  background: roomIndex===1? '#4a5865':'none'}}  >
          <a href='/' style={{padding:10}} onClick={(e) =>{
            e.preventDefault();
            updateRoomIndex(1);
            }}>FASS 2020</a>
        </li>
        

      </ul>
      <a href='https://login.sabanciuniv.edu/cas/logout' onClick={handleLogout} style={{alignItems:'center',display: 'flex',height:'10%',textDecoration: 'none'}}>
        <img src={LogoutIcon} style={{width:20,height:20,paddingLeft:10}} alt='Log out'></img>
        <text style={{marginLeft:5,color:'white'}}>Log Out</text>
      </a>
    </div>
  );
}



function MainContent({ roomIndex }) {

  const [data, setData] = useState(null);
  const [charType, setCharType] = useState('Bar');
  const [interval, setTimeInterval] = useState('Monthly');


  useEffect(() => {                        
    async function fetchData() {
      
      const response = await axios.get('/roomsData'); 
      setData(response.data);
    }
    fetchData();
  }, []);  //eslint-disable-line

  

  const updateCharType = (type) => {
    setCharType(type);
  };

  const updateTimeInterval = (interval) => {
    setTimeInterval(interval);
  }


  return (
    <div className="welcome-message">
      <h1>Admin Dashboard</h1>

      <div>
        <div style={{alignItems: 'center',display:'flex',justifyContent:'center'}}>
          <button className="sidebarRoomButton" onClick={() => updateTimeInterval('Monthly')}> Monthly </button>
          <button className="sidebarRoomButton" onClick={() => updateTimeInterval('Daily')}> Daily </button>
        </div>
      {data ?
        <div style={{height:400,display:'flex',justifyContent:'center',margin:20}} >

          {charType === "Bar"? (
              <Bar
              data={{
              labels: GetLabels(interval),
              datasets: [
                {
                  fill:true,
                  id: 1,
                  label: 'Brew Count',
                  data: countElements(data[roomIndex].brewhistory,interval),
                },
                
              ],
            }} />
          ):
          charType==="Line"?(
            <Line
              data={{
              labels: GetLabels(interval),
              datasets: [
                {
                  fill:true,
                  id: 1,
                  label: 'Brew Count',
                  data: countElements(data[roomIndex].brewhistory,interval),
                },
                
              ],
            }} />
          ):
          charType==="Pie"?(
            <Pie
              data={{
              labels: GetLabels(interval),
              datasets: [
                {
                  fill:true,
                  id: 1,
                  label: 'Brew Count',
                  data: countElements(data[roomIndex].brewhistory,interval),
                },
                
              ],
            }} />
          ):
          <text></text>
          }
              
    
        </div>
        :<text></text>}

      </div>

      {data ?
        <div style={{display:'flex',justifyContent:'center'}}>
          <button className="sidebarRoomButton" onClick={() => updateCharType('Bar')}> Bar Chart </button>
          <button className="sidebarRoomButton"onClick={() => updateCharType('Line')}> Line Chart </button>
          <button className="sidebarRoomButton"onClick={() => updateCharType('Pie')}> Pie Chart </button>
        </div>
        :<text>

        </text>
      }      

    </div>
  );
}

const GetLabels = (interval) => {
  var days = ["Sunday",'Monday','Tuesday',"Wednesday","Thursday","Friday","Saturday"];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  var orderedDays = ["","","","","","",""];
  var orderedMonths = ["","","","","","","","","","","",""];
  const currentDate = new Date();


  if(interval === "Daily"){
    var startingDayIndex = currentDate.getDay();
    for(let i=0;i<7;i++){
      orderedDays[6-i] = days[(startingDayIndex+7-i)%7]
    }
    return orderedDays

  }
  else{
    var startingMonthIndex = currentDate.getMonth();
    for(let i=0;i<12;i++){
      orderedMonths[11-i] = months[(startingMonthIndex+12-i)%12]
    }
    return orderedMonths
  }
  

}


const countElements = (dates,interval) => {

  if(interval === "Monthly"){
    const monthCount = [0,0,0,0,0,0,0,0,0,0,0,0];

    dates.forEach((date) => {
      const newDate = new Date(date);
      const monthKey = newDate.getMonth();
  
      monthCount[monthKey]++;
    });
  
    return monthCount;
  }
  else{
    const dayCount = [0,0,0,0,0,0,0]
    const currentDate = new Date()
    const startingIndex = 6-currentDate.getDay()
    const maxDifference = 7*24*60*60*1000
  
    dates.forEach((date)=>{
      const elementDate = new Date(date);
      if(currentDate.getTime()-elementDate.getTime()< maxDifference ){
  
        dayCount[(elementDate.getDay()+startingIndex)%7]++
  
      }
    })
    return dayCount
  }

  
}


export default AdminDashboard;
