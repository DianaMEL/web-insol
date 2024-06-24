import React from "react";
import { useRef, useEffect, useState } from "react";
import { useInsoel } from "../../Context/InsoelContext";
import imgBancoUAT from "../../img/Proyectos/49.png";
import logo from "../../img/Logos/AmarilloNegro.png";
import Footer from "../../Components/Footer";

import Uat from "../../img/Proyectos/Banco_Uat/000.mp4";
import Carga from "../../img/Proyectos/Banco_Uat/001.gif";

import Img2 from "../../img/Proyectos/Banco_Uat/01.jpg";
import Img3 from "../../img/Proyectos/Banco_Uat/02.jpg";
import Img4 from "../../img/Proyectos/Banco_Uat/12.jpg";
import Img5 from "../../img/Proyectos/Banco_Uat/14.jpeg";
import Img6 from "../../img/Proyectos/Banco_Uat/05.jpg";
import Img7 from "../../img/Proyectos/Banco_Uat/06.jpg";
import Img8 from "../../img/Proyectos/Banco_Uat/08.jpg";
import Img9 from "../../img/Proyectos/Banco_Uat/07.jpg";
import Img10 from "../../img/Proyectos/Banco_Uat/04.jpg";
import Img11 from "../../img/Proyectos/Banco_Uat/03.jpg";
import Img12 from "../../img/Proyectos/Banco_Uat/13.jpg";
import Img13 from "../../img/Proyectos/Banco_Uat/11.jpg";
import Img14 from "../../img/Proyectos/Banco_Uat/10.jpg";
import Img15 from "../../img/Proyectos/Banco_Uat/09.jpg";

const images = [
  { src: Img9, description: "Interfaz de Monitoreo" },
  { src: Img7, description: "Banco de Control" },
  { src: Img6, description: "Dinamonetro" },
];

function BancoUatPage() {
  const { setLogoColor, setTxtColor, setOpacidadColor } = useInsoel();
  const videoRef = useRef(null);
  const [videoCargado, setVideoCargado] = useState(false);

  setLogoColor("amarilloBlanco");
  setTxtColor("black");
  setOpacidadColor("bg-secondary h-24 ");

  useEffect(() => {
    document.title = "BANCO UAT | INSOEL";
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
              <img src={Carga} alt="Cargando..." />
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay // Inicia la reproducción automáticamente
            //controls
            className={`block h-5/6 w-full object-fill max-h-[80%] md:max-h-full shadow-md mt-24 ${
              videoCargado ? "block" : "hidden"
            }`}
            onLoadedData={handleLoadedData}
            // block w-full object-fill max-h-[80%] md:max-h-full rounded-lg shadow-md
          >
            <source src={Uat} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
        <div className="text-black m-3 bg-light p-6 rounded-md shadow-md space-y-4">
          <h1 className="text-4xl font-semibold text-accent">Dinamómetro</h1>
          <h2 className="text-xl text-secondary">Junio, 2023</h2>
          <div className="text-justify ">
            <p>
              La Unidad de Alta Tecnología (UAT) de la Universidad Nacional
              Autónoma de México (UNAM) emprendió la creación de una herramienta
              dedicada a la investigación en motores de combustión, con él
              objetivo de fomentar el desarrollo de nuevas tecnologías y la
              exploración de diversos combustibles. El equipo llevó a cabo la
              construcción de un dinamómetro, incorporando un motor de
              motocicleta y un freno hidráulico para realizar pruebas
              exhaustivas.
            </p>
            <div className="highlight-box mt-4">
              <p>
                INSOEL desempeñó un papel crucial en el proyecto al diseñar y
                fabricar elementos clave, incluyendo:
                <ul className="indent-8 list-inside">
                  <li className="list-disc">Instrumentación de sensores</li>
                  <li className="list-disc">
                    Adquisición y almacenamiento de datos
                  </li>
                  <li className="list-disc">
                    Interfaz gráfica para el monitoreo del dinamómetro
                  </li>
                  <li className="list-disc">
                    Mandos de control para las pruebas del dinamómetro
                  </li>
                  <li className="list-disc">
                    Organización y etiquetado del arnés de motor y otros
                    elementos
                  </li>
                </ul>{" "}
                <br />
                Lo más destacado de la colaboración de INSOEL fue el compromiso
                total con la UAT, participando activamente en cada fase de las
                pruebas del dinamómetro. Contribuimos con nuestro conocimiento y
                estuvimos involucrados en el ensamblaje de componentes
                hidráulicos y mecánicos. Además, participamos en cada prueba del
                dinamómetro, ajustando la instrumentación y agregando
                información relevante a la interfaz. <br />
              </p>
            </div>
            <div className="highlight-box mt-4">
              <p>
                Es relevante destacar que el proyecto se sometió a evaluación
                para obtener una patente, ya que tanto la construcción del
                dinamómetro como su instrumentación presentaron innovaciones
                significativas. Por esta razón, los elementos específicos no sé
                detallan en esta descripción.
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
              <p className="text-primary bg-secondary bg-opacity-50 p-2 text-lg font-bold">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-section mt-8">
        <p className="text-lg italic text-gray-600">
          "Desarrollo tecnológico en acción: INSOEL impulsando la innovación en
          motores de combustión junto a la Unidad de Alta Tecnología (UAT) de la
          Universidad Nacional Autónoma de México (UNAM)."
        </p>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default BancoUatPage;
