import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import TeaRooms from './TeaRooms';
import RoomDetails from './RoomDetails';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CasLogin from './CasLogin';

import TabletInterface from './TabletInterface';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/roomdetails" element={<RoomDetails/>}/>
        <Route exact path="/tearooms/:buildingname" element={<TeaRooms/>}/>
        <Route path="/tablet-interface/:roomId" element={<TabletInterface/>}/> {/* New route */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path='/caslogin' element={<CasLogin/>} />
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
