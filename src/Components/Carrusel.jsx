import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInsoel } from "../Context/InsoelContext";
import { getCarruselesRequest } from '../api/carruseles';

// Importa tus imágenes dinámicamente
import image1 from "../img/Carrusel/1.png";
import image2 from "../img/Carrusel/2.png";
import image3 from "../img/Carrusel/3.png";
import image4 from "../img/Carrusel/5.png";

// Crea un array de rutas de imágenes
const imagePaths = [image1, image2, image3, image4];

function Carrusel({ carruseles, tituloCarrusel }) {
   // Buscar el carrusel por el título
   const carruselSeleccionado = carruseles.find(carrusel => carrusel.titulo === tituloCarrusel);
   //console.log('titulo:', carruselSeleccionado);
   // Verificar si se encontró el carrusel
   if (!carruselSeleccionado) {
     return <div>No se encontró el carrusel con el título especificado</div>;
   }
 
   const imagenesDelCarrusel = carruselSeleccionado.imagenes;

  
  //console.log('Carruseles recibidos en Carrusel:', carruseles);
  const { setTxtColor, setLogoColor } = useInsoel();
  const [imagenActiva, setImagenActiva] = useState(0);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Cambia a la siguiente imagen
      setImagenActiva(prevImagen => (prevImagen + 1) % imagenesDelCarrusel.length);
    }, 3000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [imagenesDelCarrusel]); // Elimina imagenesDelCarrusel.length de la dependencia


  // Utiliza imagenActiva para establecer el color
  useEffect(() => {
    // Aquí puedes usar el valor actualizado de imagenActiva para establecer colores
    if (imagenActiva === 0) {
      setTxtColor("white");
      setLogoColor("amarilloBlanco");
    } else {
      // Otros casos según la imagen activa
    }
  }, [imagenActiva]);


  return (
    <div className="">
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] ">
      {imagenesDelCarrusel.map((imagen, index) => (
          <div
            key={index}
            className={`relative  w-full h-auto  md:h-screen flex items-center justify-center transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
              index === imagenActiva ? "block" : "hidden"
            }`}
            data-te-carousel-item
            data-te-carousel-active={index === imagenActiva}
          >
            <img
              src={`http://localhost:3000/uploads/carrusel/${imagen.nuevoNombre}`}
              className="block w-full"
              alt={`Slide ${index + 1}`}
            />
            {/* Agregar el título encima de la imagen */}
            {index === imagenActiva && (
              <div className="">
                <div className="hidden md:block xl:flex xl:justify-center xl:items-center  absolute bg-gray-600 top-1/3 bottom-0 right-0 w-1/3 shadow-lg p-10 mr-5 mb-36 ">
                  <div className="space-y-4 ">
                    <h1 className="text-2xl font-bold text-wi transform md:text-2xl lg:text-3xl xl:text-4xl text-white">
                      AUTOMATIZACIÓN Y <br className="lg:hidden xl:block" />{" "}
                      CONTROL
                    </h1>
                    <h3 className="font-bold text-white md:mb-1 transform md:mt-0 ">
                      Materializamos tus ideas
                    </h3>
                    <button className="bg-primary  text-black py-3 px-8 bottom-16 mt-2 transform border-2 border-black/50 bg-gradient-to-r hover:text-white hover:bg-darkPrimary">
                      <Link to="/web-insol/blog">CONOCE MÁS</Link>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {/* Contenido para pantallas pequeñas */}
        <div className="md:hidden bg-white p-4 text-center">
          <h3 className="font-bold text-black mb-1">
            Materializamos tus ideas
          </h3>
          <h1 className="text-2xl font-bold text-black">
            AUTOMATIZACION Y <br className="lg:hidden xl:block" /> CONTROL
          </h1>
          <button className="bg-primary bg-opacity-75 text-black py-3 px-8 mt-2 border-2 border-black/50 bg-gradient-to-r hover:from-secondary hover:to-tertiary">
            <Link to="/web-insol/blog">CONOCE MÁS</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carrusel;


