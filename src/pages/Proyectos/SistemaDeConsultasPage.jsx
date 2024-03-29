import React from "react";
import { useRef, useEffect, useState } from "react";
import { useInsoel } from "../../Context/InsoelContext";
import Footer from "../../Components/Footer";

import TI from "../../img/Proyectos/TI/000.mp4";
import Carga from "../../img/Proyectos/Banco_Uat/001.gif";

import Img from "../../img/Proyectos/TI/01.png";
import Img1 from "../../img/Proyectos/TI/02.png";
import Img2 from "../../img/Proyectos/TI/03.png";
import Img3 from "../../img/Proyectos/TI/04.png";
import Img4 from "../../img/Proyectos/TI/becas.png";
import Img5 from "../../img/Proyectos/TI/06.png";
import Img6 from "../../img/Proyectos/TI/07.png";
import Img7 from "../../img/Proyectos/TI/09.png"; 

const images = [
  { src: Img2, description: "Sistema de Administración de Consultas" },
  { src: Img7, description: "Sistema de Punto de Venta" },
  { src: Img4, description: "Administración de Becas" },
];

function SistemaDeConsultasPage() {
  const { setLogoColor, setTxtColor, setOpacidadColor } = useInsoel();
  const videoRef = useRef(null);
  const [videoCargado, setVideoCargado] = useState(false);

  setLogoColor("amarilloBlanco");
  setTxtColor("black");
  setOpacidadColor(
    " bg-secondary h-24 "
  );
  useEffect(() => {
    document.title = "INFRAESTRUCTURA TI | INSOEL";
    return () => {
      document.title = "INSOEL";
    };
  }, []);

  useEffect(() => {
    
    const videoElement = videoRef.current;

    const handleVideoEnd = () => {
      videoElement.currentTime = 0; // Reinicia el video al principio
      videoElement.play(); // Inicia la reproducción nuevamente
    };

    videoElement.addEventListener("ended", handleVideoEnd);

    return () => {
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, []); // Asegúrate de pasar un array vacío como dependencia para que el efecto se ejecute solo una vez
  
  const handleLoadedData = () => {
    setVideoCargado(true);
  };

  return (
    <>
      <div className="bg-bajo min-h-screen  flex flex-col">
        <div className=""></div>
        <div className="relative  w-full h-auto  md:h-screen">
        {!videoCargado && ( // Mostrar el gif o video de carga mientras el video principal se está cargando
        <div className="absolute inset-y-0 inset-x-0 flex justify-center max-h-[80%] md:max-h-full items-center bg-black bg-opacity-50 mt-52 sm:mt-0">
          {/*  gif de carga  */}
          <img src={Carga} alt="Cargando..."  />
        </div>
      )}

          <video
            ref={videoRef}
            autoPlay // Inicia la reproducción automáticamente
            //controls
            className={`block h-5/6 w-full object-fill max-h-[80%] md:max-h-full shadow-md mt-24 ${videoCargado ? 'block' : 'hidden'}`}
            onLoadedData={handleLoadedData}
            // block w-full object-fill max-h-[80%] md:max-h-full rounded-lg shadow-md 
          >
            <source src={TI} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
        <div className="text-black m-3 bg-light p-6 rounded-md shadow-md space-y-4">
          <h1 className="text-4xl font-semibold text-accent">
            Integración de Soluciones en Automatización y Control
          </h1>
          <h2 className="text-xl text-secondary">Agosto, 2023</h2>
          <div className="text-justify ">
            <div className="highlight-box mt-4">
              <p>
              En INSOEL ofrecemos el desarrollo de sistemas de información,
                  lo cual permite a los usuarios optimizar y mejorar sus
                  procesos de administración y comunicación, ya sea con sus
                  clientes o compañeros de equipo. Hemos realizado
                  colaboraciones con médicos; implementado un sistema de
                  administración de paciente y consultas, Comerciantes;
                  realizando un punto de venta que le permite monitorear las
                  entradas y salidas de activos en cada uno de sus
                  establecimientos, y se ha colaborado con distintos municipios
                  implementando aplicaciones móviles y web que les permite
                  optimizar su operación. <br />
              </p>
            </div>
            
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.src}
                  alt={`Imagen ${index + 1}`}
                  className=" object-cover rounded-md transition-transform transform hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className=" text-primary bg-secondary bg-opacity-75 p-2 text-lg font-bold">
                     {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-section mt-8">
            <p className="text-lg italic text-gray-600">
              ""Nuestra infraestructura TI: INSOEL, impulsando la optimización de procesos y colaboraciones estratégicas.""
            </p>
          </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default SistemaDeConsultasPage;
