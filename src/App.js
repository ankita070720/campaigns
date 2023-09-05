import React  from 'react';
import './App.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css fil
import Header from './Component/Header';
import CampaignsTable from './Component/CampaignsTable';
import Footer from './Component/Footer';
 
function App() {
  return (
 <><Header />
 <CampaignsTable/>
 <Footer/></>
  );
}

export default App;
