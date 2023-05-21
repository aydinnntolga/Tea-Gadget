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
        <form action="/tearooms/:FASS" method="post" className="form" name='buildingname'>

          <button value={"FASS"} className='facultybutton'>
              FASS                   
          </button>
        </form>
        <br></br>
        <form action="/tearooms/:FMAN" method="post" className="form" name='buildingname'>

          <button value={"FMAN"} className='facultybutton'>
              FMAN                   
          </button>
        </form>

        <form action='/updatelastbrew' method='post' className='form'>
          <button> Brew</button>
        </form>
        <form action='/tearanout' method='post' className='form'>
          <button> Tea Ran Out </button>
        </form>
        <form action='/teaready' method='post' className='form'>
          <button> Tea Ready </button>
        </form>
        </div> 
     
    </body>


    
  );
}

export default Home;
