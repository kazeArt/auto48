import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServiceCarousel from './servicecarousel';
import HomePga from '../comp/homepage';

export default function Acceuil() {

  const navigate = useNavigate();
  const [revealAfterBeforePic, setRevealAfterBeforePic] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const imageContainer = useRef(null);

  // State for texts
  const [contentData, setContentData] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState(null);

  const [partenaires, setPartenaires] = useState([]);
  const [partenairesLoading, setPartenairesLoading] = useState(true);
  const [partenairesError, setPartenairesError] = useState(null);

// Fetch partners from API
useEffect(() => {
  const fetchPartenaires = async () => {
    try {
      setPartenairesLoading(true);
      const response = await fetch('https://auto48softcactus.wuaze.com/api/partenaires');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Process image URLs to use your domain
      const processedPartenaires = data.map(partenaire => {
        const imageUrl = partenaire.file_path 
          ? `https://auto48softcactus.wuaze.com/public/uploads/partenaires/${partenaire.file_path}`
          : '/pics/default-partenaire.png';

        return {
          ...partenaire,
          file_path: imageUrl,
          link: partenaire.link || '#',
          name: `Partner ${partenaire.id}`
        };
      });

      setPartenaires(processedPartenaires);
    } catch (err) {
      console.error('Failed to fetch partenaires:', err);
      setPartenairesError(err.message);
      setPartenaires([
        {
          id: 1,
          file_path: 'https://auto48softcactus.wuaze.com/pics/default-partenaire.png',
          link: '#',
          name: 'Error Loading'
        }
      ]);
    } finally {
      setPartenairesLoading(false);
    }
  };

  fetchPartenaires();
}, []);

  // Fetch content data from API
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        setContentLoading(true);
        const response = await fetch('/api/texts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContentData(data);
        setContentError(null);
      } catch (err) {
        console.error('Failed to fetch content data:', err);
        setContentError(err.message);
      } finally {
        setContentLoading(false);
      }
    };

    fetchContentData();
  }, []);

  // Helper function to get content by type
  const getTextByType = (type, index = 0) => {
    if (!contentData || contentData.length === 0) return '';
    const filtered = contentData.filter(t => t.type === type);
    return filtered[index]?.content || '';
  };


  const slide = (xPosition) => {
    if (imageContainer.current) {
      const containerBoundingRect = imageContainer.current.getBoundingClientRect();
      const newRevealValue = (xPosition - containerBoundingRect.left) / containerBoundingRect.width;
      setRevealAfterBeforePic(Math.min(Math.max(newRevealValue, 0), 1));
    }
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        slide(event.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (event) => {
      if (isDragging && event.touches.length > 0) {
        slide(event.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const handleClick = () => {
    navigate("/"); 
  };

  return (
    <div className='w-full overflow-x-clip'  >
      <div className='text-center relative transform -translate-x-1/2 left-1/2 p-[13px_5px] md:p-[13px_10px] z-10 font-turretBold text-[#320606] 
      text-[13px] xs:text-[15px] sm:text-[18px] md:text-[20px] lg:text-[17px] xl:text-[19px] 2xl:text-[22px] 3xl:text-[24px] 4xl:text-[26px] 5xl:text-[28px] 6xl:text-[30px] 7xl:text-[33px]
      8xl:text-[36px] 9xl:text-[39px] 1xl:text-[42px] w-[80%] xs:w-[70%] sm:w-[60%]  lg:w-[58%] xl:w-[50%] 2xl:w-[50%] 3xl:w-[47%] 4xl:w-[45%] 
      top-[16px] md:top-[50px]  lg:top-[65px] xl:top-[70px] 2xl:top-[75px] 3xl:top-[90px] 6xl:top-[100px]  8xl:top-[120px] 1xl:top-[150px]
      border-b-[1.5px] border-t-[1.5px]   border-transparent'
      style={{
        borderImage: "linear-gradient(to right,transparent, rgb(214, 28, 28), rgb(214, 28, 28), transparent) 1", 
      }}>
        Votre atelier de confiance pour la mécanique générale, l'électricité auto, la tôlerie-peinture et le pneumatique
      </div>
      <div 
        className='relative md:top-[50px] top-[14px] 3xl:top-[60px] z-1' 
        ref={imageContainer}
      >
        <img
          src='/pics/car1.jpg' 
          alt='before car' 
          className='w-full md:h-[400px] lg:h-[500px] xl:h-[550px] 2xl:h-[650px] xs:h-[200px] h-[180px] sm:h-[300px] 3xl:h-[700px] 4xl:h-[750px] 5xl:h-[800px]
                     6xl:h-[900px] 7xl:h-[1000px]  8xl:h-[1100px] 9xl:h-[1200px] 1xl:h-[1300px] m-0' />
                <div className="absolute top-0 left-0 w-full md:h-[70px] xs:h-[50px] h-[40px] sm:h-[75px] xl:h-[100px] 2xl:h-[130px] 3xl:h-[150px] 4xl:h-[160px] pointer-events-none"
                      style={{
                      backdropFilter: "blur(0.5px)",
                      WebkitBackdropFilter: "blur(0.5px)",
                      background: "linear-gradient(to bottom , rgba(255,255,255,0.9),transparent)"
                    }} />
        <img 
          src='/pics/car2.jpg' 
          alt='after car' 
          className='w-full md:h-[400px] lg:h-[500px] xl:h-[550px] sm:h-[300px] 2xl:h-[650px] xs:h-[200px] h-[180px] 3xl:h-[700px] 4xl:h-[750px] 5xl:h-[800px] 6xl:h-[900px] 7xl:h-[1000px]  8xl:h-[1100px]
           9xl:h-[1200px] 1xl:h-[1300px] absolute inset-0 ' 
          style={{clipPath: `polygon(0 0, ${revealAfterBeforePic * 100}% 0, ${revealAfterBeforePic * 100}% 100%, 0 100%)`}} />
                 <div className="absolute top-0 left-0 w-full md:h-[130px] sm:h-[75px] h-[40px] xs:h-[50px] xl:h-[160px] 2xl:h-[190px] 3xl:h-[210px] 4xl:h-[240px] pointer-events-none" 
                      style={{
                      backdropFilter: "blur(1.5px)",
                      WebkitBackdropFilter: "blur(1px)",
                      background: "linear-gradient(to bottom , rgba(255,255,255,0.9), transparent)"
                    }} />
        <div 
          className='absolute inset-y-0' 
          style={{ left: `${revealAfterBeforePic * 100}%` }}
        >
          <div className='relative h-full'>
            <div 
              className='absolute top-0 left-1/2 w-[2px] lg:w-[3px] 3xl:w-[4px] 6xl:w-[5px] 1xl:w-[6px] h-full bg-white transform -translate-x-1/2'
            ></div>
            <div 
              className='absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 sm:w-[35px] sm:h-[35px] w-[30px] h-[30px] md:h-[50px]  md:w-[50px]
              xl:h-[52px]  xl:w-[52px] 2xl:h-[55px]  2xl:w-[55px] 3xl:h-[60px] 3xl:w-[60px] 4xl:w-[70px] 4xl:h-[70px] 5xl:w-[80px] 5xl:h-[80px]
              6xl:w-[90px] 6xl:h-[90px] 7xl:w-[100px] 7xl:h-[100px] 8xl:w-[110px] 8xl:h-[110px] 9xl:w-[120px] 9xl:h-[120px] 1xl:w-[130px] 1xl:h-[130px] bg-white rounded-full cursor-pointer'
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
            >
              <img src='/pics/arrows.png' className='relative w-5 h-2 sm:w-6 sm:h-[10px] md:w-[27px] md:h-[13px] lg:w-[29px] lg:h-[14px]
                xl:w-[31px] xl:h-[14px] 2xl:w-[33px] 2xl:h-[15px] 3xl:w-[35px] 3xl:h-[16px] md:top-[18px] md:left-[11px] lg:top-[17px] xl:top-[18px] xl:left-[10px] top-[10px] left-[5px] sm:top-[12px] sm:left-[5px] 
                4xl:w-[38px] 4xl:h-[17px] 5xl:w-[41px] 5xl:h-[20px] 6xl:w-[46px] 6xl:h-[22px] 7xl:w-[50px] 7xl:h-[25px] 8xl:w-[56px] 8xl:h-[27px] 9xl:w-[62px] 9xl:h-[29px] 1xl:w-[68px] 1xl:h-[32px]
                2xl:top-[19px] 2xl:left-[11px] 3xl:top-[20px] 3xl:left-[12px] 4xl:top-[24px] 4xl:left-[15px] 5xl:top-[27px] 5xl:left-[18px] 6xl:top-[32px] 6xl:left-[20px]
                7xl:top-[34px] 7xl:left-[24px] 8xl:top-[37px] 8xl:left-[25px] 9xl:top-[40px] 9xl:left-[27px] 1xl:top-[45px] 1xl:left-[29px]' alt="Arrows" />
            </div>
          </div>
        </div>
      </div>
      {/* ========== HORIZONTAL SCROLL SECTION ========== */}
<div className="overflow-x-hidden whitespace-nowrap bg-black py-[5px] sm:py-[10px] md:py-4 2xl:py-[24px] 3xl:py-[24px]
  4xl:py-[26px] 5xl:py-[30px] 6xl:py-[35px] 7xl:py-[40px] 8xl:py-[45px] 9xl:py-[50px] mt-[13px] md:mt-10 2xl:mt-[50px] 
  3xl:mt-14 4xl:mt-15 5xl:mt-15.5 group">
  {partenairesLoading ? (
    <div className="text-white text-center py-4">Loading partners...</div>
  ) : (
    <div className="flex animate-loop-scroll w-max group-hover:[animation-play-state:paused]">
      {/* Double the items for seamless looping */}
      {[...Array(2)].map((_, i) => (
        <div key={`row-${i}`} className="flex">
          {partenaires.map((partenaire) => (
            <div 
              key={`${i}-${partenaire.id}`}
              className="mx-[20px] sm:mx-[30px] md:mx-[50px] 3xl:mx-[70px] 4xl:mx-[90px] 5xl:mx-[120px]
                     6xl:mx-[130px] 7xl:mx-[140px] 8xl:mx-[150px] 9xl:mx-[180px] flex-shrink-0"
            >
              <a 
                href={partenaire.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-black p-2 rounded-lg w-[60px] h-[40px] sm:w-[100px] sm:h-[55px] 
                       md:w-[120px] md:h-[70px] 3xl:w-[140px] 3xl:h-[95px] 4xl:w-[160px] 4xl:h-[105px] 
                       5xl:w-[180px] 5xl:h-[115px] 6xl:w-[200px] 6xl:h-[125px] 7xl:w-[220px] 7xl:h-[135px] 
                       8xl:w-[240px] 8xl:h-[145px] 9xl:w-[270px] 9xl:h-[195px]"
              >
                <img 
                  src={partenaire.file_path}
                  alt={partenaire.name}
                  className="w-full h-full"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                    display: 'block'
                  }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://auto48softcactus.wuaze.com/pics/default-partenaire.png';
                    e.target.onerror = null;
                  }}
                />
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  )}
</div>
      {/* ========== HORIZONTAL SCROLL SECTION ========== */}
      <div className="w-[170px] sm:w-[210px] mt-6 sm:mt-7 -left-7 mb-2 relative md:hidden z-100">
  <img src="/pics/carg.gif" alt="car icon" />
</div>

<div className="absolute top-[400px] md:top-auto  left-0 right-0 w-full">
  <div className="flex justify-between top-0 md:top-auto items-center z-1">
    <img src="/pics/carwheelpat1.png" alt="car wheel pattern" className="w-[45%] xl:h-[800px] h-[500px] " />
    <img src="/pics/carwheelpat.png" alt="car wheel pattern" className="w-[45%] xl:h-[800px] h-[500px] " />
  </div>
</div>
<div className="absolute  left-0 right-0 w-full">
  <div className="absolute top-[20px] xl:top-[30px] 2xl:top-[40px] 3xl:top-[60px] 4xl:top-[70px] 5xl:top-[80px]
  6xl:top-[90px] 7xl:top-[100px] 8xl:top-[110px] 9xl:top-[120px] 1xl:top-[130px]
  justify-evenly  md:mb-8 left-0 right-0 flex items-center w-full md:mt-10 ">     
    <div className="flex items-center">
	       <div className="lg:m-[10px] mr-2 sm:mr-3 ">
		          <img src="/pics/design-r1.png" alt="Design" className=" w-[95px] h-[20px] xs:w-[130px] xs:h-[21px] 2xs:w-[160px] 2xs:h-[23px] sm:h-[26px] sm:w-[185px]
              md:w-[100px] md:h-[23px] lg:h-[26px] lg:w-[125px] 2xl:w-[160px] 2xl:h-[40px] 3xl:w-[170px] 3xl:h-[41px] 4xl:w-[185px] 4xl:h-[43px]
              5xl:w-[180px] 5xl:h-[50px] 6xl:w-[190px] 6xl:h-[60px] 7xl:w-[200px] 7xl:h-[65px] 8xl:w-[220px] 8xl:h-[70px] 9xl:w-[230px] 9xl:h-[80px]
              1xl:w-[260px] 1xl:h-[88px]" />       
	       </div>     
	       <div className="whitespace-nowrap text-[#320606] font-neo font-light text-[18px] xs:text-[21px] 2xs:text-[24px] sm:text-[28px] md:text-[24px] 
              lg:text-[27px] 2xl:text-[36px] 3xl:text-[39px] 4xl:text-[44px] 5xl:text-[49px] 6xl:text-[52px] 7xl:text-[58px] 8xl:text-[62px]
              9xl:text-[66px] 1xl:text-[75px]">
              QUI SOMMES <span style={{color:"#a71818"}}>NOUS</span>
	       </div>
	       <div className="lg:m-[10px] ml-2 sm:ml-3">         
			        <img src="/pics/design-r.png" alt="Design" className=" w-[95px] h-[20px] xs:w-[130px] xs:h-[21px] 2xs:w-[160px] 2xs:h-[23px] sm:h-[26px] sm:w-[185px]
              md:w-[100px] md:h-[23px] lg:h-[26px] lg:w-[125px] 2xl:w-[160px] 2xl:h-[40px] 3xl:w-[170px] 3xl:h-[41px] 4xl:w-[185px] 4xl:h-[43px]
              5xl:w-[180px] 5xl:h-[50px] 6xl:w-[190px] 6xl:h-[60px] 7xl:w-[200px] 7xl:h-[65px] 8xl:w-[220px] 8xl:h-[70px] 9xl:w-[230px] 9xl:h-[80px]
              1xl:w-[260px] 1xl:h-[88px]" />       
		     </div>     
	  </div>   
  </div>
</div>

<div className="flex top-7 xs:top-8 2xs:top-9 sm:top-[50px] md:mt-[120px] 2xl:mt-[160px] 3xl:mt-[180px] 4xl:mt-[240px]
  5xl:mt-[245px] 6xl:mt-[275px] 7xl:mt-[305px] 8xl:mt-[335px] 9xl:mt-[365px] 1xl:mt-[395px] md:justify-center mx-7  md:mx-3 md:mb-5 lg:items-center  relative mt-2  w-full" >
  <div className="flex flex-col md:flex-row items-start gap-[50px] md:gap-[40px] lg:gap-[70px] xl:gap-[80px] 2xl:gap-[90px]
  3xl:gap-[100px] 4xl:gap-[110px] 5xl:gap-[120px] 6xl:gap-[130px] 7xl:gap-[140px] 8xl:gap-[150px] 9xl:gap-[160px]
  1xl:gap-[180px]">
    <div>
      <img src="/pics/apr-pic.png" alt="a propos picture" className="md:ml-3 mg:ml-0 md:w-[330px] md:h-[310px] mg:w-[370px] mg:h-[330px] lg:w-[420px] lg:h-[390px] xl:w-[470px] xl:h-[400px] 
      2xl:w-[600px] 2xl:h-[490px] 3xl:w-[700px] 3xl:h-[560px] 4xl:w-[750px] 4xl:h-[600px] 5xl:w-[820px] 5xl:h-[640px] 6xl:w-[870px] 6xl:h-[650px] 
      7xl:w-[990px] 7xl:h-[755px] 8xl:w-[1090px] 8xl:h-[830px] 9xl:w-[1220px] 9xl:h-[900px] 1xl:w-[1250px] 1xl:h-[950px] hidden md:block" />
    </div>
    <div>
      <div className=" relative
       -left-[60px] mg:-left-[65px] xl:-left-[75px] 2xl:-left-[90px] 3xl:-left-[100px] 4xl:-left-[110px] 
       5xl:-left-[120px] 6xl:-left-[130px] 7xl:-left-[145px] 8xl:-left-[160px] 9xl:-left-[180px] 1xl:-left-[200px] mb-4 hidden md:block">
        <img src="/pics/carg.gif" alt="car icon" className='w-[160px] mg:w-[170px] xl:w-[200px] 2xl:w-[240px]
         3xl:w-[270px] 4xl:w-[290px] 5xl:w-[330px] 6xl:w-[370px] 7xl:w-[410px] 8xl:w-[450px] 9xl:w-[500px] 1xl:w-[550px]'/>
      </div>
      <div className="font-light font-neo mb-2 3xl:mb-5 text-[#320606] text-[13px] xs:text-[15px] 2xs:text-[16px] sm:text-[18px] md:text-[13px] mg:text-[15px]
         lg:text-[17px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[25px] 4xl:text-[27px] 5xl:text-[31px] 6xl:text-[34px] 7xl:text-[36px]
         8xl:text-[40px] 9xl:text-[44px] 1xl:text-[48px] w-[90%] md:w-[360px] mg:w-[380px] lg:w-[400px] xl:w-[430px] 2xl:w-[610px] 3xl:w-[660px]
        5xl:w-[710px] 6xl:w-[800px] 7xl:w-[900px] 8xl:w-[1000px] 9xl:w-[1105px] 1xl:w-[1205px]">
        Découvrez des solutions <br />abordables pour votre voiture<span className="text-red-600">!</span>
      </div>
      <div className="font-medium font-turret mb-4 3xl:mb-5 7xl:mb-7 text-[13px] xs:text-[15px] 2xs:text-[16px] sm:text-[18px] md:text-[12px] mg:text-[13px] 
        lg:text-[16px] xl:text-[17px] 2xl:text-[20px] 3xl:text-[25px] 4xl:text-[26px]  6xl:text-[28px] 7xl:text-[30px] 
        8xl:text-[32px] 9xl:text-[34px] 1xl:text-[36px] w-[88%]  md:w-[300px] mg:w-[380px] lg:w-[410px] xl:w-[440px] 2xl:w-[620px] 4xl:w-[700px] 5xl:w-[800px] 6xl:w-[900px] 8xl:w-[1000px] 1xl:w-[1100px]">
        {getTextByType("paragraphe - qui sommes nous") || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor ante, posuere faucibus elit ut, aliquam convallis nislonvMaecenas ultricies in neque.Lorem ipsum dolor sit cibus elit ut."}        
      </div>
      <button
        style={{
          clipPath: "polygon(0 0, 94% 0, 100% 20%, 100% 100%, 80% 100%, 6% 100%, 0% 80%, 0% 20%)",
        }}
        className="bg-gradient-to-r from-[#7a0404] to-[#d10000] text-white font-medium font-turret flex items-center
        px-4 py-2 md:px-2 lg:px-3 2xl:py-4 text-[14px] md:text-[12px] lg:text-[14px] 2xl:text-[19px] 5xl:text-[22px] 
        6xl:text-[24px] 7xl:text-[26px] 8xl:text-[28px] 9xl:text-[30px] 1xl:text-[32px] w-[190px]  md:w-[150px] lg:w-[170px] 2xl:w-[230px] 4xl:w-[250px] 5xl:w-[280px] 6xl:w-[300px] 
        7xl:w-[320px] 8xl:w-[350px] 9xl:w-[380px] 1xl:w-[410px] gap-2 xl:mb-2 7xl:mb-5 2xl:gap-3 4xl:gap-4 7xl:gap-6"
        onClick={handleClick}
      >
        <img src="/pics/uparrow.png" className="ml-1 w-[15px] md:w-[14px] lg:w-[16px] 2xl:w-[25px] 4xl:w-[30px]
        5xl:w-[35px] 6xl:w-[40px] 7xl:w-[45px] 8xl:w-[50px] 1xl:w-[55px]"
             /> DÉCOUVRIR PLUS
      </button>
      <div style={{
        borderTop:"1px solid transparent",
        borderImage: "linear-gradient(to right, black, white) 1",
        width:"80%"
      }} className='mt-[20px] md:mt-[15px] lg:mt-[20px] 2xl:mt-[27px] 3xl:mt-[30px] 6xl:mt-[40px] 7xl:mt-[50px] 1xl:mt-[65px]'/>
      <div className="flex items-center gap-2  mt-4 lg:mt-5 2xl:mt-7 3xl:mt-8 8xl:mt-10 1xl:mt-12">
        <div className='bg-gradient-to-r from-[#7a0404] to-[#d10000] p-[13px] md:p-[10px] mg:p-[11px] lg:p-[12px] 2xl:p-[14px] 3xl:p-[14px] 4xl:p-[16px] 5xl:p-[18px] 6xl:p-[20px] 7xl:p-[22px] 8xl:p-[24px] 9xl:p-[26px] 1xl:p-[28px]'style={{clipPath: "polygon(22% 0, 78% 0, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0 78%, 0 22%)" }} >
          <img src="/pics/phonew.svg" alt="Phone icon" className=" w-[20px] md:w-[15px] mg:w-[18px] lg:w-[20px] 2xl:w-[32px] 3xl:w-[35px] 4xl:w-[40px] 5xl:w-[45px] 6xl:w-[50px] 7xl:w-[55px] 8xl:w-[60px] 9xl:w-[65px] 1xl:w-[70px]" />
        </div>
      <div>
          <div className="text-[13px] md:text-[11px] lg:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] 5xl:text-[24px] 6xl:text-[26px] 7xl:text-[28px] 8xl:text-[30px] 9xl:text-[32px] 1xl:text-[34px] font-space font-bold">SERVICE CLIENT</div>
          <div className="text-[13px] md:text-[11px] lg:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] 5xl:text-[24px] 6xl:text-[26px] 7xl:text-[28px] 8xl:text-[30px] 9xl:text-[32px] 1xl:text-[34px] font-bold font-space text-red-600">
          <a href={`tel:${getTextByType("num-téléphone", 0)}`}>
            {contentLoading ? "Chargement..." : getTextByType("num-téléphone", 0)}
        </a> -
        <a href={`tel:${getTextByType("num-téléphone", 1)}`}>
            {contentLoading ? "Chargement..." : getTextByType("num-téléphone", 1)}
        </a>
          </div>
        </div>
      </div>
            <div className="2xs:ml-3 sm:ml-4 mt-8 md:hidden">
              <img src="/pics/apr-pic.png" alt="a propos picture" className=" w-[85%] h-[250px] xs:h-[260px] 2xs:h-[280px]
               sm:h-[320px]" />
            </div>
    </div>
  </div>
</div>

<div className='relative -mt-[270px] sm:-mt-[245px] md:mt-[700px] mg:mt-[720px] lg:mt-[800px] xl:mt-[920px] 2xl:mt-[950px] 
 4xl:mt-[1000px]'>
   <div className="absolute 2xl:top-16 3xl:top-[90px] 4xl:top-[110px] 9xl:top-[140px] sm:top-[60px] top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-full">
    <div className="lg:m-[10px] md:mr-3 mr-1 sm:ml-2 2xl:m-[14px] ">
      <img src="/pics/design-w1.png" alt="Design" className=" w-[95px] h-[20px] xs:w-[130px] xs:h-[21px] 2xs:w-[160px] 2xs:h-[23px] sm:h-[26px] sm:w-[185px]
              md:w-[100px] md:h-[23px] lg:h-[26px] lg:w-[125px] 2xl:w-[160px] 2xl:h-[40px] 3xl:w-[170px] 3xl:h-[45px] 4xl:w-[185px] 4xl:h-[43px]
              5xl:w-[180px] 5xl:h-[50px] 6xl:w-[190px] 6xl:h-[60px] 7xl:w-[200px] 7xl:h-[65px] 8xl:w-[210px] 8xl:h-[70px] 9xl:w-[220px] 9xl:h-[80px]
              1xl:w-[270px] 1xl:h-[88px]" />
    </div>
    <div className="font-neo font-light whitespace-nowrap text-white text-[16px] xs:text-[19px] 2xs:text-[22px] sm:text-[24px]  
        lg:text-[28px] 2xl:text-[36px] 3xl:text-[39px] 4xl:text-[44px] 5xl:text-[49px] 6xl:text-[52px] 7xl:text-[58px] 8xl:text-[62px]
        9xl:text-[66px] 1xl:text-[75px]">
        NOS SERVICES <span style={{ color: "#a71818" }}>AUTO</span>
    </div>
    <div className="lg:m-[10px] ml-1 md:ml-3 sm:ml-0 2xl:m-[14px]">
      <img src="/pics/design-w.png" alt="Design" className=" w-[95px] h-[20px] xs:w-[130px] xs:h-[21px] 2xs:w-[160px] 2xs:h-[23px] sm:h-[26px] sm:w-[185px]
              md:w-[100px] md:h-[23px] lg:h-[26px] lg:w-[125px] 2xl:w-[160px] 2xl:h-[40px] 3xl:w-[170px] 3xl:h-[45px] 4xl:w-[185px] 4xl:h-[43px]
              5xl:w-[180px] 5xl:h-[50px] 6xl:w-[190px] 6xl:h-[60px] 7xl:w-[200px] 7xl:h-[65px] 8xl:w-[230px] 8xl:h-[70px] 9xl:w-[250px] 9xl:h-[80px]
              1xl:w-[270px] 1xl:h-[88px]" />
    </div>
    <div className='font-turretBold absolute text-white 2xl:top-[90px] 3xl:top-[100px] 4xl:top-[110px] 5xl:top-[130px] 7xl:top-[150px] 8xl:top-[170px] sm:top-[50px] xl:top-[70px] top-[40px] xs:text-[17px] text-[16px] 
            mg:text-[24px]  lg:text-[28px] 2xl:text-[34px] 3xl:text-[40px] 5xl:text-[46px] 6xl:text-[48px] 7xl:text-[51px] 8xl:text-[54px] 9xl:text-[58px] 1xl:text-[64px] sm:text-[22px]'>" L'EXCELLENCE À CHAQUE RÉPARATION "</div> 
  </div>

<div className="flex justify-center lg:-mt-[680px] xl:-mt-[790px] md:-mt-[600px] mt-[350px] ">
  <div className="relative w-full ">
    <img src="/pics/rec-back.png" alt="Background" className="block top-0 right-0 h-[200px] xs:h-[220px] sm:h-[260px] lg:h-[280px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[430px] 4xl:h-[480px] 5xl:h-[500px]
    6xl:h-[540px] 7xl:h-[600px] 8xl:h-[650px] 9xl:h-[700px] 1xl:h-[750px] w-full" />
    <img src="/pics/frame-back.png" className="absolute top-0 right-0 h-[200px] xs:h-[220px] sm:h-[260px] lg:h-[280px] xl:h-[300px] 2xl:h-[350px] 5xl:h-[500px] 4xl:h-[480px] w-full 6xl:h-[540px]
     3xl:h-[430px] 7xl:h-[600px] 8xl:h-[650px] 9xl:h-[700px] 1xl:h-[750px]"/>
    <div className="absolute sm:top-[155px] xl:top-[180px] 2xl:top-[200px] 3xl:top-[260px] 4xl:top-[290px] 5xl:top-[300px] 6xl:top-[320px] 7xl:top-[360px] 8xl:top-[380px] 9xl:top-[400px] top-[100px] left-1/2 transform -translate-x-1/2 w-full ">
      <ServiceCarousel />
    </div>
  </div>
</div>

</div>
<div className='mt-[30px] 2xl:mt-[100px] 5xl:mt-[150px] 6xl:mt-[200px]'>
  <HomePga/>
</div>
</div>
  );
}