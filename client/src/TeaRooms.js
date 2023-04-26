import './App.css';
import LiveClockUpdate from "./Components/LiveClockUpdate";
import queryString from 'query-string';
import React ,{useState,useEffect} from 'react';
import axios from 'axios';

function TeaRooms(props) {

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/tearooms');
      setData(response.data);
    }
    fetchData();
  }, []);  





  const queryParams = queryString.parse(window.location.search);
  const name = queryParams.name;
  const age = queryParams.age;  

  return (
    <body>     
      <div className="App">
        <header className="App-header">
            <p className="Title"> TEA ROOM GADGET </p>        
        </header>

        <p className='secondTitle'>
            FENS Tea Rooms {age} {name}
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
