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

  const [roomIndex, setIndex] = useState("");
  const updateRoomIndex = (index)=>{

    if(index === roomIndex){
      setIndex("");
    }
    else{
      setIndex(index)
    }
  }

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

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
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              {data.map((item) => (
                <button className="roombutton" onClick={() => updateRoomIndex(item.room_number.toString())}>

                <div className='roomheader'>
                  {t('room')} {item.room_number} {"\n"}
                  {t('floor')} { item.floor}{"\n"}

                </div>
                
                { roomIndex === item.room_number.toString() ?(
                  
                  <div>
                    {item.drinks.map((drink,index) => (
                      <div>
                        {index===0?
                        <LiveClockUpdate 
                        time={drink.sincelastbrew} 
                        date={drink.sincelastbrew} 
                        status={drink.cauldron_status} 
                        drinkname= {drink.drink_name}
                        preptime= {drink.prep_time}
                        teafullness = {item.teafullness}
                        waterfullness = {item.waterfullness}
                        />
                        :
                        <LiveClockUpdate 
                        time={drink.sincelastbrew} 
                        date={drink.sincelastbrew} 
                        status={drink.cauldron_status} 
                        drinkname= {drink.drink_name}
                        preptime= {drink.prep_time}
                        />
                        }

                        <ColoredLine color="#93abc1" />
                      </div>
                    ))}
                    
                  </div>
                  
                ):<text>

                </text>
                }
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
