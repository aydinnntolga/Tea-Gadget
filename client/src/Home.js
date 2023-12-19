import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import i18n from './resource';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    navigate('/caslogin');    
  };
  

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
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
      <button onClick={redirectToCASLogin} className='loginButton'>
        Login to Admin Page
      </button>
    </div>
  );
}

export default Home;
