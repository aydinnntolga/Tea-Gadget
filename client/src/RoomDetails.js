import './App.css';
import cauldron from './Images/Cauldron.png'

function RoomDetails() {
  return (
    <body>
      <div className="App">
        <header className="App-header">
          <p className="Title"> TEA ROOM GADGET </p>        
        </header>

        <p className='secondTitle'>
          Room 2000
        </p>

        <div className="roomdetail">
            Status: {"\n"}  
            Tea is ready {"\n"}
            Temperature: 100 °C  {"\n"}
            Last brewing time: {"\n"}
            30 Minutes Ago          
        </div>
        <img style={{width:"100px",height:"160px"}} src={cauldron}></img>
         
      </div> 
      <form action="../../post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
        </form>      
    </body>


    
  );
}

export default RoomDetails;
