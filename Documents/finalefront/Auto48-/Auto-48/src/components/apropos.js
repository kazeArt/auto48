import './about.css';
import { useState, useEffect } from 'react';

export default function Apropos() {
    const [LName, setLName] = useState('');
    const [FName, setFName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [interfaceCard, setInterfaceCard] = useState(0);
    const [feedbackinterface, setFeedbackinterface] = useState(0);
    const [socialLinks, setSocialLinks] = useState([]);
    const [linksLoading, setLinksLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [brandsLoading, setBrandsLoading] = useState(true);
    const [brandsError, setBrandsError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State for texts
    const [texts, setTexts] = useState([]);
    const [textsLoading, setTextsLoading] = useState(true);
    const [textsError, setTextsError] = useState(null);

    // Helper function to get text by type
    const getTextByType = (type, index = 0) => {
        if (!texts || texts.length === 0) return '';
        const filtered = texts.filter(t => t.type === type);
        return filtered[index]?.content || '';
      };
    

    function GoToTheTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: LName,
                    prenom: FName,
                    telephone: phone,
                    message: message
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message ||
                    `HTTP error! status: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();
            console.log('Message sent successfully:', data);

            setLName('');
            setFName('');
            setPhone('');
            setMessage('');

            alert('Message sent successfully!');

        } catch (error) {
            console.error('Error sending message:', error);
            alert(`Failed to send message: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const cards = [
        { id: 1, icon: './pics/about/fstcardicon.svg', tittle: 'Professionnels certifiés pour votre tranquilité', desc: 'Nos techniciens certifiés et expérimentés s\'engagent à fournir un service de qualité, avec précision et soin. Faites confiance à Auto48 pour des réparations, un entretien et des conseils d\'experts à chaque visite.' },
        { id: 2, icon: './pics/about/ndcardicon.svg', tittle: 'Des prix clairs, sans mauvaises surprises', desc: 'Chez Auto48, nous croyons en une tarification honnête et transparente, sans frais cachés. Ce que vous voyez est ce que vous payez, garantissant ainsi une tranquillité d esprit à chaque service.' },
        { id: 3, icon: './pics/about/thrdcardicon.svg', tittle: 'Des outils et équipements de diagnostic avancés.', desc: 'Nous utilisons les derniers outils et équipements de diagnostic pour garantir des évaluations précises et des réparations efficaces, afin que votre véhicule bénéficie des meilleurs soins possibles.' },
        { id: 4, icon: './pics/about/frthcardicon.svg', tittle: 'Un service rapide et fiable en qui vous pouvez avoir confiance.', desc: 'Découvrez un service rapide et fiable chez Auto48 Magiscile, où nous vous remettons sur la route rapidement sans compromettre la qualité ou la sécurité.' },
    ];

    const feedbacks = [
        { id: 1, name: "Mohammed Ste", tittle: "Lorem ipsum", desc: "Lorem Ipsum is simply dummy text of the printing and kjl typesetting industry. Many desktop publishing packages and web page nhklk editors now use Lorem Ipsum as hkl their" },
        { id: 2, name: "Mohammed Auto48", tittle: "Lorem ipsum", desc: "Lorem Ipsum is simply dummy text of the printing and kjl typesetting industry. Many desktop publishing packages and web page nhklk editors now use Lorem Ipsum as hkl their" },
        { id: 3, name: "Hammaoui", tittle: "Lorem ipsum", desc: "Lorem Ipsum is simply dummy text of the printing and kjl typesetting industry. Many desktop publishing packages and web page nhklk editors now use Lorem Ipsum as hkl their" },
        { id: 4, name: "Kaoutar", tittle: "Lorem ipsum", desc: "Lorem Ipsum is simply dummy text of the printing and kjl typesetting industry. Many desktop publishing packages and web page nhklk editors now use Lorem Ipsum as hkl their" },
        { id: 5, name: "lorem", tittle: "Lorem ipsum", desc: "Lorem Ipsum is simply dummy text of the printing and kjl typesetting industry. Many desktop publishing packages and web page nhklk editors now use Lorem Ipsum as hkl their" },
        { id: 6, name: "ipsum", tittle: "Lorem ipsum", desc: "Lorem Ipsum is simply dummy text of the printing and kjl typesetting industry. Many desktop publishing packages and web page nhklk editors now use Lorem Ipsum as hkl their" }
    ];

    const nextpage = () => setInterfaceCard((prev) => (prev + 1) % Math.ceil(cards.length / 2));
    const prevPage = () => setInterfaceCard((prev) => (prev - 1 + Math.ceil(cards.length / 2)) % Math.ceil(cards.length / 2));
    const nextPageFedd = () => setFeedbackinterface((prev) => (prev + 1) % feedbacks.length);
    const prevPageFeed = () => setFeedbackinterface((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);

    const getSocialLink = (label) => {
        const linkObj = socialLinks.find(link => link.label.toLowerCase() === label.toLowerCase());
        return linkObj ? linkObj.url : '#';
    };

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

        const fetchBrands = async () => {
            try {
                const response = await fetch('/api/brand');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();

                const processedBrands = data.map(brand => ({
                    ...brand,
                    file_path: `${window.location.origin}/public/${brand.file_path.replace(/\\/g, '/')}`
                }));

                setBrands(processedBrands);
            } catch (err) {
                console.error('Failed to fetch brands:', err);
                setBrandsError(err.message);
            } finally {
                setBrandsLoading(false);
            }
        };

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

        fetchTexts();
        fetchBrands();
        fetchSocialLinks();
    }, []);

    return (
        <section style={{ overflowX: "clip" }}>
            <div className='flex justify-center lg:scale-[1.9] lg:mt-16'>
                <img src='./pics/design-r1.png' className='scale-[0.3] -mr-9' alt="design element" />
                <p className='font-neo uppercase whitespace-nowrap text-[13px] mt-[0.93rem] leading-[100%]'>
                    <span>À propos de </span>
                    <span className='text-[#C81717]'>nous</span>
                </p>
                <img src='./pics/design-r.png' className='scale-[0.3] -ml-9' alt="design element" />
            </div>

            {/**de la passion a la precesion div */}
            <div className='bg-[#222222] grid grid-cols-12 lg:mt-5 frstComp'>
                <div className='col-span-10 text-white text-justify translate-x-8 mt-3 lg:col-span-4 lg:translate-x-[42rem] lg:px-7 md:translate-x-[26rem] md:col-span-5 xl:translate-x-[52rem] PassionP'>
                    <p className='font-turretBold text-[20px] lg:text-[24px]'>
                        <span>De la </span>
                        <span className='bg-[#C81717] pl-2 pr-2' style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 0, 93% 100%, 79% 100%, 20% 100%, 0 100%, 10% 0)', WebkitClipPath: "polygon(20% 0%, 80% 0%, 100% 0, 93% 100%, 79% 100%, 20% 100%, 0 100%, 10% 0)" }}>passion</span>
                    </p>
                    <p className='font-turretBold text-[20px]'>
                        <span>à la </span>
                        <span className='bg-[#C81717] pl-2 pr-2' style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 0, 93% 100%, 79% 100%, 20% 100%, 0 100%, 10% 0)', WebkitClipPath: "polygon(20% 0%, 80% 0%, 100% 0, 93% 100%, 79% 100%, 20% 100%, 0 100%, 10% 0)" }}>précision</span>
                    </p>
                    <p className='font-turret text-[10px] mt-3 lg:text-[14px]'>
                       Chez AUTO48, notre aventure a commencé par une passion commune pour l’automobile et le désir d’offrir un service meilleur, plus fiable et plus transparent. Aujourd’hui, nous sommes une équipe de confiance, engagée à prendre soin de votre véhicule avec précision et professionnalisme.Chaque intervention est pour nous une promesse de qualité et de sérénité pour nos clients.
                    </p>
                    <div className='-ml-2'>
                        <img src='./pics/about/phoneicon.svg' className='scale-[0.6] mt-3' alt="phone icon" />
                        <div className='ml-16 -mt-10 uppercase mb-5'>
                            <p className='font-spaceMed text-[8px] tracking-[3px]'>Service client</p>
                            <p className='font-space text-[12px]'>
                            <a href={`tel:${getTextByType("num-téléphone", 0)}`}>
                             {textsLoading ? "Chargement..." : getTextByType("num-téléphone", 0)}
                            </a> -
                            <a href={`tel:${getTextByType("num-téléphone", 1)}`}>
                              {textsLoading ? "Chargement..." : getTextByType("num-téléphone", 1)}
                            </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 -mt-5 relative mb-3 lg:col-span-8 lg:ml-[17rem] md:col-span-6 md:translate-x-[-20rem] lg:scale-[1.2] 2xl:translate-x-[-27rem]">
                    <div className="absolute inset-0 translate-y-11 md:scale-x-[1.6] md:translate-x-[-6rem] lg:scale-x-[1.1] lg:scale-y-[0.8] lg:translate-y-10 lg:translate-x-[-16rem] xl:scale-x-[0.9] xl:translate-x-[-19rem] fstpic" style={{ backgroundImage: 'linear-gradient(to bottom, #C81717, #751B21)', clipPath: 'polygon(20% 0%, 60% 1%, 100% 100%, 100% 100%, 80% 100%, 20% 100%, 0 100%, 0 0)' }}></div>
                    <div className="relative">
                        <img src="./pics/about/image.jpg" className="w-[240px] h-[210px] ml-20 mb-10 -mt-1 scale-[0.9] translate-y-11 lg:scale-[1.2] lg:translate-x-[-11rem] lg:translate-y-28 md:scale-[1.1] md:translate-y-14 md:translate-x-[-2rem] xl:scale-[1.3] xl:translate-x-[-6rem] xl:translate-y-[6rem] 2xl:scale-y-[1.2] 2xl:translate-y-[5.4rem] mecanicpic" alt="mechanic" />
                    </div>
                </div>
            </div>

            {/**2nd div; why choice us */}
            <div className='mt-10 lg:scale-[1.8] lg:mt-[0rem]'>
                <div className='flex scale-[0.7] gap-28 -ml-[6.3rem] -mt-28 lg:justify-center'>
                    <img src='./pics/mobile/patternright.png' alt="pattern" />
                    <img src='./pics/mobile/patternleft.png' style={{ clipPath: "polygon(20% 0%, 80% 0%, 42% 0, 85% 100%, 79% 100%, 20% 100%, 0 100%, 0 0)" }} alt="pattern" />
                </div>
                <div className='flex justify-center -mt-[30rem]'>
                    <img src='./pics/design-r1.png' className='scale-[0.3] -mr-11' alt="design element" />
                    <p className='font-neo uppercase whitespace-nowrap text-[13px] mt-[0.93rem] leading-[100%]'>
                        <span className=''>Pourquoi choisir </span>
                        <span className='text-[#C81717]'>Auto48?</span>
                    </p>
                    <img src='./pics/design-r.png' className='scale-[0.3] -ml-11' alt="design element" />
                </div>
                <p className='text-center text-[#C81717] tracking-[2px] ml-4 mr-4 text-[12px] font-turretBold lg:scale-[0.8]'>Votre partenaire de confiance pour des soins automobiles de qualité.</p>
            </div>

            <div className="">
                <div className="relative w-full flex justify-center">
                    <img
                        src="./pics/about/cardsbg.svg"
                        className="blackCardsBg absolute px-12 z-0 scale-x-[0.95] scale-y-[4] translate-y-[4.5rem] mt-24 lg:scale-y-[1.9] lg:scale-x-[0.78] lg:mt-[7rem] md:scale-y-[1.5] md:scale-x-[0.7] md:translate-y-[7.4rem] 2xl:scale-y-[1.4] 2xl:scale-x-[0.85]"
                        alt="background"
                    />
                </div>

                <div className="relative z-50 text-white justify-center">
                    <div className="hidden lg:flex justify-center -mt-[8rem] lg:-mt-16 lg:px-32 BlackCards">
                        <div className="grid grid-cols-12 gap-12 mt-48">
                            {cards.map((card) => (
                                <div key={card.id} className="bg-[#292929] col-span-3">
                                    <div className="m-3">
                                        <img src={card.icon} alt="" className='scale-[0.6]' />
                                        <p className="font-turretBold">{card.tittle}</p>
                                        <p className="font-turret lg:mt-4">{card.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 md:hidden mt-4 px-4">
                        <div className="grid grid-cols-12 gap-4 px-14 mx-auto max-w-sm">
                            {cards.slice(interfaceCard, interfaceCard + 1).map((card) => (
                                <div key={card.id} className="bg-[#292929] blackCard col-span-12 sm:col-span-10 sm:col-start-2 translate-y-7">
                                    <div className="m-3">
                                        <img src={card.icon} alt="" className='scale-[0.6]' />
                                        <p className="font-turretBold">{card.tittle}</p>
                                        <p className="font-turret text-[14px] mt-2">{card.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="absolute flex justify-between w-full px-36 mt-[30rem] translate-y-[-2rem] mobileVectors">
                            <button className="px-2 py-1 rounded" onClick={prevPage}>
                                <img src='./pics/about/vectorright.svg' alt="previous" />
                            </button>
                            <button className="px-2 py-1 rounded" onClick={nextpage}>
                                <img src='./pics/about/vectorleft.svg' alt="next" />
                            </button>
                        </div>
                    </div>

                    {/**md view */}
                    <div className="blackCardsMd hidden md:block lg:hidden flex-col gap-4 mt-8 items-center ml-32">
                        <div className="grid grid-cols-5 gap-4">
                            {cards.slice(interfaceCard * 2, interfaceCard * 2 + 2).map((card) => (
                                <div key={card.id} className="bg-[#292929] col-span-2">
                                    <div className="m-3">
                                        <img src={card.icon} alt="" className='scale-[0.6]' />
                                        <p className="font-turretBold">{card.tittle}</p>
                                        <p className="font-turret">{card.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center w-full md:mt-6 md:-ml-[4.3rem]">
                            <button className="px-2 py-1 rounded" onClick={prevPage}><img src='./pics/about/vectorright.svg' alt="previous" /></button>
                            <button className="px-2 py-1 rounded" onClick={nextpage}><img src='./pics/about/vectorleft.svg' alt="next" /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/**red footer */}
            <div className="relative mt-48 redfooter">
                <div className="relative xl:mt-52">
                    <div className="w-full"
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, #C81717, #751B21)',
                            clipPath: "polygon(20% 0%, 80% 0%, 100% 0, 100% 52%, 81% 53%, 47% 53%, 0 53%, 0 0)",
                            paddingTop: "5rem",
                            paddingBottom: "5rem"
                        }}>

                        <div className="block md:flex text-white uppercase px-4 lg:ml-7 translate-y-[-5.3rem] redfooterP">
                            <div className="block md:block m-4 tracking-[2px]">
                                <p className="font-neo lg:text-[50px] xl:text-[80px] redfooterPBold">+15</p>
                                <p className="text-[9px] mt-2 font-turret lg:text-[12px] xl:text-[17px] redfooterPReg">years experience</p>
                            </div>

                            <p className="hidden md:block md:self-center scale-y-[3] lg:scale-y-[7] lg:ml-4">|</p>

                            <img src="./pics/about/whitevector.svg" className="md:hidden rotate-90 ml-20 -mt-16" alt="Divider" />

                            <div className="block m-4 tracking-[2px] -mt-12 md:mt-4">
                                <p className="font-neo xl:text-[80px] lg:text-[50px] redfooterPBold">+321</p>
                                <p className="text-[9px] mt-2 font-turret lg:text-[12px] xl:text-[17px] redfooterPReg">projects completed</p>
                            </div>

                            <p className="hidden md:block md:self-center scale-y-[3] lg:scale-y-[7] lg:ml-4">|</p>

                            <img src="./pics/about/whitevector.svg" className="md:hidden rotate-90 ml-20 -mt-16" alt="Divider" />

                            <div className="block m-4 tracking-[2px] -mt-12 md:mt-4">
                                <p className="font-neo lg:text-[50px] xl:text-[80px] redfooterPBold">+22</p>
                                <p className="text-[9px] mt-2 font-turret lg:text-[12px] xl:text-[17px] redfooterPReg">expert</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute right-0 bottom-0 transform translate-y-1/4 md:translate-y-0 md:translate-x-0">
                        <img
                            src="./pics/about/whitecar.svg"
                            className="whiteCar scale-[0.6] md:scale-[0.6] translate-y-[-18rem] translate-x-20 md:translate-y-[-2rem] xl:scale-[0.9] lg:scale-[0.7] xl:translate-x-[1rem] xl:translate-y-[-9rem] lg:translate-x-[4rem] lg:translate-y-[-6rem]"
                            alt="Car"
                        />
                    </div>
                </div>
            </div>

            {/*temoinge*/}
            <div className='-mt-36 md:-mt-12'>
                <div className='flex justify-center lg:scale-[1.9] lg:mt-12'>
                    <img src='./pics/design-r1.png' className='scale-[0.3] -mr-9' alt="design element" />
                    <p className='font-neo uppercase whitespace-nowrap text-[13px] mt-[0.93rem] leading-[100%]'>
                        <span className=''>Notre </span>
                        <span className='text-[#C81717]'>témoignage </span>
                    </p>
                    <img src='./pics/design-r.png' className='scale-[0.3] -ml-9' alt="design element" />
                </div>
            </div>
            <p className='text-center text-[#C81717] tracking-[2px] ml-4 mr-4 text-[12px] font-turretBold lg:scale-[0.8] lg:text-[18px]'>Nos voix témoignent de notre force, de notre vécu et de notre espoir.</p>

            <div className="relative z-50 text-black md:hidden justify-center">
                <div className="flex flex-col gap-4 md:hidden lg:hidden mt-8 items-center">
                    <div className="grid grid-cols-12 gap-4">
                        {feedbacks.slice(feedbackinterface, feedbackinterface + 1).map((feedback) => (
                            <div key={feedback.id} className="relative shadow-xl col-span-6 translate-x-28 rounded-lg overflow-hidden">
                                <div className="relative z-10 m-3 text-black">
                                    <img src="./pics/about/feedback.svg" alt="" className="scale-[0.5] ml-[6.5rem] translate-y-0" />
                                    <p className="font-turretBold">{feedback.name}</p>
                                    <p className="font-turret">{feedback.tittle}</p>
                                    <br />
                                    <hr />
                                    <br />
                                    <p>{feedback.desc}</p>
                                    <div className="flex">
                                        <img src="./pics/about/stars.svg" className="scale-[0.8] mt-8 -ml-6" alt="stars" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute flex justify-between w-full px-5 mt-64 translate-y-[-2rem]">
                        <button className="px-2 py-1 rounded" onClick={prevPageFeed}>
                            <img src='./pics/about/vectorright.svg' alt="previous" />
                        </button>
                        <button className="px-2 py-1 rounded" onClick={nextPageFedd}>
                            <img src='./pics/about/vectorleft.svg' alt="next" />
                        </button>
                    </div>
                </div>
            </div>

            {/**the desktop view */}
            <div className="flex-col gap-4 hidden md:block mt-8 items-center px-7 lg:px-14 lg:mt-12 xl:px-24 2xl:px-32 feedbcakcards">
                <div className="grid grid-cols-12 gap-4">
                    {feedbacks.slice(feedbackinterface, feedbackinterface + 2).map((feedback) => (
                        <div key={feedback.id} className="relative shadow-xl col-span-6 rounded-lg overflow-hidden">
                            <div className="relative z-10 m-3 text-black">
                                <img src="./pics/about/feedback.svg" alt="" className="scale-[0.6] ml-60 translate-y-8" />
                                <p className="font-turretBold">{feedback.name}</p>
                                <p className="font-turret">{feedback.tittle}</p>
                                <br />
                                <hr />
                                <br />
                                <p>{feedback.desc}</p>
                                <div className="flex">
                                    <img src="./pics/about/stars.svg" className="scale-[0.8] mt-8 -ml-6" alt="stars" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute flex justify-center w-full mt-64 translate-y-[-15rem] -ml-6 lg:-ml-12 2xl:-ml-32 xl:-ml-24 feedbackButtonsDesktop">
                    <button className="px-2 py-1 rounded" onClick={prevPageFeed}>
                        <img src='./pics/about/vectorright.svg' alt="previous" />
                    </button>
                    <button className="px-2 py-1 rounded" onClick={nextPageFedd}>
                        <img src='./pics/about/vectorleft.svg' alt="next" />
                    </button>
                </div>
            </div>

            {/* Brands Section */}
            <div className='flex justify-center font-turretBold mt-8 md:mt-20'>
                <p className='lg:text-[26px] lg:mt-8'>Marques que nous réparons</p>
            </div>

            {/* Mobile View - Always Infinite Scroll */}
            <div className='w-full overflow-x-hidden lg:hidden'>
                {brandsLoading ? (
                    <div className="flex justify-center py-6">Chargement...</div>
                ) : brandsError ? (
                    <div className="flex justify-center py-6">Erreur de chargement</div>
                ) : (
                    <div className="flex w-max gap-6 animate-scrollLeft will-change-transform">
                        {[...brands, ...brands].map((brand, index) => (
                            <img
                                key={`mobile-${brand.id}-${index}`}
                                src={brand.file_path}
                                alt={brand.BrandName}
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Desktop View - Smart Conditional Display */}
            <div className="hidden lg:block">
                {brandsLoading ? (
                    <div className="flex justify-center w-full py-12">Chargement...</div>
                ) : brandsError ? (
                    <div className="flex justify-center w-full py-12">Erreur de chargement</div>
                ) : brands.length === 6 ? (
                    <div className="flex justify-between px-7 mt-7">
                        {brands.map((brand) => (
                            <img
                                key={`desktop-static-${brand.id}`}
                                src={brand.file_path}
                                alt={brand.BrandName}
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full overflow-x-hidden">
                        <div className="flex w-max gap-6 animate-scrollLeft will-change-transform">
                            {[...brands, ...brands].map((brand, index) => (
                                <img
                                    key={`desktop-scroll-${brand.id}-${index}`}
                                    src={brand.file_path}
                                    alt={brand.BrandName}
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/**form part */}
            <div className="-ml-1 md:ml-3 z-20">
                <div className="mt-16 flex justify-center gap-4 lg:hidden">
                    <img src="./pics/formline.png" alt="" className="mr-40 ml-5" />
                    <img src="./pics/formliner.png" alt="" className="ml-4" />
                </div>
                <div className="lg:mt-16 lg:justify-center lg:gap-48 lg:flex hidden">
                    <img src="./pics/formlineld.png" alt="" className="" />
                    <img src="./pics/formlinerd.png" alt="" className="" />
                </div>
                <div className="flex gap-2 -mt-7 justify-center md:justify-center md:ml-0 lg:justify-center lg:ml-0 lg:gap-4 lg:mb-6">
                    <a href={linksLoading ? "https://web.facebook.com/" : getSocialLink('facebook')} target="_blank" className="relative z-30">
                        <img src="./pics/fclogoo.png" alt="" className="w-[38px] h-[38px]" />
                    </a>
                    <a href={linksLoading ? "https://www.instagram.com/" : getSocialLink('instagram')} target="_blank" className="relative z-30">
                        <img src="./pics/instalogoo.png" alt="" className="w-[38px] h-[38px]" />
                    </a>
                    <a href={linksLoading ? "https://www.tiktok.com/" : getSocialLink('tiktok')} target="_blank" rel="noopener noreferrer" className="relative z-30">
                        <img src="./pics/tiktoklogo.png" alt="" className="w-[38px] h-[38px]" />
                    </a>
                </div>
            </div>

            {/*Second Layout */}
            <div onClick={GoToTheTop} className="relative z-30 flex justify-end mr-2 translate-y-9">
                <img src="./pics/scrolltop.svg" alt="" className="cursor-pointer h-[58.36px] w-[57px] mt-4 mb-8 lg:mt-6 lg:ml-[58rem] lg:h-[77.6.36px] lg:w-[77.6px] md:ml-[44.5rem] md:mt-16 xl:ml-[75rem] Vecposition" />
            </div>
            <div className="flex gap-20 -mt-40 -ml-24 lg:ml-[42rem] lg:mt-9 md:ml-60 xl:ml-[50rem] carposition">
                <img src="./pics/carg.gif" alt="" className="w-[180px] mt-[100px] ml-[6rem] lg:-mt-12 lg:ml-56" />
            </div>

            {/**mobile layout */}
            <div className="lg:hidden xl:hidden 2xl:hidden md:hidden Mobile mt-[520px]">
                <div style={{ backgroundImage: 'linear-gradient(to top, #151514, #640C0C)', clipPath: 'polygon(21% 0, 80% 0, 100% 14%, 100% 100%, 80% 100%, 15% 100%, 0 100%, 0 0)', WebkitClipPath: 'polygon(21% 0, 80% 0, 100% 14%, 100% 100%, 80% 100%, 15% 100%, 0 100%, 0 0)' }} className="relative bg-no-repeat w-full mt-[27rem] z-0 pb-2">
                    <img src="./pics/fortyeightmobilee.png" alt="" className="relative z-10 -mt-[31.5rem] -ml-[0.3rem] fortyeight" style={{ top: "8rem" }} />
                    <div className="relative z-10 -mt-32 ml-[27.3px] Paragraphes">
                        <div>
                            <img src="./pics/mobile/whiteline.png" alt="" className="w-[227.4px]" />
                            <p className="text-white text-[21.09px] font-neo mt-2">POUR NOUS JOINDRE</p>
                            <p className="text-white font-turretBold text-[14.6px] uppercase">Découvrez des solutions abordables <br /> pour votre voiture!</p>
                        </div>

                        <div className="text-white">
                            <p className="">
                                <img src="./pics/mobile/phoneicon.svg" alt="" className="mt-10" />
                                <p className="font-turretBold text-[19px] ml-20 -mt-[4.3rem]" style={{ top: "5rem" }}>Appeler à tout moment</p>
                                <p className="ml-20 font-turret text-[15.04px]">
                                    <a href={`tel:${getTextByType("num-téléphone", 0)}`}>
                                        {textsLoading ? "Chargement..." : getTextByType("num-téléphone", 0)}
                                    </a>
                                </p>
                                <p className="ml-20 font-turret text-[15.04px]">
                                    <a href={`tel:${getTextByType("num-téléphone", 1)}`}>
                                        {textsLoading ? "Chargement..." : getTextByType("num-téléphone", 1)}
                                    </a>
                                </p>
                            </p>

                            <p className="mt-5">
                                <img src="./pics/mobile/mailicon.svg" alt="" />
                                <p className="font-turretBold text-[19px] ml-20 -mt-[3.4rem]">Envoyer un e-mail</p>
                                <p className="font-turret text-[15.04px] ml-20">
                                    <a href='https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzCMjsNBwdlfMCZwFHDpcZtpwCKKbFtXmhgQKgRmNxVsZZrzWFQkjdlrzRKHhqGqNKjkmXv' target='_blank'>contact@auto48.ma</a>
                                </p>
                            </p>

                            <p className="mt-8">
                                <img src="./pics/mobile/locationicon.svg" alt="" />
                                <p className="font-turretBold text-[19px] ml-20 -mt-[4rem]">Visitez-nous</p>
                                <p className="font-turret text-[15.04px] ml-20">
                                    <a href='https://www.google.com/maps/place/Auto+48+:+Atelier+m%C3%A9canique-g%C3%A9n%C3%A9rale,+%C3%A9lectricit%C3%A9-auto,+t%C3%B4lerie-peinture+%26+pneumatique/@34.7051759,-1.8875108,17z/data=!4m14!1m7!3m6!1s0xd78630d9a5f6fc5:0x296af64f87530946!2sZone+Industrielle!8m2!3d34.7051759!4d-1.8875108!16s%2Fg%2F11cnd481y2!3m5!1s0xd78630e47bffab1:0xb77799ac23563bf5!8m2!3d34.7057896!4d-1.883757!16s%2Fg%2F11gdtpvsbn?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D' target='_blank'>
                                        {textsLoading ? "Chargement..." : getTextByType("adresse")}
                                    </a>
                                </p>
                            </p>
                        </div>

                        <div
                            className="relative bg-white z-0 bg-no-repeat bg-cover w-full min-h-[495px] py-2 h-fit px-6 -ml-4 mt-6"
                            style={{ clipPath: "polygon(20% 0%, 96% 0, 100% 8%, 100% 100%, 80% 100%, 5% 100%, 0 96%, 0 0)" }}
                        >
                            <p className="flex w-[268.34px] ml-5 p-2">
                                <img src="./pics/redline.png" className="h-[20px]" alt="" />
                                <p className="font-neo text-[16.38px] uppercase text-[#C81717] -ml-[12.5rem]">PARLEZ-NOUS</p>
                            </p>

                            {/* Form Section */}
                            <form className="relative z-10 space-y-4 text-sm font-turret w-full rounded-s-[2rem]" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={LName}
                                    onChange={(e) => setLName(e.target.value)}
                                    className="input w-full p-3 border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] text-black placeholder-black"
                                />
                                <input
                                    type="text"
                                    placeholder="Prénom"
                                    value={FName}
                                    onChange={(e) => setFName(e.target.value)}
                                    className="input w-full p-3 border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] custom-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Téléphone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="input w-full text-black p-3 border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] custom-input"
                                />
                                <textarea
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="textarea w-full p-3 border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] custom-input h-40 resize-none"
                                />
                                <button
                                    className="button bg-gradient-to-r from-[#C81717] to-[#700000] text-white px-4 py-2 shadow-md w-full"
                                    style={{ clipPath: "polygon(20% 0%, 98% 0, 100% 22%, 100% 100%, 80% 100%, 3% 100%, 0 77%, 0 0)" }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Envoyé'}
                                </button>
                            </form>
                        </div>

                        <div className="mr-6 mb-5">
                            <p className="text-[14.55px] uppercase font-turretBold text-white text-center mt-6">
                                <a href='https://softcactus.ma/' target='_blank'>
                                    © SOFTCACTUS, Tous les droits <br /> sont réservés, 2025
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/**desktop form */}
            <div className="hidden md:block lg:block relative lg:mt-28 lg:-ml-40 lg:w-full md:-mt-[32rem] md:-ml-20 ComponentOfForm">
                <div style={{ backgroundImage: 'linear-gradient(135deg, #151514, #640C0C)', clipPath: 'polygon(23% 0, 71% 0, 100% 51%, 100% 100%, 80% 100%, 15% 100%, 13% 100%, 13% 15%)', WebkitClipPath: 'polygon(23% 0, 71% 0, 100% 51%, 100% 100%, 80% 100%, 15% 100%, 13% 100%, 13% 15%)' }} className="relative bg-no-repeat w-screen mt-[27rem] z-0 md:w-full lg:w-screen lg:-mt-[16rem] lg:ml-20 lg:mr-4">
                    <img src="./pics/fortyeightbgdesk.png" alt="" className="relative z-10 mt-[4.5rem] -ml-[0.3rem] lg:w-[1547.84px] lg:h-[541.84px] lg:ml-7 fortyeightD" style={{ top: "8rem" }} />
                    <div className="relative z-10 -mt-32 ml-[27.3px] lg:ml-48 lg:-mt-[28rem] md:-mt-52 md:ml-40 xl:ml-[17rem] md:pb-16 secondLayout">
                        <div>
                            <img src="./pics/whitelinear.png" alt="" className="w-[227.4px]" />
                            <p className="text-white text-[24.09px] font-neo mt-2 lg:text-[33.78px] md:text-[20px] xl:text-[40px] 2xl:text-[46px] joinP">POUR NOUS JOINDRE</p>
                            <p className="text-white font-turretBold text-[15.6px] md:text-[11.6px] uppercase lg:text-[21.87px] xl:text-[26px] 2xl:text-[32px] discoverP">Découvrez des solutions abordables <br /> pour votre voiture!</p>
                        </div>

                        <div className="text-white">
                            <p className="">
                                <img src="./pics/mobile/phoneicon.svg" alt="" className="mt-10 2xl:h-28 2xl:mt-16" />
                                <p className="font-turretBold text-[19.99px] md:text-[15.99px] ml-20 -mt-[4.3rem] lg:text-[20.98px] xl:text-[27.98px] 2xl:text-[34px] 2xl:ml-40 2xl:-mt-32 InfosTittles" style={{ top: "5rem" }}>Appeler à tout moment</p>
                                <p className="ml-20 font-turret text-[15.04px]">
                                <a href={`tel:${getTextByType("num-téléphone", 0)}`}>
                                  {textsLoading ? "Chargement..." : getTextByType("num-téléphone", 0)}
                                </a>
                                </p>
                                <p className="ml-20 font-turret text-[15.04px]">
                                 <a href={`tel:${getTextByType("num-téléphone", 1)}`}>
                                {textsLoading ? "Chargement..." : getTextByType("num-téléphone", 1)}
                                </a>
                            </p>
                            </p>

                            <p className="mt-5">
                                <img src="./pics/mobile/mailicon.svg" alt="" className="2xl:h-28 2xl:mt-16" />
                                <p className="font-turretBold text-[19.99px] ml-20 -mt-[3.4rem] lg:text-[20.98px] md:text-[15.99px] xl:text-[27.98px] 2xl:text-[34px] 2xl:ml-40 InfosTittles 2xl:-mt-28">Envoyer un e-mail</p>
                                <p className="font-turret text-[16.04px] ml-20 lg:text-[16.83px] md:text-[14px] xl:text-[23.98px] 2xl:text-[27px] 2xl:ml-40 infosContent">
                                    <a href='https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzCMjsNBwdlfMCZwFHDpcZtpwCKKbFtXmhgQKgRmNxVsZZrzWFQkjdlrzRKHhqGqNKjkmXv' target='_blank'>contact@auto48.ma</a>
                                </p>
                            </p>

                            <p className="mt-8">
                                <img src="./pics/mobile/locationicon.svg" alt="" className="2xl:h-28 2xl:mt-16" />
                                <p className="font-turretBold text-[19.99px] ml-20 -mt-[4rem] lg:text-[20.98px] md:text-[15.99px] xl:text-[27.98px] 2xl:text-[34px] 2xl:ml-40 2xl:-mt-28 InfosTittles">Visitez-nous</p>
                                <p className="font-turret text-[16.04px] ml-20 lg:text-[16.83px] md:text-[14px] xl:text-[23.98px] 2xl:text-[27px] 2xl:ml-40 infosContent">
                                    <a href='https://www.google.com/maps/place/Auto+48+:+Atelier+m%C3%A9canique-g%C3%A9n%C3%A9rale,+%C3%A9lectricit%C3%A9-auto,+t%C3%B4lerie-peinture+%26+pneumatique/@34.7051759,-1.8875108,17z/data=!4m14!1m7!3m6!1s0xd78630d9a5f6fc5:0x296af64f87530946!2sZone+Industrielle!8m2!3d34.7051759!4d-1.8875108!16s%2Fg%2F11cnd481y2!3m5!1s0xd78630e47bffab1:0xb77799ac23563bf5!8m2!3d34.7057896!4d-1.883757!16s%2Fg%2F11gdtpvsbn?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D' target='_blank'>
                                        {textsLoading ? "Chargement..." : getTextByType("adresse")}
                                    </a>
                                </p>
                            </p>
                            <br /><br />
                        </div>
                    </div>
                </div>
                <div
  className=" formm relative bg-white py-8 px-6 w-96 mx-auto lg:absolute lg:-right-20 lg:top-[33.5rem] md:z-20  md:w-[362.41px] md:-mt-[29.5rem]  md:ml-[31rem] md:h-[442px] lg:h-[476px] lg:w-[380px] xl:mr-4 xl:w-[450px] xl:h-[600px] "
  style={{clipPath:"polygon(20% 0%, 96% 0, 100% 8%, 100% 100%, 80% 100%, 5% 100%, 0 96%, 0 0)"}}
 >
<p className="flex w-[268.34px] md:hidden ml-7 p-2 lg:hidden xl:hidden 2xl:hidden">
                <img src="./pics/redline.png" className="lg:hidden w-[30px] h-[8px]" alt="" />
                
                <p className="font-neo text-[16.38px] uppercase text-[#C81717] -ml-[12.5rem] lg:text-[20.38px] lg:ml-[3rem] ">PARLEZ-NOUS</p>
</p>
            <p className="parlerNous flex w-[333.34px] ml-7 lg:ml-52 p-2 md:ml-44 md:gap-2 ">
               
                <img src="./pics/fromlf.png" alt="" className=" md:w-[33.15px] md:h-[13.15px] mr-7 md:-ml-44"/>
                <p className="font-neo text-[16.38px] uppercase text-[#C81717] -ml-[12.5rem] lg:text-[20.38px] lg:-ml-[1rem] md:-mt-2 md:-ml-3">PARLEZ-NOUS</p>
                <img src="./pics/fromlr.png" alt="" className=" md:w-[33.15px] md:h-[13.15px] md:ml-3"/>
            </p>


                    {/* Form Section */}
                    <form className="relative z-10 space-y-4 text-sm font-turret w-[313.51px] ml-4 md:ml-1 rounded-s-[2rem] lg:ml-2 xl:w-[400px] xl:ml-1" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={LName}
                            onChange={(e) => setLName(e.target.value)}
                            className="input w-full p-3 lg:p-4 border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] text-black placeholder-black"
                        />
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={FName}
                            onChange={(e) => setFName(e.target.value)}
                            className="input w-full p-3 lg:p-4 border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] custom-input"
                        />
                        <input
                            type="text"
                            placeholder="Téléphone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input w-full lg:p-4 text-black p-3 border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] custom-input"
                        />
                        <textarea
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="textarea w-full p-3 lg:p-4 border border-[#A2A6B0] outline-none rounded-tr-[11px] rounded-bl-[11px] custom-input h-32 resize-none"
                        />
                        <button
                            className="button bg-gradient-to-r from-[#C81717] to-[#700000] text-white px-4 py-2 shadow-md w-[313.51px] xl:w-[400px]"
                            style={{ clipPath: "polygon(20% 0%, 98% 0, 100% 22%, 100% 100%, 80% 100%, 3% 100%, 0 77%, 0 0)" }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Envoyé'}
                        </button>
                    </form>
                </div>

                <p className="text-[#585858] md:text-[19.21px] md:mt-[2rem] md:text-center uppercase md:font-turretBold lg:text-center lg:ml-60 xl:text-[23px] GrayRightsReserved">
                    <a href="https://softcactus.ma/" target="_blank">© SOFTCACTUS, Tous les droits sont réservés, 2025</a>
                </p><br />
            </div>
        </section>
    )
}