import { Link, useLocation } from "react-router-dom";
import LangSwitch from "./langswitch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for texts
  const [texts, setTexts] = useState([]);
  const [textsLoading, setTextsLoading] = useState(true);
  const [textsError, setTextsError] = useState(null);
  
  // State for social media links
  const [socialLinks, setSocialLinks] = useState([]);
  const [linksLoading, setLinksLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch texts
        const textsResponse = await fetch('/api/texts');
        if (!textsResponse.ok) throw new Error(`HTTP error! status: ${textsResponse.status}`);
        const textsData = await textsResponse.json();
        setTexts(textsData);

        // Fetch social links
        const linksResponse = await fetch('/api/links');
        if (!linksResponse.ok) throw new Error(`HTTP error! status: ${linksResponse.status}`);
        const linksData = await linksResponse.json();
        setSocialLinks(linksData);
      } catch (err) {
        console.error('Error loading data:', err);
        setTextsError(err.message);
      } finally {
        setTextsLoading(false);
        setLinksLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get text by type and index
  const getTextByType = (type, index = 0) => {
    const textObjs = texts.filter(text => text.type === type);
    return textObjs[index] ? textObjs[index].content : '';
  };

  // Helper function to get social link by label
  const getSocialLink = (label) => {
    const linkObj = socialLinks.find(link => link.label.toLowerCase() === label.toLowerCase());
    return linkObj ? linkObj.url : '#';
  };

  const clickLogo = () => {
    navigate('/Acceuil');
  };  

  return (
    <nav className="w-full z-[1000] lg:mt-2 2xl:mt-3 4xl:mt-4 6xl:mt-5">
      <div className="w-full font-space items-center justify-between bg-gradient-to-r from-[#c23434] to-[#8e0d0d] lg:flex hidden lg:p-[10px] 4xl:p-[12px_10px] 6xl:p-[14px_12px] 7xl:p-[16px_13px]">
        {/* Social media icons */}
        <div className="flex items-center lg:gap-2 2xl:gap-3.5 1xl:gap-6 xl:ml-4 mr-0 6xl:ml-7 8xl:ml-10 1xl:ml-14">
          <a href={linksLoading ? "https://www.facebook.com/" : getSocialLink('facebook')}>
            <div className="bg-white py-[6px] px-[8px] xl:py-[6px] 2xl:py-[7px] 2xl:px-[11px] 6xl:py-[10px] 6xl:px-[13px] 8xl:py-[13px] 8xl:px-[16px] 1xl:py-[16px] 1xl:px-[20px]" style={{clipPath: "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)" }}>
              <img src="/pics/Facebook.svg" alt="Facebook" className="lg:h-[19px] lg:w-[19px] 2xl:w-[30px] 2xl:h-[30px] 4xl:w-[31px] 4xl:h-[31px] 6xl:w-[33px] 6xl:h-[33px] 8xl:h-[36px] 8xl:w-[36px] 1xl:h-[39px] 1xl:w-[39px]" />
            </div>
          </a>
          <a href={linksLoading ? "https://www.instagram.com/" : getSocialLink('instagram')}>
            <div className="bg-white py-[5px] px-[7px] 2xl:py-[6.5px] 2xl:px-[10.5px] 4xl:py-[7px] 6xl:py-[9.5px] 6xl:px-[12px] 8xl:py-[12.5px] 8xl:px-[15px] 1xl:py-[14px] 1xl:px-[19px]" style={{clipPath: "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)" }}>
              <img src="/pics/instagram.svg" alt="Instagram" className="lg:h-[22px] lg:w-[22px] 2xl:w-[31px] 2xl:h-[31px] 4xl:w-[32px] 4xl:h-[32px] 6xl:w-[34px] 6xl:h-[34px] 8xl:h-[37px] 8xl:w-[37px] 1xl:h-[43px] 1xl:w-[43px]" />
            </div>
          </a>
          <a href={linksLoading ? "https://www.tiktok.com/" : getSocialLink('tiktok')}>
            <div className="bg-white py-[6px] px-[8px] 2xl:py-[7px] 2xl:px-[11px] 6xl:py-[10px] 6xl:px-[13px] 8xl:py-[13px] 8xl:px-[16px] 1xl:py-[16px] 1xl:px-[20px]" style={{clipPath: "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)" }}>
              <img src="/pics/TikTok.svg" alt="TikTok" className="lg:h-[19px] lg:w-[19px] 2xl:w-[30px] 2xl:h-[30px] 4xl:w-[31px] 4xl:h-[31px] 6xl:w-[33px] 6xl:h-[33px] 8xl:h-[36px] 8xl:w-[36px] 1xl:h-[39px] 1xl:w-[39px]" />
            </div>
          </a>
        </div>
        
        <div className="flex flex-grow xl:justify-center items-center w-full">
          <img src="/pics/arrleft.svg" alt="" className="lg:h-[11px] xl:h-[12px] 2xl:h-[14px] 4xl:h-[16px] 6xl:h-[18px] 8xl:h-[22px] 1xl:h-[27px] w-auto lg:mr-2 lg:ml-1 3xl:ml-5 2xl:mr-4 5xl:mr-6 8xl:mr-7 1xl:mr-9" />
          <div className="flex items-center lg:gap-2 2xl:gap-4 4xl:gap-5 6xl:gap-6 8xl:gap-7 1xl:gap-8 text-white lg:text-[12px] xl:text-[13px] 2xl:text-[17px] 4xl:text-[19px] 6xl:text-[21px] 8xl:text-[25px] 1xl:text-[30px] font-medium">
            <img src="/pics/phone.svg" alt="" className="lg:h-[18px] lg:w-[18px] xl:h-[20px] xl:w-[26px] 2xl:h-[23px] 2xl:w-[29px] 4xl:h-[25px] 4xl:w-[32px] 6xl:h-[27px] 6xl:w-[34px] 8xl:h-[32px] 8xl:w-[37px] 1xl:h-[35px] 1xl:w-[40px]" />
            <a href={`tel:${getTextByType("num-téléphone", 0)}`}>
              <span className="lg:mr-3 md:mr-2">
                {textsLoading ? "05 36 716 777" : getTextByType("num-téléphone", 0)}
              </span>
            </a>
            <img src="/pics/phone.svg" alt="" className="lg:h-[18px] lg:w-[18px] xl:h-[20px] xl:w-[26px] 2xl:h-[23px] 2xl:w-[29px] 4xl:h-[25px] 4xl:w-[32px] 6xl:h-[27px] 6xl:w-[34px] 8xl:h-[32px] 8xl:w-[37px] 1xl:h-[35px] 1xl:w-[40px]" />
            <a href={`tel:${getTextByType("num-téléphone", 1)}`}>
              <span className="lg:mr-3 md:mr-2">
                {textsLoading ? "05 36 716 778" : getTextByType("num-téléphone", 1)}
              </span>
            </a>
            <img src="/pics/email.svg" alt="" className="lg:h-[18px] lg:w-[18px] xl:h-[20px] xl:w-[26px] 2xl:h-[22px] 2xl:w-[29px] 4xl:h-[24px] 4xl:w-[32px] 6xl:h-[26px] 6xl:w-[34px] 8xl:h-[30px] 8xl:w-[37px] 1xl:h-[34px] 1xl:w-[40px]" />
            <a href="mailto:CONTACT@AUTO48.MA"><span>CONTACT@AUTO48.MA</span></a>
          </div>
          <img src="/pics/arright.svg" alt="" className="lg:h-[11px] xl:h-[12px] 4xl:h-[16px] 6xl:h-[18px] 8xl:h-[22px] 1xl:h-[27px] w-auto 2xl:ml-4 3xl:ml-5 5xl:ml-6 8xl:ml-8 1xl:ml-9 lg:ml-2 lg:mr-1" />
        </div>
      </div>
      <div className="absolute lg:top-2 lg:ml-6 xl:ml-8 2xl:top-[13px] lg:right-[-55px] xl:right-[-50px] 2xl:right-[-45px] hidden lg:block">
        <LangSwitch />
      </div>

      <div className="w-full justify-center font-neo hidden lg:flex">
        <div className="xl:w-[60%] lg:w-[65%] 7xl:w-[57%] flex items-center justify-between relative top-9 3xl:top-10 5xl:top-11 6xl:top-12 7xl:top-13 8xl:top-14">
          <ul className="flex skew-x-[15deg] items-center list-none lg:gap-4 xl:gap-5 2xl:gap-10 5xl:gap-11 1xl:gap-12 lg:pl-10 xl:pl-11 3xl:pl-12 4xl:pl-[50px] 5xl:pl-[53px] 1xl:pl-[56px] 6xl:pl-[56px] 7xl:pl-[57px] lg:py-2 xl:py-3 2xl:py-4 3xl:py-[21px] 5xl:py-[23px] 6xl:py-[24px] 7xl:py-[25px] 8xl:py-[27px] 1xl:py-[29px] xl:mr-6 2xl:mr-4 3xl:mr-2">
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-r bg-[#c67070]"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#c67070] to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#c67070] to-transparent"></div>
            <li className="skew-x-[-15deg]">
              <Link to="/Acceuil" className={location.pathname === "/Acceuil" ? "text-red-600 lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]" : "text-[#32060699] lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]"}>ACCEUIL</Link>            
            </li>
            <li className="skew-x-[-15deg]">
              <Link to="/Apropos" className={location.pathname === "/Apropos" ? "text-red-600 lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]" : "text-[#32060699] lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]"}>A-PROPOS</Link>
            </li>
            <li className="skew-x-[-15deg]">
              <Link to="/Services" className={location.pathname === "/Services" ? "text-red-600 lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]" : "text-[#32060699] lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]"}>SERVICES</Link>
            </li>
          </ul>
          
          <div className="relative left-3 lg:top-0.5 2xl:top-1">
            <img src="/pics/Logo2.png" onClick={clickLogo} alt="Logo" className="w-[100px] h-[85px] xl:w-[115px] xl:h-[95px] 2xl:w-[130px] 2xl:h-[110px] 3xl:w-[140px] 3xl:h-[120px] 4xl:w-[150px] 4xl:h-[130px] 5xl:w-[170px] 5xl:h-[140px] 7xl:w-[200px] 7xl:h-[160px] 8xl:w-[220px] 8xl:h-[180px] 1xl:w-[250px] 1xl:h-[190px]" />
          </div>
          <ul className="flex skew-x-[-15deg] items-center list-none lg:gap-4 xl:gap-5 2xl:gap-10 5xl:gap-11 1xl:gap-12 lg:pr-8 xl:pr-11 3xl:pr-12 lg:py-2 xl:py-3 2xl:py-4 3xl:py-[21px] 5xl:py-[23px] 6xl:py-[24px] 7xl:py-[25px] 8xl:py-[27px] 1xl:py-[29px] 5xl:pr-[53px] 6xl:pr-[55px] 1xl:pr-[57px] 2xl:ml-4 lg:ml-6 3xl:ml-5">
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-r bg-[#c67070]"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-[#c67070] to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-l from-[#c67070] to-transparent"></div>
            <li className="skew-x-[15deg]">
              <Link to="/Nosprojets" className={location.pathname === "/Nosprojets" ? "text-red-600 lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]" : "text-[#32060699] lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]"}>NOS PROJETS</Link>
            </li>
            <li className="skew-x-[15deg]">
              <Link to="/Gallery" className={location.pathname === "/Gallery" ? "text-red-600 lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]" : "text-[#32060699] lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]"}>GALLERY</Link>
            </li>
            <li className="skew-x-[15deg]">
              <Link to="/Contact" className={location.pathname === "/Contact" ? "text-red-600 lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]" : "text-[#32060699] lg:text-[10px] 2xl:text-[12px] 3xl:text-[13px] 4xl:text-[15px] 5xl:text-[16px] 6xl:text-[18px] 7xl:text-[20px] 8xl:text-[22px] 1xl:text-[24px]"}>CONTACT</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex justify-between items-center mx-4 my-4 border border-red-700 p-1">
          <div>
            <LangSwitch />
          </div>
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="text-red-700 text-3xl"
          >
            <img src="/pics/menubtn.png" className="bx-x w-6 mr-2" alt="Menu" />
          </button>
        </div>
        
        <div className="flex justify-center mt-4 mb-2 md:mt-11">
          <img src="/pics/Logo2.png" className="w-[110px] h-[85px] md:w-[130px] md:h-[95px]" alt="Logo" />
        </div>
      </div>
      <div className={`fixed top-0 left-0 w-full h-full bg-gradient-to-b from-red-800 to-red-950 z-[2000] flex flex-col items-center justify-center transition-all duration-200 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <button 
          onClick={() => setIsMenuOpen(false)} 
          className="absolute top-4 right-5 text-white text-3xl sm:text-4xl p-1"
        >
          <i className="bx bx-x w-5"></i>
        </button>
        
        <div className="flex flex-col items-center xxs:gap-3 gap-3 font-neo text-[10px] xs:text-[12px] md:text-[13px] mg:text-[15px] w-[40%] sm:w-[30%] mg:w-[25%]">
          <Link 
            to="/Acceuil" 
            className={`text-${location.pathname === "/Acceuil" ? "red-700" : "white"} hover:text-gray-200 py-2 mg:py-3 w-full text-center border border-white ${location.pathname === "/Acceuil" ? "bg-white" : ""}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            ACCEUIL
          </Link>
          <Link 
            to="/Apropos" 
            className={`text-${location.pathname === "/Apropos" ? "red-700" : "white"} hover:text-gray-200 py-2 mg:py-3 w-full text-center border border-white ${location.pathname === "/Apropos" ? "bg-white" : ""}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            A PROPOS
          </Link>
          <Link 
            to="/Services" 
            className={`text-${location.pathname === "/Services" ? "red-700" : "white"} hover:text-gray-200 py-2 mg:py-3 w-full text-center border border-white ${location.pathname === "/Services" ? "bg-white" : ""}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            SERVICES
          </Link>
          <Link 
            to="/Nosprojets" 
            className={`text-${location.pathname === "/Nosprojets" ? "red-700" : "white"} hover:text-gray-200 py-2 mg:py-3 w-full text-center border border-white ${location.pathname === "/Nosprojets" ? "bg-white" : ""}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            NOS PROJETS
          </Link>
          <Link 
            to="/Gallery" 
            className={`text-${location.pathname === "/Gallery" ? "red-700" : "white"} hover:text-gray-200 py-2 mg:py-3 w-full text-center border border-white ${location.pathname === "/Gallery" ? "bg-white" : ""}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            GALLERY
          </Link>
          <Link 
            to="/Contact" 
            className={`text-${location.pathname === "/Contact" ? "red-700" : "white"} hover:text-gray-200 py-2 mg:py-3 w-full text-center border border-white ${location.pathname === "/Contact" ? "bg-white" : ""}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT
          </Link>
        </div>
        
        <div className="absolute top-[75%] flex justify-center items-center gap-4">
          <div className="flex items-center gap-1 xs:gap-2 1xl:gap-6">
            <a href={linksLoading ? "https://www.facebook.com/" : getSocialLink('facebook')}>
              <div className="bg-white py-[6px] px-[7px] xs:py-[7px] xs:px-[8px] 2xs:py-[8px] 2xs:px-[9px] sm:py-[9px] sm:px-[10px] md:py-[11px] md:px-[12px]" style={{clipPath: "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)" }}>
                <img src="/pics/Facebook.svg" alt="Facebook" className="h-[15px] w-[15px] xs:h-[17px] xs:w-[17px] 2xs:h-[19px] 2xs:w-[19px] sm:h-[21px] sm:w-[21px] md:h-[24px] md:w-[24px]" />
              </div>
            </a>
            <a href={linksLoading ? "https://www.instagram.com/" : getSocialLink('instagram')}>
              <div className="bg-white py-[6px] px-[7px] xs:py-[7px] xs:px-[8px] 2xs:py-[8px] 2xs:px-[9px] sm:py-[9px] sm:px-[10px] md:py-[11px] md:px-[12px]" style={{clipPath: "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)" }}>
                <img src="/pics/instagram.svg" alt="Instagram" className="h-[16px] w-[16px] xs:h-[18px] xs:w-[18px] 2xs:h-[20px] 2xs:w-[20px] sm:h-[22px] sm:w-[22px] md:h-[25px] md:w-[25px]" />
              </div>
            </a>
            <a href={linksLoading ? "https://www.tiktok.com/" : getSocialLink('tiktok')}>
              <div className="bg-white py-[6px] px-[7px] xs:py-[7px] xs:px-[8px] 2xs:py-[8px] 2xs:px-[9px] sm:py-[9px] sm:px-[10px] md:py-[11px] md:px-[12px]" style={{clipPath: "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)" }}>
                <img src="/pics/TikTok.svg" alt="TikTok" className="h-[15px] w-[15px] xs:h-[17px] xs:w-[17px] 2xs:h-[19px] 2xs:w-[19px] sm:h-[21px] sm:w-[21px] md:h-[24px] md:w-[24px]" />
              </div>
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-5 text-[12px] sm:text-[13px] md:text-[15px] mg:text-[17px] text-white text-center font-turretBold">
          <a href="https://softcactus.ma/" target="_blank" rel="noreferrer"><p>© SOFTCACTUS, TOUS LES DROITS <br/> SONT RÉSERVÉS, 2025</p></a>
        </div>
      </div>
    </nav>
  );
}