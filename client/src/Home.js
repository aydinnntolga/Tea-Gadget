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
        <form action="/tearooms" method="post" className="form">

          <button className="facultybutton">
              FENS                   
          </button>      
          <br></br>
          <br></br>
          <button className="facultybutton">
              FASS
          </button>
          <br></br>
          <br></br>
          <button className="facultybutton">
              FMAN
          </button>

        </form>         

        <form action='/updatelastbrew' method='post' className='form'>
          <button> Brew</button>
        </form>

        </div> 
     
    </body>


    
  );
}

export default Home;
