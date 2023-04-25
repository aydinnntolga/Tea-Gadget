import './App.css';
import { useNavigate } from "react-router-dom";
import LiveClockUpdate from "./Components/LiveClockUpdate";
import queryString from 'query-string';

function TeaRooms(props) {

  const navigate = useNavigate();

  const gotodetails = () => {
    navigate('/roomdetails');
  };  

  let brewtime = new Date('2023-04-25T11:42:00')
  const queryParams = queryString.parse(window.location.search);
  const name = queryParams.name;
  const age = queryParams.age;  

  return (
    <body>
      <div>
        <LiveClockUpdate date={brewtime}/>{" "}
      </div>       
      <div className="App">
        <header className="App-header">
            <p className="Title"> TEA ROOM GADGET </p>        
        </header>

        <p className='secondTitle'>
            FENS Tea Rooms {age} {name}
        </p>

        <button onClick={gotodetails} className="roombutton">
            Floor: 2{"\n"}
            Room Number: 2000 {"\n"}
            Status: Ready {"\n"}
            Ready In: 0 Minutes
        </button>
        
        <button onClick={gotodetails} className="roombutton">
            Floor: 2 {"\n"}
            Room Number: 2000 {"\n"}
            Status: Not Ready {"\n"}
            Ready In: 10 Minutes                           
        </button>      

      </div> 
      

    </body>


    
  );
}

export default TeaRooms;
