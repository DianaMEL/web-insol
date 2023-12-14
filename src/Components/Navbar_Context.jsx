// Navbar.js
import React, { useState } from "react";
import Logo from "../img/Logo.png";
import LogoVerde from "../img/LogoVerde.png";

//Logos
import LogoAmarilloNegro from "../img/Logos/AmarilloNegro.png";
import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";
import LogoVerdeNegro from "../img/Logos/VerdeNegro.png";
import LogoVerdeBlanco from "../img/Logos/VerdeBlanco.png";
import LogoAzulNegro from "../img/Logos/AzulNegro.png";
import LogoAzulBlanco from "../img/Logos/AzulBlanco.png";

import image from "../imgCarrusel/prueba.png";
import { Link } from "react-router-dom";
import { useInsoel } from "../Context/InsoelContext";

const Navbar_Context = () => {
  const { logoColor, setLogoColor, txtColor } = useInsoel();
  const [activeInfo, setActiveInfo] = useState(null);
  console.log(txtColor);

  const handleInfoToggle = (info) => {
    setActiveInfo(activeInfo === info ? null : info);
  };
  return (
    <div>
      <nav
        className={`${
          activeInfo === "proyectos"
            ? "bg-white bg-opacity-75"
            : activeInfo === "nosotros"
            ? "bg-black"
            : activeInfo === "contactanos" ? "bg-black": "bg-transparent"
        }  p-4 absolute top-0 left-0 right-0 z-10 `}
      >
        <div className="flex items-center justify-between">
          <div>
            <Link to={"/"}>
              {logoColor === "amarilloNegro" ? (
                <img className="h-16" src={LogoAmarilloNegro} alt="Logo" />
              ) : logoColor === "amarilloBlanco" ? (
                <img className="h-16" src={LogoAmarilloBlanco} alt="Logo" />
              ) : logoColor === "verdeBlanco" ? (
                <img className="h-16" src={LogoVerdeBlanco} alt="Logo" />
              ) : logoColor === "verdeNegro" ? (
                <img className="h-16" src={LogoVerdeNegro} alt="Logo" />
              ) : logoColor === "azulBlanco" ? (
                <img className="h-16" src={LogoAzulBlanco} alt="Logo" />
              ) : logoColor === "azulNegro" ? (
                <img className="h-16" src={LogoAzulNegro} alt="Logo" />
              ) : (
                <img className="h-16" src={LogoAmarilloNegro} alt="Logo" />
              )}
            </Link>
          </div>

          <div className="hidden lg:flex space-x-4 relative mx-auto text-2xl">
            <div
              className={`text-${txtColor} cursor-pointer  ${
                activeInfo === "proyectos"
                  ? " p-2 border-dashed border-2 bg-gray-400 border-gray-600 rounded-lg "
                  : ""
              }`}
              onClick={() => handleInfoToggle("proyectos")}
            >
              Proyectos
            </div>
            <div
              className={`text-${txtColor} cursor-pointer  ${
                activeInfo === "contactanos" &&
                "p-2 bg-yellow-500 rounded-lg opacity-60"
              }`}
              onClick={() => handleInfoToggle("contactanos")}
            >
              <Link to="/contactanos">Contáctanos</Link>
            </div>
            <div
              className={`text-${txtColor} cursor-pointer ${
                activeInfo === "tecnologias" &&
                "p-2 bg-yellow-500 rounded-lg opacity-60"
              }`}
              onClick={() => {
                handleInfoToggle("tecnologias");
              }}
            >
              <Link to="/tecnologias">Tecnologias</Link>
            </div>
            <div
              className={`text-${txtColor} cursor-pointer ${
                activeInfo === "clientes" &&
                "p-2 bg-yellow-500 rounded-lg opacity-60"
              }`}
              onClick={() => handleInfoToggle("clientes")}
            >
              <Link to="/clientes">Clientes</Link>
            </div>
            <div
              className={`text-${txtColor} cursor-pointer ${
                activeInfo === "nosotros" &&
                "p-2 bg-yellow-500 rounded-lg opacity-60"
              }`}
              onClick={() => handleInfoToggle("nosotros")}
            >
              <Link to="/nosotros">Nosotros</Link>
            </div>
          </div>
        </div>

        {activeInfo && (
          <div
            className={`bg-${
              activeInfo === "proyectos" ? "transparent" : "transparent"
            } bg-opacity-75 p-4 mt-2 w-full text-center text-black`}
          >
            {activeInfo === "proyectos" && (
              <div className="flex items-center">
                <p className="text-right text-2xl mr-5 w-1/3">
                  Biorreactor <br /> <br />
                  Banco UAT <br /> <br />
                  Sistema de Consultas <br /> <br />
                  Apk Lectora QR <br /> <br />
                </p>
                <div className="border-r-2 border-yellow-500 h-[20rem]"></div>
                <img
                  src={image}
                  alt="Descripción de la imagen"
                  className="ml-32 w-1/3"
                />
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar_Context;
