import './App.css';
import LiveClockUpdate from "./Components/LiveClockUpdate";
import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import i18n from './resource'; 
import { useTranslation } from 'react-i18next';

var isChanged = false;

function TeaRooms(props) {

  const [data, setData] = useState(null);
  const { buildingname } = useParams();
  const { t } = useTranslation();

  useEffect(() => {                         // warninge sonra bak
    async function fetchData() {
      
      const response = await axios.get('/tearooms/:'+ buildingname); 
      setData(response.data);
    }
    fetchData();
  }, []);  //eslint-disable-line

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
            <p className="Title">  {t('tea_room_gadget')} </p>        
        </header>

        <p className='secondTitle'>
            {buildingname} {t('tea_rooms')}
        </p>

        {data ? 
            <div>
              {data.map((item) => (
                <button className="roombutton">
                <div className='roomheader'>
                {t('room')} {item.room_number} {"\n"}
                {t('floor')} { item.floor}{"\n"}

                </div>
                

                <LiveClockUpdate time={item.sincelastbrew} date={item.sincelastbrew} status={item.cauldron_status} />
                  
                </button>            

              ))}        
            </div>
          :<text></text>
        }
                

      </div> 
      

    </body>


    
  );
}

export default TeaRooms;
