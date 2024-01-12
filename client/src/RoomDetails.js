import './App.css';

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
         
      </div> 
      <form action="../../post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
        </form>      
    </body>


    
  );
}

export default RoomDetails;
