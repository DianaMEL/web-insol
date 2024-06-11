import { useEffect, useState } from "react";
import Carrusel from "../Components/Carrusel";
import Nosotros from "../Components/Nosotros";
import Formulario from "../Components/Formulario";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import Map from "../Components/Map";
import MapaPage from "./MapaPage";
import { useInsoel } from "../Context/InsoelContext";
import { getCarruselesRequest } from '../api/carruseles';

function HomePage() {
 

  const [carruseles, setCarruseles] = useState([]); 
  const { setLogoColor, setTxtColor, setProyectColor, setOpacidadColor} = useInsoel();


 // Función para obtener los carruseles
 const obtenerCarruseles = async () => {
  try {
    const response = await getCarruselesRequest();
    console.log("Carruseles obtenidos:", response.data);
    setCarruseles(response.data);
  } catch (error) {
    console.error('Error al obtener carruseles', error);
  }
};

// Llama a la función para obtener los carruseles
useEffect(() => {
  obtenerCarruseles();
}, []);

  useEffect(() => {
    console.log("Carruseles en HomePage:", carruseles);
  }, [carruseles]);

  useEffect(() => {
    // Llamadas asincrónicas para establecer los colores
    setLogoColor('amarilloBlanco');
    setTxtColor('white');
    setProyectColor('bg-tertiary');
    setOpacidadColor('bg-opacity-75 bg-gradient-to-b from-secondary bottom-96');

    // Establece el título de la página
    document.title = "INSOEL";
    return () => {
      document.title = "INSOEL";
    };
  }, []);


  return ( 
    <div className="flex flex-col h-screen  ">
      <div className="flex-grow" id="inicioSeccion">
      <Carrusel carruseles={carruseles} tituloCarrusel="Originales" />
      </div>
      <div className="flex-grow bg-gradient-to-b from-tertiary via-tertiary to-black ">
        <h1 className="text-2xl justify-center text-center text-white mt-5 font-bold">
          Mapa de proyectos en el país
        </h1>
        <p className="justify-normal text-center text-white m-10">
          Te damos la bienvenida a nuestra sección de "Proyectos en el país",
          donde te invitamos a descubrir las diversas ubicaciones dentro de
          nuestro país donde hemos dejado nuestra marca. Cada región, cada
          ciudad es un testimonio de nuestro compromiso con la excelencia y la
          innovación en el ámbito nacional.
        </p>
        <div className="mb-5">
          <Map id="mapa"/>
        </div>
      </div>

      <div className="flex-grow" id="nosotrosSeccion">
        <Nosotros id="nosotrosSeccion" />
      </div>

      <div className="flex-grow mb-5 " id="formularioSeccion">
        <Formulario id="formulario" />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
