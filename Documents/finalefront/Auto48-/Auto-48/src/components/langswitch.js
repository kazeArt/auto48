import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const languageOptions = [
  {
    value: "en",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/flags/en.png"
          alt="English"
          style={{ marginRight: "10px" }}
          className="h-[26px] lg:h-[27px] 2xl:h-[32px] 4xl:h-[34px] 8xl:h-[42px] 1xl:h-[46px] w-full"        />
      </div>
    ),
    flag: "/flags/en.png",
  },
  {
    value: "fr",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/flags/fr.png"
          alt="Français"
          style={{ marginRight: "10px" }}
          className="h-[26px] lg:h-[27px] 2xl:h-[32px] 4xl:h-[34px] 8xl:h-[42px] 1xl:h-[46px] w-full"
        />
      </div>
    ),
    flag: "/flags/fr.png",
  },
  {
    value: "mr",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/flags/mr.png"
          alt="Morocco"
          style={{ marginRight: "10px" }}
          className="h-[26px] lg:h-[27px] 2xl:h-[32px] 4xl:h-[34px] 6xl:h-[38px] 8xl:h-[42px] 1xl:h-[46px] w-full"        />
      </div>
    ),
    flag: "/flags/mr.png",
  },
];

export default function LangSwitch() {
  const [selectedLang, setSelectedLang] = useState(null);

  useEffect(() => {
    const langFromStorage = localStorage.getItem("lang");
    if (langFromStorage) {
      setSelectedLang(langFromStorage);
    } else {
      setSelectedLang("en");
    }
  }, []);

  const handleChangeLanguage = (selectedOption) => {
    const langCode = selectedOption.value;
    localStorage.setItem("lang", langCode);
    setSelectedLang(langCode);

    fetch(`http://your-laravel-api.com/api/language/${langCode}`)
      .then((res) => res.json())
      .then((data) => console.log("Language changed:", data))
      .catch((error) => console.error("Error changing language:", error));
  };

  const filterOption = (option, inputValue) => {
    return option.value !== selectedLang;
  };

  return (
    <div  className="w-[160px] 2xl:w-[180px] 4xl:w-[205px] 6xl:w-[230px] 8xl:w-[270px] 1xl:w-[320px]">
      <Select
        options={languageOptions}
        value={languageOptions.find((option) => option.value === selectedLang)}
        onChange={handleChangeLanguage}
        components={makeAnimated()}
        filterOption={filterOption}
        styles={{
          control: (provided) => ({
            ...provided,
            width: "50%",
            borderColor: "#ccc",
            border: "none",
            borderRadius: "0px",
            padding: "0 0",
            "@media (min-width: 1536px)": {
              padding: "4px 1px",
            },
            "@media (min-width: 1900px)": {
              padding: "5px 2px",
            },
            "@media (min-width: 2300px)": {
              padding: "8px 3px",
            },
            "@media (min-width: 2700px)": {
              padding: "10px 4px",
            },
            "@media (min-width: 3100px)": {
              padding: "13px 5px",
            },
          }),
          option: (provided) => ({
            ...provided,
            display: "flex",
            alignItems: "center",

          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            width: "20px",
            height: "25px",
            marginRight: "4px",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "transparent",
            backgroundImage: "url('/flags/arrdown.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            paddingRight: "2px",
            width: "18px",
            height: "23px",
            
            "@media (min-width: 1536px)": {
              paddingRight: "1px",
              width: "22px",
              height: "27px",
            },
            "@media (min-width: 1900px)": {
              paddingRight: "2px",
              width: "24px",
              height: "30px",
            },
            "@media (min-width: 2300px)": {
              paddingRight: "4px",
              width: "28px",
              height: "30px",
            },
            "@media (min-width: 2700px)": {
              paddingRight: "6px",
              width: "40px",
              height: "30px",
            },
            "@media (min-width: 3100px)": {
              paddingRight: "7px",
              width: "50px",
              height: "40px",
            },
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          menu: (provided) => ({
            ...provided,
            width: "35%",
            marginTop: "0px",
            marginRight:"23px",
            borderRadius: "0px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }),
          

          indicatorsContainer: (provided) => ({
            ...provided,
            display: "flex",
            alignItems: "center",            
          }),
          container: (provided) => ({
            ...provided,
          }),
        }}
      />
    </div>
  );
}