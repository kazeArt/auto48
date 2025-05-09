import React, { useState, useRef, useEffect } from 'react';
export default function PressHere({ onComplete }) {
  const [introStage, setIntroStage] = useState('landing');
  const videoRef = useRef(null);

  const handleButtonClick = () => {
    setIntroStage('playing');
  };

  const handleVideoEnd = () => {
    console.log("Video ended, starting fade out.");
    setIntroStage('fading');

    const fadeTimer = setTimeout(() => {
      console.log("Fade out complete (via timeout).");
      onComplete();
    }, 550); 
  };

  useEffect(() => {
    if (introStage === 'playing' && videoRef.current) {
      videoRef.current.load(); 

      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Video play failed:", error);
        });
      }
    }
  }, [introStage]);

  useEffect(() => {
    let fadeTimerId;
    if (introStage === 'fading') {
      fadeTimerId = setTimeout(() => {
        console.log("Fade out complete (via timeout).");
        onComplete();
      }, 500); 
    }

    return () => {
      if (fadeTimerId) {
        clearTimeout(fadeTimerId);
      }
    };
  }, [introStage, onComplete]); 

  return (
    <div
      className={`
        fixed inset-0 z-50
        transition-opacity duration-500 ease-out
        ${introStage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        ${introStage === 'playing' || introStage === 'fading' ? 'bg-white' : 'bg-transparent'}
        ${introStage === 'fading' ? 'will-change-opacity' : ''} 
      `}
    >
      <div
        className={`
          absolute inset-0 w-full h-full flex flex-col items-center justify-center
          bg-no-repeat bg-center bg-cover font-turret
          transition-opacity duration-300 ease-in
          ${introStage === 'playing' || introStage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
        style={{ backgroundImage: "url('/pics/bg1.jpg')" }}
      >
        <div className="flex flex-col items-center justify-center w-4/5 max-w-4xl space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          <img
            src="/pics/Logo2.png"
            alt="logo"
            className="w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 lg:w-32 lg:h-28 xl:w-36 xl:h-32"
          />
          <div className="relative flex items-center justify-center w-full ">
            <img
              src="/pics/brdTrns.png"
              alt="border"
              className="w-full relative top-1 sm:w-3/4 lg:w-2/3 h-auto max-h-24 sm:max-h-28 md:max-h-32 lg:max-h-38"
            />
            <div className="absolute  text-center font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-black w-3/4 sm:w-2/3 md:w-3/5 lg:w-1/2">
              Votre atelier de confiance pour la mécanique générale, l'électricité auto,
              la tôlerie-peinture et le pneumatique
            </div>
          </div>
          <button
            className="mt-2 sm:mt-3 md:mt-4
                     w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44
                     h-7 sm:h-9 md:h-11 lg:h-13
                     rounded-lg
                     font-turret font-bold text-white
                     text-xs sm:text-sm md:text-base lg:text-lg
                     shadow-[5px_5px_0px_white]
                     bg-gradient-to-r from-red-900 via-red-500 to-red-900
                     hover:opacity-90 transition-opacity"
            onClick={handleButtonClick}
          >
            CLIQUER ICI
          </button>
        </div>
      </div>

      {(introStage === 'playing' || introStage === 'fading') && (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-white">
          <video
            ref={videoRef}
            onEnded={handleVideoEnd} 
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            className="intro-video absolute inset-0 w-full h-full object-fill"
            src="/animvid/autovid.mp4"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}