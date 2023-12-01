import React,{useState,useEffect} from 'react';
import './AdminDashboard.css';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Bar,Line,Pie } from 'react-chartjs-2';

function AdminDashboard() {

  

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <MainContent />
        
      </div>

    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#">FENS 2044</a></li>
        <li><a href="#">FENS 1000</a></li>
        <li><a href="#">FASS 1050</a></li>
        <li><a href="#">FMAN 1021</a></li>
        <li><a href="#">FMAN 2021</a></li>

      </ul>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <a href="/logout">Log Out</a>
    </div>
  );
}


function MainContent() {

  const [data, setData] = useState(null);
  const [charType, setVariableValue] = useState('Bar');

  useEffect(() => {                        
    async function fetchData() {
      
      const response = await axios.get('/roomsData'); 
      setData(response.data);
    }
    fetchData();
  }, []);  //eslint-disable-line

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

  const updateValue = (newValue) => {
    setVariableValue(newValue);
  };

  return (
    <div className="welcome-message">
      <h1>Admin Dashboard</h1>

      {data ?
        <div style={{display:'flex',justifyContent:'center'}}>
          {data.map((item) => (
                <button className="roombutton" > {item.faculty_name} {item.room_number} </button>
            ))}
        </div> 
        :<text></text>
        }

      {data ?
        <div style={{height: 400,display:'flex',justifyContent:'center',margin:20}}>

          {charType === "Bar"? (
              <Bar
              data={{
              labels: months,
              datasets: [
                {
                  fill:true,
                  id: 1,
                  label: 'Brew Count',
                  data: countElementsByMonth(data[0].brewhistory),
                },
                
              ],
            }} />
          ):
          charType==="Line"?(
            <Line
              data={{
              labels: months,
              datasets: [
                {
                  fill:true,
                  id: 1,
                  label: 'Brew Count',
                  data: countElementsByMonth(data[0].brewhistory),
                },
                
              ],
            }} />
          ):
          charType==="Pie"?(
            <Pie
              data={{
              labels: months,
              datasets: [
                {
                  fill:true,
                  id: 1,
                  label: 'Brew Count',
                  data: countElementsByMonth(data[0].brewhistory),
                },
                
              ],
            }} />
          ):
          <text></text>
          }
              
    
        </div>
        :<text></text>}

      <div style={{display:'flex',justifyContent:'center'}}>
        <button className="roombutton" onClick={() => updateValue('Bar')}> Bar Chart </button>
        <button className="roombutton"onClick={() => updateValue('Line')}> Line Chart </button>
        <button className="roombutton"onClick={() => updateValue('Pie')}> Pie Chart </button>
      </div>
      

    </div>
  );
}


const countElementsInLastWeek = (dates) => {
  const dayCount = [0,0,0,0,0,0,0]
  const currentDate = new Date()
  const maxDifference = 7*24*60*60*1000

  dates.forEach((date)=>{
    const elementDate = new Date(date);
    if(currentDate.getTime-elementDate.getTime < maxDifference ){

      dayCount[elementDate.getDay-1]++

    }
    else{
      
    }

  })

  return dayCount
}


const countElementsByMonth = (dates) => {
  const monthCount = [0,0,0,0,0,0,0,0,0,0,0,0];

  dates.forEach((date) => {
    const newDate = new Date(date);
    const monthKey = newDate.getMonth();

    monthCount[monthKey]++;
  });

  return monthCount;
};

export default AdminDashboard;
