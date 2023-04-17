import './App.css';

function TeaRooms() {
  return (
    <body>
      <div className="App">
        <header className="App-header">
            <p className="Title"> TEA ROOM GADGET </p>        
        </header>

        <p className='secondTitle'>
            FENS Tea Rooms
        </p>

        <button className="roombutton">
            Floor: 2{"\n"}
            Room Number: 2000 {"\n"}
            Status: Ready {"\n"}
            Ready In: 0 Minutes
        </button>
        
        <button className="roombutton">
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
