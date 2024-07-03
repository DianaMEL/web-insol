/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        drop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        drop: 'drop 0.5s ease-out forwards',
      },
      colors: {
        primary: "#fcd424", // Color primario dorado amarillo
        secondary: "#04547c", // Color secundario azul rey
        tertiary: '#367696', // color tercioario azul claro
        quaternary: '#b09419', // color cuaternario dorado amarillo oscuro 
        darkPrimary: "#B09419"
      },
      fontFamily: {
        custom: ["Exo 2"], // Fuente personalizada
      },
      fontSize: {
        "2xl": "1.75rem", // Tamaño de fuente personalizado
      },
    },
  },
  plugins: [],
};
