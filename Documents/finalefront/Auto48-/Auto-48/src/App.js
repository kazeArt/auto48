import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'; 
import Navbar from './components/navbar';
import PressHere from './components/presshere';
import Acceuil from './components/acceuil';
import Apropos from './components/apropos';
import Services from './components/services';
import Nosprojets from './components/nosprojets';
import Gallery from './components/gallery';
import Contact from './components/contact';

function Mainpage({ introIsComplete }) { 
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (introIsComplete && location.pathname === '/') {
      console.log("Intro complete, navigating to /Acceuil");
      navigate('/Acceuil', { replace: true });
    }
  }, [introIsComplete, location.pathname, navigate]);


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/Acceuil" element={<Acceuil />} />
        <Route path="/Apropos" element={<Apropos />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Nosprojets" element={<Nosprojets />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

function App() {
  const [introFinished, setIntroFinished] = useState(
    () => sessionStorage.getItem('introSeen') === 'true'
  );

  const handleIntroComplete = () => {
    console.log("Intro marked as complete, hiding overlay.");
    setIntroFinished(true);
    sessionStorage.setItem('introSeen', 'true'); 
  };

  return (
    <div className="relative">
      <div className="relative z-0"> 
         <Mainpage introIsComplete={introFinished} />
      </div>
      {!introFinished && (
        
        <div className="fixed inset-0 z-[1000]">
          <PressHere onComplete={handleIntroComplete} />
        </div>
      )}
    </div>
  );
}

export default App;