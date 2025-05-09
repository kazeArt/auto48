/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        turret: ["Turret Road", 'sans-serif'],
        neo: ["Neo Cybern", 'sans-serif'],
        space: ["Space Grotesk", 'sans-serif'],
        spaceMed: ["Space Grotesk Meduim", 'sans-serif'],
        turretBold: ['Turret Road Bold', 'sans-serif'],
        poppins: ['Poppins Regular', 'sans-serif'],
      },
      animation:{
        "loop-scroll":"loop-scroll 12s linear infinite",
        scrollLeft: 'scrollLeft 10s linear infinite',
      },
      keyframes:{
        "loop-scroll":{
          from:{ transform : "translateX(0)"},
          to:{ transform : "translateX(-50%)"}
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-40%)' },
        },
      }
    },
    screens: {
      'xs': '430px',
      '2xs': '530px',
      'sm': '640px',
      'md': '768px',
      'mg': '896px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1700px',
      '4xl': '1900px',
      '5xl': '2100px',
      '6xl': '2300px',
      '7xl': '2500px',
      '8xl': '2700px',
      '9xl': '2900px',
      '1xl': '3100px',
    }
    
    
  },
  content: ["./src/**/*.{js,jsx}"],
  plugins: [],
}
