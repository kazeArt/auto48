import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Contact() {
    const [LName, setLName] = useState('');
    const [FName, setFName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Added missing state
    const navigate = useNavigate();

    // State for social media links
    const [socialLinks, setSocialLinks] = useState([]);
    const [linksLoading, setLinksLoading] = useState(true);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      
      setIsSubmitting(true);
      
      try {
          const response = await fetch('/api/messages', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json' // Important for Laravel
              },
              body: JSON.stringify({
                  nom: LName,
                  prenom: FName,
                  telephone: phone,
                  message: message
              }),
          });

          // First get raw response text for debugging
          const rawResponse = await response.text();
          console.log("Raw API response:", rawResponse);

          // Then try to parse as JSON
          let data;
          try {
              data = JSON.parse(rawResponse);
          } catch (e) {
              throw new Error(`API returned non-JSON: ${rawResponse.substring(0, 100)}...`);
          }

          if (!response.ok) {
              throw new Error(
                  data.message || 
                  `HTTP error! status: ${response.status} ${response.statusText}`
              );
          }

          console.log('Message sent successfully:', data);
          
          // Reset form fields after successful submission
          setLName('');
          setFName('');
          setPhone('');
          setMessage('');
          
          alert('Message sent successfully!');
          
      } catch (error) {
          console.error('Error sending message:', error);
          // Show the actual error message to the user
          alert(`Failed to send message: ${error.message}`);
      } finally {
          setIsSubmitting(false);
      }
  };


    // Fetch social links
    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const response = await fetch('/api/links');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setSocialLinks(data);
            } catch (err) {
                console.error('Failed to fetch social links:', err);
            } finally {
                setLinksLoading(false);
            }
        };

        fetchSocialLinks();
    }, []);

    // Helper function to get social link by label
    // More flexible version that handles common variations
const getSocialLink = (label) => {
  const platformMap = {
    'facebook': ['facebook'],
    'instagram': ['instagram'],
    'tiktok': ['tiktok'],
    'twitter': ['twitter', 'x'],
    'linkedin': ['linkedin', 'linkdin']
  };

  const platform = Object.keys(platformMap).find(key => 
    platformMap[key].includes(label.toLowerCase())
  );

  if (!platform) return '#';

  const linkObj = socialLinks.find(link => 
    platformMap[platform].includes(link.label.toLowerCase())
  );

  return linkObj ? linkObj.url : '#';
};
const [texts, setTexts] = useState([]);
const [textsLoading, setTextsLoading] = useState(true);
const [textsError, setTextsError] = useState(null);

