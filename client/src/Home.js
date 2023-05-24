import './App.css';

function Home() {
  
  return (
    <body>
             
      <div className="App">
        <header className="App-header">
          <p className="Title"> TEA ROOM GADGET </p>        
        </header>

        <p className='secondTitle'>
          Buildings
        </p>
        <form action="/tearooms/:FENS" method="post" className="form" name='buildingname'>

          <button value={"FENS"} className='facultybutton'>
              FENS                   
          </button>
        </form>
        <br></br>        
      </div> 
     
    </body>


    
  );
}

export default Home;
