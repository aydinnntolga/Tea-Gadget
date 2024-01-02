import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import i18n from './resource';


function Home() {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    sessionStorage.setItem('language', lng);
  };

  const handleClick = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
    changeLanguage(newLanguage);
  };

  React.useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage && storedLanguage !== i18n.language) {
      changeLanguage(storedLanguage);
    }
  }, []);

  const redirectToCASLogin = () => {
    const serviceUrl = encodeURIComponent('http://localhost:3000/admin');
    const casLoginUrl = `https://login.sabanciuniv.edu/cas/login?service=${serviceUrl}`;
    window.location.href = casLoginUrl;
  };
  

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <button onClick={redirectToCASLogin} className='languageButton' style={{marginInline:20}}>
          Login
        </button>
        <button onClick={handleClick} className='languageButton'>
          {t('language')}
        </button>
      </div>
      <header className="App-header">
        <p className="Title">{t('tea_room_gadget')}</p>
      </header>
      <p className='secondTitle'>
        {t('buildings')}
      </p>
      <form action="/tearooms/:FENS" method="post" className="form" name='buildingname'>

          <button value={"FENS"} className='facultybutton'>
              FENS                   
          </button>
      </form>
      <form action="/tearooms/:FASS" method="post" className="form" name='buildingname'>
          <button value={"FASS"} className='facultybutton'>
              FASS                   
          </button>
      </form>
      <form action="/tearooms/:FMAN" method="post" className="form" name='buildingname'>
          <button value={"FMAN"} className='facultybutton'>
              FMAN                   
          </button>
      </form>
      <form action="/tearooms/:SL" method="post" className="form" name='buildingname'>
          <button value={"SL"} className='facultybutton'>
              SL                   
          </button>
      </form>
      <br></br>
      
    </div>
  );
}

export default Home;