useEffect(() => {
    const fetchTexts = async () => {
        try {
            const response = await fetch('/api/texts');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setTexts(data);
        } catch (err) {
            console.error('Erreur de chargement des textes:', err);
            setTextsError(err.message);
        } finally {
            setTextsLoading(false);
        }
    };

    fetchTexts();
}, []);
//helper 3la 7sab les textes li 3ndna f api
const getTextByType = (type, index = 0) => {
  if (!texts || texts.length === 0) return '';
  const filtered = texts.filter(t => t.type === type);
  return filtered[index]?.content || '';
};

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  return (
    <div className='pt-5 lg:mt-[70px] mg:mt-[30px] 4xl:mt-[90px] 7xl:mt-[120px]'>
      <div className="relative w-full">
        <img src="/pics/contactpic.jpg" alt="Image" className="w-full h-[110px] xs:h-[120px] 2xs:h-[135px] sm:h-[160px] md:h-[200px] mg:h-[250px] xl:h-[300px] 2xl:h-[320px] 3xl:h-[350px] 4xl:h-[370px] 5xl:h-[400px] 6xl:h-[430px] 7xl:h-[470px] 8xl:h-[510px] 9xl:h-[550px] 1xl:h-[590px]" />
        <div className="absolute inset-0 bg-black/60 h-[110px] xs:h-[120px] 2xs:h-[135px] sm:h-[160px] md:h-[200px] mg:h-[250px] xl:h-[300px] 2xl:h-[320px] 3xl:h-[350px] 4xl:h-[370px] 5xl:h-[400px] 6xl:h-[430px] 7xl:h-[470px] 8xl:h-[510px] 9xl:h-[550px]  1xl:h-[590px]"></div>

        <div className='text-white justify-center absolute top-0 py-8 xs:py-9 2xs:py-[45px] sm:py-[55px] md:py-[63px] mg:py-[76px] xl:py-[100px] 5xl:py-[115px] 7xl:py-[130px] ml-[4%] xs:ml-[5%] 2xs:ml-[6%] sm:ml-[7%] mg:ml-[8%] 7xl:ml-[9%] '>
          <div className='font-neo text-[17px] xs:text-[19.5px] 2xs:text-[20.5px] sm:text-[22px] md:text-[28px] mg:text-[32px] lg:text-[37px] xl:text-[42px] 2xl:text-[50px] 3xl:text-[57px] 4xl:text-[63px] 5xl:text-[70px] 6xl:text-[77px] 7xl:text-[83px] 8xl:text-[90px] 9xl:text-[95px] 1xl:text-[100px]'>Prenez contact avec nous</div>
          <div className='font-turretBold text-[12px] xs:text-[12.5px] 2xs:text-[13px] sm:text-[14px] md:text-[18px] mg:text-[21px] lg:text-[24px] xl:text-[27px] 2xl:text-[32px] 3xl:text-[36px] 4xl:text-[39px] 5xl:text-[43px] 6xl:text-[48px] 7xl:text-[53px]'>Nous sommes là pour vous aider. Envoyez-nous un message.</div>
        </div>
      </div>
  
      <div className='mt-[60px] sm:mt-[70px] md:mt-[90px] w-full lg:flex lg:mt-[60px] 3xl:mt-[75px] 4xl:mt-[90px]'>

        <div className='lg:border lg:border-gray-400 w-full bg-white z-10 lg:order-2 lg:mr-[5%] lg:w-[45%] 3xl:w-[43%] 7xl:w-[42%]'>
          <div className='mx-[10%] mt-10 xs:mx-[11%] xs:mt-11 2xs:mx-[12%] sm:mx-[13%] md:mx-[15%] lg:mx-[10%] lg:mt-[70px] 3xl:mt-[90px]'>
            <img src='/pics/linearr.svg' alt='' className='w-[73%] xs:w-[68%] sm:w-[65%] md:w-[60%] mg:w-[55%] lg:w-[70%] 2xl:w-[75%]'/>
            <div className='font-neo text-[#171514] mt-2 lg:mb-2 text-[20px] xs:text-[22px] 2xs:text-[25px] sm:text-[28px] mg:text-[30px] lg:text-[24px] xl:text-[31px] 2xl:text-[40px] 3xl:text-[43px] 4xl:text-[47px] 5xl:text-[53px] 6xl:text-[58px] 7xl:text-[63px]'>
              POUR NOUS JOINDRE
            </div>
            <div className='font-turretBold text-[#171514] text-[13.5px] xs:text-[15px] 2xs:text-[17px] sm:text-[18.5px] mg:text-[20px] lg:text-[17px] xl:text-[21px] 2xl:text-[27px] 3xl:text-[28px] 4xl:text-[31px] 5xl:text-[35px] 6xl:text-[38px] 7xl:text-[41px] mb-2 2xs:mb-2.5'>
              DÉCOUVREZ DES SOLUTIONS ABORDABLES <br/> POUR VOTRE VOITURE!
            </div>
          </div>

          <div className='lg:hidden mx-[10%] xs:mx-[11%] 2xs:mx-[12%] sm:mx-[13%] md:mx-[15%] my-5 xs:my-6'>
            <div className='flex items-center mb-6'>
              <a href="tel:+2120536716777" target='_blank' rel="noreferrer">
                <div className='bg-[#C81717] px-3  py-2 xs:px-3.5 xs:py-2.5 sm:px-4 sm:py-3 mg:px-5 mg:py-4 mr-4' style={{clipPath: "polygon(25% 0, 100% 0, 100% 20%, 100% 75%, 75% 100%, 20% 100%, 0 100%, 0 25%)"}}>
                  <img src='/pics/phone.svg' alt='' className='w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 mg:w-6.5 mg:h-6.5'/>
                </div>
              </a>
              <div>
                <p className='font-turretBold text-[14px] xs:text-[15px] 2xs:text-[15.5px] sm:text-[16.5px] mg:text-[18.5px]'>Appeler à tout moment</p>
                <p className='font-turret text-[11px] xs:text-[12px] sm:text-[13px] mg:text-[15.5px]'><a href={`tel:${getTextByType("num-téléphone", )}`}>
                                         {textsLoading ? "Chargement..." : getTextByType("num-téléphone", 0)}
                                    </a></p>
                <p className='font-turret text-[11px] xs:text-[12px] sm:text-[13px] mg:text-[15.5px]'>05 36 716 778</p>
              </div>
            </div>

            <div className='flex items-center mb-6'>
              <a href="mailto:CONTACT@AUTO48.MA" target='_blank' rel="noreferrer">
                <div className='bg-[#C81717] px-3 py-2 xs:px-3.5 xs:py-2.5 sm:px-4 sm:py-3 mg:px-5 mg:py-4 mr-4' style={{clipPath: "polygon(25% 0, 100% 0, 100% 20%, 100% 75%, 75% 100%, 20% 100%, 0 100%, 0 25%)"}}>
                  <img src='/pics/email.svg' alt='' className='w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 mg:w-6.5 mg:h-6.5' />
                </div>
              </a>
              <div>
                <p className='font-turretBold text-[14px] xs:text-[15px] 2xs:text-[15.5px] sm:text-[16.5px] mg:text-[18.5px]'>Envoyer un e-mail</p>
                <p className='font-turret text-[11px] xs:text-[12px] 2xs:text-[12.5px] sm:text-[13.5px] mg:text-[15.5px]'>contact@auto48.ma</p>
              </div>
            </div>

            <div className='flex items-center'>
              <a href='https://maps.app.goo.gl/rckYrQeQ6sVsghEH6' target='_blank' rel="noreferrer">
                <div className='bg-[#C81717] px-3 py-2 xs:px-3.5 xs:py-2.5 sm:px-4 sm:py-3 mg:px-5 mg:py-4 mr-4' style={{clipPath: "polygon(25% 0, 100% 0, 100% 20%, 100% 75%, 75% 100%, 20% 100%, 0 100%, 0 25%)"}}>
                  <img src='/pics/locc.svg' alt='' className='w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 mg:w-6.5 mg:h-6.5'/>
                </div>
              </a>
              <div>
                <p className='font-turretBold text-[14px] xs:text-[15px] 2xs:text-[15.5px] sm:text-[16.5px] mg:text-[18.5px]'>Visitez-nous</p>
                <p className='font-turret text-[11px] xs:text-[12px] 2xs:text-[12.5px] sm:text-[13.5px] mg:text-[15.5px]'>Rte d'Algérie lotis boustane 3 N° 191 <br/> Zone industrielle-Oujda</p>
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center my-10 md:my-11 lg:mb-8 lg:mt-6 mg:mb-[55px] 4xl:my-13'>
            <div className='w-[82%] 2xs:w-[80%] md:w-[70%] lg:w-[80%] h-[150px] 2xs:h-[170px] sm:h-[190px] md:h-[220px] mg:h-[250px] lg:h-[180px] xl:h-[200px] 2xl:h-[220px] 3xl:h-[240px] 4xl:h-[260px] 5xl:h-[280px] 6xl:h-[300px] 7xl:h-[320px] 8xl:h-[340px] 9xl:h-[360px] 1xl:h-[380px]
              relative rounded-md overflow-hidden'>
              <img
                src='/pics/maps.svg'
                alt=''
                className='w-full h-full object-cover'/>
              <a  href='https://maps.app.goo.gl/rckYrQeQ6sVsghEH6'
                  target='_blank'
                  rel="noreferrer"
                  className='absolute inset-0 '/>

              <div className='bg-white text-black font-poppins absolute top-3 right-3 3xl:top-4 3xl:right-4 7xl:top-5 7xl:right-5 py-1 xs:py-2 2xs:py-3  pl-2 pr-4 xs:pl-3 2xs:pl-4 xs:pr-5 2xs:pr-6 mg:pr-7 md:pr-7 2xl:pr-9 3xl:pr-11 5xl:pr-12 text-[9px] xs:text-[9.5px] 2xs:text-[10px] md:text-[11px] mg:text-[11.5px] 2xl:text-[14.5px] 3xl:text-[16.5px] 4xl:text-[18.5px] 5xl:text-[20.5px] 6xl:text-[22.5px] 7xl:text-[24.5px] 8xl:text-[26.5px] 9xl:text-[28.5px] 1xl:text-[30.5px] rounded-xl shadow-2xl'>
                <span className='text-red-700 text-[10px] xs:text-[11px] 2xs:text-[11.5px] md:text-[12.5px] mg:text-[13px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] 5xl:text-[22px] 6xl:text-[24px] 7xl:text-[26px] 8xl:text-[28px] 9xl:text-[30px] 1xl:text-[32px] font-bold'>Auto48</span><br/>
                  315 W 36th St.<br/>NY 10018
              </div>
            </div>
          </div>

          <div className='lg:block hidden mx-12 xl:mx-[55px] 2xl:mx-[65px] 3xl:mx-[75px] 4xl:mx-[80px] 5xl:mx-[85px] my-5 2xl:my-7 5xl:my-10'>
            <div className='flex items-center mb-6 '>
              <a href="tel:+2120536716777" target='_blank' rel="noreferrer">
                <div className='bg-[#C81717] px-3.5 py-3 2xl:px-5 2xl:py-4 4xl:px-6 4xl:py-5 6xl:px-7 6xl:py-6 mr-4' style={{clipPath: "polygon(25% 0, 100% 0, 100% 20%, 100% 75%, 75% 100%, 20% 100%, 0 100%, 0 25%)"}}>
                  <img src='/pics/phone.svg' alt='' className='w-5.5 h-5.5 2xl:w-7 2xl:h-7 4xl:w-8 4xl:h-8 5xl:w-9 5xl:h-9 6xl:w-10 6xl:h-10'/>
                </div>
              </a>
              <div>
                <p className='font-turretBold text-[16px] 2xl:text-[20px] 3xl:text-[23px] 4xl:text-[26px] 5xl:text-[29px] 6xl:text-[31px]'>Appeler à tout moment</p>
                <p className='font-turret text-[12px] 2xl:text-[14.5px] 3xl:text-[16.5px] 4xl:text-[19px] 5xl:text-[21.5px] 6xl:text-[22.5px]'> <a href={`tel:${getTextByType("num-téléphone", 0)}`}>
            {textsLoading ? "Chargement..." : getTextByType("num-téléphone", 0)}
        </a></p>
                <p className='font-turret text-[12px] 2xl:text-[14.5px] 3xl:text-[16.5px] 4xl:text-[19px] 5xl:text-[21.5px] 6xl:text-[22.5px]'><a href={`tel:${getTextByType("num-téléphone", 1)}`}>
            {textsLoading ? "Chargement..." : getTextByType("num-téléphone", 1)}
        </a></p>
              </div>
            </div>

            <div className='flex items-center mb-6'>
              <a href="mailto:CONTACT@AUTO48.MA" target='_blank' rel="noreferrer">
                <div className='bg-[#C81717] px-3.5 py-3 2xl:px-5 2xl:py-4 4xl:px-6 4xl:py-5 6xl:px-7 6xl:py-6 mr-4' style={{clipPath: "polygon(25% 0, 100% 0, 100% 20%, 100% 75%, 75% 100%, 20% 100%, 0 100%, 0 25%)"}}>
                  <img src='/pics/email.svg' alt='' className='w-5.5 h-5.5 2xl:w-7 2xl:h-7 4xl:w-8 4xl:h-8 5xl:w-9 5xl:h-9 6xl:w-10 6xl:h-10' />
                </div>
              </a>
              <div>
                <p className='font-turretBold text-[16px] 2xl:text-[20px] 3xl:text-[23px] 4xl:text-[26px] 5xl:text-[29px] 6xl:text-[31px]'>Envoyer un e-mail</p>
                <p className='font-turret text-[13px] 2xl:text-[14.5px] 3xl:text-[16.5px] 4xl:text-[19px] 5xl:text-[21.5px] 6xl:text-[23px]'>contact@auto48.ma</p>
              </div>
            </div>

            <div className='flex items-center 3xl:mb-[70px]'>
              <a href='https://maps.app.goo.gl/rckYrQeQ6sVsghEH6' target='_blank' rel="noreferrer">
                <div className='bg-[#C81717] px-4 py-3 2xl:px-[22px] 2xl:py-4 4xl:px-[26px] 4xl:py-5 6xl:px-[30px] 6xl:py-6 mr-4' style={{clipPath: "polygon(25% 0, 100% 0, 100% 20%, 100% 75%, 75% 100%, 20% 100%, 0 100%, 0 25%)"}}>
                  <img src='/pics/locc.svg' alt='' className='w-5.5 h-[21px] 2xl:w-6.5 2xl:h-[28px] 4xl:w-7 4xl:h-8 5xl:w-8 5xl:h-9 6xl:w-9 6xl:h-10 '/>
                </div>
              </a>
              <div>
                <p className='font-turretBold text-[16px] 2xl:text-[20px] 3xl:text-[23px] 4xl:text-[26px] 5xl:text-[29px] 6xl:text-[31px]'>Visitez-nous</p>
                <p className='font-turret text-[12px] 2xl:text-[14.5px] 3xl:text-[16.5px] 4xl:text-[19px] 5xl:text-[21.5px] 6xl:text-[23px]'>Rte d'Algérie lotis boustane 3 N° 191 <br/> Zone industrielle-Oujda</p>
              </div>
            </div>
          </div>
        </div> 

        <div className='relative bg-[#303030] py-1 mg:py-2 z-10 w-full lg:w-[45%] 3xl:w-[43%]  7xl:w-[42%] lg:order-1 lg:ml-[5%] 3xl:ml-[7%]'>

           {/* Mobile Social Links */}
           <div className='mt-7 ml-5 xs:ml-7 2xs:ml-9 sm:ml-12 md:ml-[75px] mg:ml-[100px] lg:hidden'>
                <p className='text-white font-turretBold mb-2 2xs:mb-2.5 text-[19px] 2xs:text-[21px] sm:text-[23px] mg:text-[26px]'>Suivez-nous sur</p>

                <div className='gap-x-2 2xs:gap-x-2.5 flex'>
                    <div className=''>
                        <a href={linksLoading ? "https://x.com/" : getSocialLink('twitter')} target='_blank' rel="noreferrer">
                            <div className='bg-[#C81717] px-2 py-2 2xs:px-2.5 2xs:py-2.5 sm:px-3 sm:py-3 mg:px-3.5 mg:py-3.5'>
                                <img src='/pics/twitterfor.svg' alt='' className='w-4.5 h-4 2xs:w-5 2xs:h-4.5 sm:w-5.5 sm:h-5 mg:w-6 mg:h-5.5'/>
                            </div>
                        </a>
                    </div>
                    <div className=''>
                        <a href={linksLoading ? "https://instagram.com" : getSocialLink('instagram')} target='_blank' rel="noreferrer">
                            <div className='bg-[#C81717] px-2.5 py-2 2xs:px-3 2xs:py-2.5 sm:px-3.5 sm:py-3 mg:px-4 mg:py-3.5'>
                                <img src='/pics/instafor.svg' alt='' className='w-4 h-4 2xs:w-4.5 2xs:h-4.5 sm:w-5 sm:h-5 mg:w-5.5 mg:h-5.5' />
                            </div>
                        </a>
                    </div>
                    <div className=''>
                        <a href={linksLoading ? "https://facebook.com" : getSocialLink('facebook')} target='_blank' rel="noreferrer">
                            <div className='bg-[#C81717] px-2.5 py-2 2xs:px-3 2xs:py-2.5 sm:px-3.5 sm:py-3 mg:px-4 mg:py-3.5'>
                                <img src='/pics/facefor.svg' alt='' className='w-4 h-4 2xs:w-4.5 2xs:h-4.5 sm:w-5 sm:h-5 mg:w-5.5 mg:h-5.5'/>
                            </div>
                        </a>
                    </div>
                    <div className=''>
                        <a href={linksLoading ? "https://linkedin.com" : getSocialLink('linkedin')} target='_blank' rel="noreferrer">
                            <div className='bg-[#C81717] px-2.5 py-2 2xs:px-3 2xs:py-2.5 sm:px-3.5 sm:py-3 mg:px-4 mg:py-3.5'>
                                <img src='/pics/linkfor.svg' alt='' className='w-4 h-4 2xs:w-4.5 2xs:h-4.5 sm:w-5 sm:h-5 mg:w-5.5 mg:h-5.5'/>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

          <div className='bg-white mx-5 mb-3  xs:mx-7 2xs:mx-9 sm:mx-[52px] md:mx-[75px] mg:mx-[90px] mg:ml-[100px] mt-10 mg:mt-[50px] lg:mt-[70px] 3xl:mt-[95px] lg:mx-[9%] 2xl:mx-[11%] 5xl:mx-[12%]'
              style={{clipPath:"polygon(0 0, 97% 0, 100% 3%, 100% 100%, 100% 100%, 3% 100%, 0 97%, 0 0)"}}>
              <div className='flex justify-center'>
                <img src='/pics/lineforl.svg' alt='' className='mt-4 2xs:mt-3 sm:mt-4 mg:mt-5 lg:mt-4 xl:mt-3 2xl:mt-4 size-12 2xs:size-14 sm:size-[60px] md:size-[70px] mg:size-[80px] lg:size-12 xl:size-[56px] 2xl:size-[63px] 3xl:size-[68px] 4xl:size-[75px] 5xl:size-[82px] 6xl:size-[87px]' />
                  <p className='font-neo mx-3 md:mx-4 lg:mx-3 2xl:mx-4 5xl:mx-5 text-[16px] 2xs:text-[17px] sm:text-[18px] md:text-[20px] mg:text-[23px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[24px] 4xl:text-[26px] 5xl:text-[30px] 6xl:text-[33px] mt-7 sm:mt-8 md:mt-9 mg:mt-11 lg:mt-7 2xl:mt-8 4xl:mt-9  text-[#C81717]'>Parlez-nous</p>
                <img src='/pics/lineforr.svg ' alt='' className='mt-4 2xs:mt-3 sm:mt-4 mg:mt-5 lg:mt-4 xl:mt-3 2xl:mt-4 size-12 2xs:size-14 sm:size-[60px] md:size-[70px] mg:size-[80px] lg:size-12 xl:size-[56px] 2xl:size-[63px] 3xl:size-[68px] 4xl:size-[75px] 5xl:size-[82px] 6xl:size-[87px]'/>
              </div>
              <div className='font-turret mx-5 xs:mx-7 2xs:mx-9 sm:mx-12 md:mx-14 lg:mx-6 2xl:mx-9 3xl:mx-10 4xl:mx-12 5xl:mx-14 mt-3 md:mt-4 mg:mt-5 text-[12px] xs:text-[13px] sm:text-[14px] md:text-[15px] mg:text-[18px] lg:text-[14px] 2xl:text-[16px] 4xl:text-[18px] 5xl:text-[21px] 6xl:text-[23.5px]'>
                  <input type="text" placeholder="Nom" value={LName} onChange={(e) => setLName(e.target.value)}
                      className="w-full p-3 xs:p-3.5 md:p-4 mg:p-5 lg:p-3 2xl:p-[18px] 4xl:p-[20px] 5xl:p-[22px] 6xl:p-[24px] border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] mb-3 xs:mb-3.5 mg:mb-4 4xl:mb-5 5xl:mb-6 6xl:mb-7 text-black placeholder-black"/>
                  <input type="text" placeholder="Prénom" value={FName} onChange={(e) => setFName(e.target.value)}
                      className="w-full p-3 xs:p-3.5 md:p-4 mg:p-5 lg:p-3 2xl:p-[18px] 4xl:p-[20px] 5xl:p-[22px] 6xl:p-[24px] border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] mb-3 xs:mb-3.5 mg:mb-4 4xl:mb-5 5xl:mb-6 6xl:mb-7 text-black placeholder"/>
                  <input type="text" placeholder="Teléphone" value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 xs:p-3.5 md:p-4 mg:p-5 lg:p-3 2xl:p-[18px] 4xl:p-[20px] 5xl:p-[22px] 6xl:p-[24px] border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] mb-3 xs:mb-3.5 mg:mb-4 4xl:mb-5 5xl:mb-6 6xl:mb-7 text-black placeholder"/>
                  <textarea 
                      placeholder='Message' 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 xs:p-3.5 md:p-4 mg:p-5 4xl:mb-5 lg:p-3 2xl:p-[18px] 4xl:p-[20px] 5xl:p-[22px] 6xl:p-[24px] border h-[100px] xs:h-[120px] md:!h-[180px] mg:!h-[220px] lg:!h-[130px] xl:!h-[150px] 2xl:!h-[170px] 4xl:!h-[190px] 5xl:!h-[200px] 6xl:!h-[220px] border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] mb-3 xs:mb-3.5 mg:mb-4.5 text-black placeholder resize-none"
                  />
                  <button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#C81717] to-[#700000] text-white px-4 py-2 2xs:py-3.5 mg:py-4 lg:py-2 2xl:py-3.5 4xl:py-4.5 5xl:py-5 6xl:py-5.5 mb-5 mg:mb-9 2xs:mb-6 sm:mb-7 lg:mb-5 xl:mb-7 3xl:mb-8 4xl:mb-9 5xl:mb-10 6xl:mb-11 shadow-md w-full font-turretBold text-[13px] sm:text-[14px] mg:text-[16px] lg:text-[13.5px] 2xl:text-[15.5px] 3xl:text-[16px] 4xl:text-[18px] 5xl:text-[21px] 6xl:text-[23px]" 
            style={{clipPath:"polygon(22% 0%, 98% 0, 100% 22%, 100% 100%, 80% 100%, 2% 100%, 0 78%, 0 0)"}}
            disabled={isSubmitting}
        >
            {isSubmitting ? 'SENDING...' : 'ENVOYÉ'}
        </button>
        

              </div>
          </div>

          {/* Desktop Social Links */}
          <div className='mt-7 ml-5 hidden lg:block lg:mx-[9%] 2xl:mx-[11%] 6xl:mx-[12%] xl:mt-8 3xl:mt-10 4xl:mt-11 4xl:mb-9 6xl:mb-10'>
                <p className='text-white font-turretBold mb-2 text-[19px] xl:text-[21px] 2xl:text-[26px] 3xl:text-[29px] 4xl:text-[32px] 5xl:text-[35px] 6xl:text-[38px]'>Suivez-nous sur</p>

                <div className='gap-x-2 flex'>
                    <div className=''>
                        <a href={linksLoading ? "https://x.com/" : getSocialLink('twitter')} target='_blank' rel="noreferrer">
                            <div className='bg-[#C81717] px-2 py-2 xl:px-2.5 xl:py-2.5 3xl:px-3 3xl:py-3 4xl:px-3.5 4xl:py-3.5 5xl:px-4 5xl:py-4 6xl:px-4.5 6xl:py-4.5'>
                                <img src='/pics/twitterfor.svg' alt='' className='w-4.5 h-4 xl:w-5.5 xl:h-5 2xl:w-6.5 2xl:h-6 3xl:w-7 3xl:h-6.5 4xl:w-7.5 4xl:h-7.5 5xl:w-8 5xl:h-8 6xl:w-8.5 6xl:h-8.5'/>
                            </div>
                        </a>
                    </div>
                    <div className=''>
                        <a href={linksLoading ? "https://instagram.com" : getSocialLink('instagram')} target='_blank' rel="noreferrer">
                            <div className='bg-[#C81717] px-2.5 py-2 xl:px-3 xl:py-2.5 3xl:px-3.5 3xl:py-3 4xl:px-4 4xl:py-3.5 5xl:px-4.5 5xl:py-4 6xl:px-5 6xl:py-4.5'>
                                <img src='/pics/instafor.svg' alt='' className='w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 3xl:w-6.5 3xl:h-6.5 4xl:w-7.5 4xl:h-7.5 5xl:w-8 5xl:h-8 6xl:w-8.5 6xl:h-8.5' />
                            </div>
                        </a>
                    </div>
                    <div className=''>
                        <a href={linksLoading ? "https://facebook.com" : getSocialLink('facebook')} target='_blank' rel="noreferrer">
                            <div className='bg-[#C81717] px-2.5 py-2 xl:px-3 xl:py-2.5 3xl:px-3.5 3xl:py-3 4xl:px-4 4xl:py-3.5 5xl:px-4.5 5xl:py-4 6xl:px-5 6xl:py-4.5'>
                                <img src='/pics/facefor.svg' alt='' className='w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 3xl:w-6.5 3xl:h-6.5 4xl:w-7.5 4xl:h-7.5 5xl:w-8 5xl:h-8 6xl:w-8.5 6xl:h-8.5'/>
                            </div>
                        </a>
                    </div>
                    <div className=''>
                        <a href={linksLoading ? "https://linkedin.com" : getSocialLink('linkedin')} target='_blank' rel="noreferrer">
                            <div className='bg-[#C81717] px-2.5 py-2 xl:px-3 xl:py-2.5 3xl:px-3.5 3xl:py-3 4xl:px-4 4xl:py-3.5 5xl:px-4.5 5xl:py-4 6xl:px-5 6xl:py-4.5'>
                                <img src='/pics/linkfor.svg' alt='' className='w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 3xl:w-6.5 3xl:h-6.5 4xl:w-7.5 4xl:h-7.5 5xl:w-8 5xl:h-8 6xl:w-8.5 6xl:h-8.5'/>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
          <div className="pb-10"></div>
        </div> 

      </div> 

      <div>
          <div className="absolute bottom-6 md:bottom-11 w-full text-center text-[11px] xs:text-[12px] 2xs:text-[13px] sm:text-[14px] md:text-[15px] mg:text-[17px] 2xl:text-[19px] 3xl:text-[23px] 4xl:text-[25px] 5xl:text-[27px] 6xl:text-[30px] 4xl:mb-2 5xl:mb-3 6xl:mb-4 text-[#585858] font-turretBold"> 
            <a href="https://softcactus.ma/" target="_blank" rel="noreferrer">
              <p>© SOFTCACTUS, TOUS LES DROITS<br className='md:hidden'/> SONT RÉSERVÉS, 2025</p>
            </a>
          </div>

          <div onClick={() => scrollToTop()} 
              className="absolute bottom-6 md:bottom-8 right-6 2xl:right-10 3xl:right-16 4xl:right-20 5xl:right-24 6xl:right-28
                          w-12 h-12 
                          xs:w-14 xs:h-14 
                          2xs:w-14 2xs:h-14
                          mg:w-16 mg:h-16 
                          2xl:w-20 2xl:h-20 
                          3xl:w-24 3xl:h-24 
                          4xl:w-25 4xl:h-25 
                          5xl:w-[100px] 5xl:[100px] 
                          6xl:w-[110px] 6xl:h-[110px] 
                          cursor-pointer z-50">
            <img src='/pics/scrolltop.svg' alt='Scroll to top' className="w-full h-full" />
          </div>

          <div className="relative z-0 -mt-20 overflow-hidden max-h-[170px] xs:max-h-[180px] md:max-h-[200px] 2xl:max-h-[210px] 3xl:max-h-[230px] 4xl:max-h-[250px] 5xl:max-h-[270px] 6xl:max-h-[290px]" >
            <div className="w-full flex justify-between">
              <img src="/pics/carwheelpat1.png" alt="car wheel pattern" className="w-[45%] h-[500px]" />
              <img src="/pics/carwheelpat.png" alt="car wheel pattern" className="w-[45%] h-[500px]" />
            </div>
          </div>
      </div>
    </div> 
  )
}