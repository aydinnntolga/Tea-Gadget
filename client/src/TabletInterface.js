import React, { useState, useEffect } from 'react';
import './TabletInterface.css'; // Ensure correct file path
import { useParams } from "react-router-dom";
import axios from 'axios';
import LiveClockUpdate from "./Components/LiveClockUpdate";
import { useTranslation } from 'react-i18next';
import './App.css';

function TabletInterface () {
  
  const { roomId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {                         // warninge sonra bak
    async function fetchData() {
      
      const response = await axios.get('/tablet-interface/:'+ roomId); 
      setData(response.data);
    }
    fetchData();
  }, []);  //eslint-disable-line

  const { t } = useTranslation();

  const addNewDrink = async () => {
    const headers = new Headers();
    headers.append('id', roomId);
    headers.append('drinkname', drinkname);
    headers.append('preptime',preptime);

    if(preptime !=null){
      try {
        await fetch('/addnewdrink', {
          method: 'POST',
          headers: headers,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else{
      alert("Sayı değeri girin")
    }

    
  };

  const deleteDrink = async (drinkname) =>{
    const response = window.confirm('Emin misin');
    if(response){
      const headers = new Headers();
      headers.append('id', roomId);
      headers.append('drinkname', drinkname);

      try {
        await fetch('/deletedrink', {
          method: 'POST',
          headers: headers,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }


  const [isEditActive, setEditMode] = useState(false);
  const updateEditMode = (mode)=>{
    setEditMode(mode);
  }

  const updatelastbrew = async (roomId,drinkname) => {

    const headers = new Headers();
    headers.append('id', roomId);
    headers.append('drinkname', drinkname);

    try {
      await fetch('/updatelastbrew', {
        method: 'POST',
        headers: headers,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const tearanout = async (roomId,drinkname) => {

    const headers = new Headers();
    headers.append('id', roomId);
    headers.append('drinkname', drinkname);

    try {
      await fetch('/tearanout', {
        method: 'POST',
        headers: headers,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [drinkname, setName] = useState('coffee');
  const [preptime, setTime] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      
      {data ?
        <div style={{width:"100%"}}>
          
          <div style={{marginTop:50}}></div>

          <header className="App-header">
            <p className="Title">  {data[0].roomId} </p>        
          </header>
          <br></br>

          {data.map((item) => (
            <div className='verticalContainer'>
              {item.drinks.map((drink,index) => (
                    <div className='horizontalContainer' style={{width:"100%"}}>
                      <div style={{width:"5%"}}></div>

                      <div style={{width:"20%"}}>
                        {isEditActive ===true ?
                          <form onSubmit={() =>updatelastbrew(item.roomId,drink.drink_name)}>
                            <button type="submit" className='facultybutton' style={{width:"100%",height:80}}>Başlat</button>
                          </form>
                          :<text></text>
                        }
                      </div>
                      
                      <button className="roombutton" style={{position:"relative",width:"50%"}}>
                        
                        {(index!==0 && isEditActive) ?
                          <div style={{position:"absolute",right:-5,top:-25}}>
                            <form onSubmit={() =>deleteDrink(drink.drink_name)}>
                              <button type='submit' className='facultybutton' style={{width:30,height:30,boxShadow:"none"}}>X</button>
                            </form>
                          </div>: <div></div>}
                        

                        <div className='roomheader' >
                          {t(drink.drink_name)}{"\n"}
                        </div>
                        <div>
                          <div>
                            <LiveClockUpdate 
                            time={drink.sincelastbrew} 
                            date={drink.sincelastbrew} 
                            status={drink.cauldron_status} 
                            />

                          </div>                      
                        </div>
                      </button> 
                      
                      <div style={{width:"20%"}}>
                        {isEditActive ===true ?
                          <form onSubmit={() =>tearanout(item.roomId,drink.drink_name)}>
                            <button type="submit" className='facultybutton' style={{width:"100%",height:80}}>Bitir</button>
                          </form>
                          :<text></text>
                        }
                      </div>
                      <div style={{width:"5%"}}></div>
                      
                    </div>
  
                  ))}

              {isEditActive === true ?(          
                  <div className="roombutton" style={{fontSize:20,lineHeight:"30px",padding:10}}>
                    <form onSubmit={() =>addNewDrink()}>
                        <label>
                          İçecek adı:{"\n"}
                          <select style={{width:100,height:30,fontSize:20}}  onChange={handleNameChange}>
                            <option value="coffee">{t('coffee')}</option>
                            <option value="turkish_coffee">{t('turkish_coffee')}</option>
                          </select>
                        </label>
                        <br />
                        <label>
                          Hazırlanma süresi (dakika):
                          <input type='number'defaultValue={0} min="0" max="100" onChange={handleTimeChange} style={{height:25,width:100,fontSize:20}}/>
                        </label>
                        <br />
                        <div className='verticalContainer'>
                          <button className='facultybutton' style={{width:150,height:40,fontSize:20}} type="submit">İçecek Ekle</button>
                        </div>
                    </form>     
                  </div>
                )
                :(<text></text>)
              }

              {isEditActive === true ?(
                <button className="facultybutton" onClick={() =>updateEditMode(false)} style={{margin:20,width:150,height:50}}> Tamamla </button>
              ):(
                <button className="facultybutton" onClick={() =>updateEditMode(true)} style={{margin:20,width:150,height:50}}> Düzenle </button>
              )}

            </div>
          ))}
        
      </div>
    
    
    
        :
        <text></text>
    }


    </div>
  );
};

export default TabletInterface;
