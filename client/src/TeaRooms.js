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

        {data ? 
            <div>
              {data.map((item) => (
                <button className="roombutton">
                <div className='roomheader'>
                  Room {item.room_number} {"\n"}
                  Floor { item.floor}{"\n"}

                </div>
                

                <LiveClockUpdate time={item.sincelastbrew} date={item.sincelastbrew} status={item.cauldron_status} />
                  
                </button>            

              ))}        
            </div>
          :<text></text>
        }
                

      </div> 
      

    </body>


    
  );
}

export default TeaRooms;
