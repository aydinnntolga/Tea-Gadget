import './App.css';
import LiveClockUpdate from "./Components/LiveClockUpdate";
import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function TeaRooms(props) {

  const [data, setData] = useState(null);
  const { buildingname } = useParams();  

  useEffect(() => {                         // warninge sonra bak
    async function fetchData() {
      
      const response = await axios.get('/tearooms/:'+ buildingname); 
      setData(response.data);
    }
    fetchData();
  }, []);  //eslint-disable-line

  return (
    <body>     
      <div className="App">
        <header className="App-header">
            <p className="Title"> TEA ROOM GADGET </p>        
        </header>

        <p className='secondTitle'>
            {buildingname} Tea Rooms
        </p>

        <button className="roombutton">
            Floor: 2{"\n"}
            Room Number: {data? data.room: <text></text>} {"\n"}
            {data ? <LiveClockUpdate time={data.brewtime_millisecond} date={data.brewdate} />: 
            
            <text>
              Status:{"\n"}
              Ready In: {"\n"}
              Last Brewing Time: {"\n"} None
            </text>
            }
            
        </button>
                

      </div> 
      

    </body>


    
  );
}

export default TeaRooms;
