import { useTranslation } from 'react-i18next';
import './App.css';
import i18n from './resource'; 

var isChanged = false;

function Home() {
  const { t } = useTranslation();

  const handleClick = () => {

    if(i18n.language === 'tr'){
      i18n.changeLanguage('en');
      sessionStorage.setItem('language', 'en');
    }
    else{
      i18n.changeLanguage('tr');
      sessionStorage.setItem('language', 'tr');
    }
  };

  const storedLanguage = sessionStorage.getItem('language');
  if (storedLanguage && !isChanged) {
    i18n.changeLanguage(storedLanguage);
    isChanged = true;
  }

  return (
    <body>
             
      <div className="App">

        <div style={{ display: "flex" }}>
          <button onClick={handleClick} className='languageButton' > {t('language')} </button>

        </div>
        <br></br>
        <header className="App-header">
          <p className="Title"> {t('tea_room_gadget')} </p>        
        </header>

        <p className='secondTitle'>
          {t('buildings')}
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
