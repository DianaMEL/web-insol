import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useInsoel } from "../Context/InsoelContext";

import LogoAmarilloNegro from "../img/Logos/AmarilloNegro.png";
import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";
import LogoAmarilloBlancoNosotros from "../img/Logos/AmarilloBlanco.png";
import LogoVerdeNegro from "../img/Logos/VerdeNegro.png";
import LogoVerdeBlanco from "../img/Logos/VerdeBlanco.png";
import LogoAzulNegro from "../img/Logos/AzulNegro.png";
import LogoAzulBlanco from "../img/Logos/AzulBlanco.png";

// Importa tus imágenes dinámicamente para seccion de ¿que hacemos?
import image1 from "../img/Submenu/desarrollo.png";
import image2 from "../img/Submenu/implementacion.png";
import image3 from "../img/Submenu/TI.png";
import image4 from "../img/Submenu/adquisicion.png";

const Navbar_Context = () => {
  const { logoColor, setLogoColor, txtColor } = useInsoel();
  const { proyectColor, opacidadColor } = useInsoel();
  const [activeInfo, setActiveInfo] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [mostrarContenido, setMostrarContenido] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isContentActive, setIsContentActive] = useState(false);

  const { obtenerSubMenu, subMenu } = useInsoel();
  console.log(subMenu)

  const handleInfoToggle = (info) => {
    setActiveInfo(activeInfo === info ? null : info);
    if (activeInfo === info) {
      setIsContentActive(!isContentActive); // Cambia el estado al hacer clic nuevamente en la misma sección
    } else {
      setActiveInfo(info);
      setIsContentActive(true); // Activa el contenido al hacer clic en una nueva sección
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    setMostrarContenido(false);
  };

  const toggleContenido = (e) => {
    e.stopPropagation(); // Evita que el clic se propague al contenedor principal
    setMostrarContenido(!mostrarContenido);
  };

  const handleLogoClick = () => {
    // Restablecer la sección activa al valor predeterminado al hacer clic en el logo
    setActiveInfo("bg-gradient-to-b from-secondary ");
  };

  const imagePaths = [image1, image2, image3, image4];

  const enlaces = [
    !subMenu ? "/proyectos/BancoUAT" : `/web-insol/proyecto/${subMenu.enlace1._id}`,
    !subMenu ? "/proyectos/Biorreactor" : `/web-insol/proyecto/${subMenu.enlace2._id}`,
    !subMenu ? "/proyectos/Consultas" :  `/web-insol/proyecto/${subMenu.enlace3._id}`,
    !subMenu ? "/web-insol/Tienda" : `/web-insol/proyecto/${subMenu.enlace4._id}`,
  ];

  const descripciones = [
    !subMenu ?"Explora nuestra sección de Desarrollo Tecnológico para conocer los proyectos pioneros que hemos llevado a cabo. Desde la creación de soluciones personalizadas hasta la adopción de tecnologías emergentes, demostramos nuestro compromiso con la innovación y el avance en el mundo digital." : subMenu.area1.descripcion,

    !subMenu ? "Descubre nuestra amplia gama de proyectos de integración, donde combinamos tecnología innovadora y expertise empresarial para ofrecer soluciones personalizadas y eficientes. Desde integración de sistemas hasta implementaciones de software a medida, cada proyecto refleja nuestro compromiso con la excelencia y la satisfacción del cliente." : subMenu.area2.descripcion,

    !subMenu ? "Descubre cómo nuestra empresa ha transformado la infraestructura tecnológica con proyectos innovadores y eficientes. Desde la implementación de sistemas de gestión avanzados hasta la optimización de redes y servidores, nuestra sección de Infraestructura TI muestra nuestro compromiso con la excelencia tecnológica y la mejora continua." : subMenu.area3.descripcion,

    !subMenu ? "Descubre nuestra sección de adquisición de equipos y herramientas, donde nuestra tienda virtual te brinda acceso directo a los productos líderes de la industria. Descubre soluciones eficientes para impulsar tus proyectos con facilidad y confianza." : subMenu.area4.descripcion,
  ];

  const [imagen, setImagen] = useState(0);

  const handleClick = (index) => {
    setImagen(index);
    setSelectedItem(index);
    setIsHovered(!isHovered); // Invertir el estado al hacer clic
  };

  const handleMouseLeave = () => {
    if (activeInfo === "proyectos" && isContentActive) {
      setActiveInfo("bg-gradient-to-b from-secondary bottom-96");
      setIsContentActive(false); // Desactiva el contenido al salir del recuadro
    }
  };

  useEffect(() => {
    obtenerSubMenu();
  }, []);
  if (subMenu) {
    //console.log(subMenu.area1)
  }

  return (
    <div>
      <nav
        className={`${
          activeInfo === "proyectos" && isContentActive
            ? proyectColor
            : activeInfo === ""
            ? ""
            : opacidadColor
        } p-4 absolute top-0 left-0 right-0  z-10 `}
        //onMouseLeave={handleMouseLeave}
        onMouseLeave={
          activeInfo === "proyectos" && isContentActive
            ? handleMouseLeave
            : null
        }
      >
        {/* logos */}
        <div className="flex items-center justify-between">
          <div className="bg-transparent ">
            <Link to={"/web-insol/"} onClick={handleLogoClick}>
              <motion.img
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
                className="h-16"
                src={
                  logoColor === "amarilloNegro"
                    ? LogoAmarilloNegro
                    : logoColor === "amarilloBlanco" &&
                      proyectColor &&
                      opacidadColor
                    ? LogoAmarilloBlanco
                    : logoColor === "verdeBlanco" && opacidadColor
                    ? LogoVerdeBlanco
                    : logoColor === "verdeNegro"
                    ? LogoVerdeNegro
                    : logoColor === "azulBlanco"
                    ? LogoAzulBlanco
                    : logoColor === "azulNegro"
                    ? LogoAzulNegro
                    : logoColor === "amarilloBlancoNosotros" &&
                      proyectColor &&
                      opacidadColor
                    ? LogoAmarilloBlancoNosotros
                    : LogoAmarilloBlanco
                }
                alt="Logo"
              />
            </Link>
          </div>

          {/*Navavar con Framer-motion */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-16 6h16"
                ></path>
              </svg>
            </button>
          </div>

          {/*Navavar */}
          <div className="hidden lg:flex space-x-5 relative mx-auto text-[22px] mr-10">
            <div
              className={`text-${
                activeInfo === "proyectos" ? "black" : "white"
              } cursor-pointer  ${
                activeInfo === "proyectos"
                  ? "p-1 pr-2 pl-2 bg-darkPrimary  transform border-2 border-black/50 rounded-lg "
                  : "hover:text-black hover:bg-primary p-1 pr-2 pl-2 rounded-lg"
              }`}
              onClick={() => handleInfoToggle("proyectos")}
            >
              ¿Qué hacemos?
            </div>
            <div
              className={`text-${txtColor} cursor-pointer ${
                activeInfo === "tecnologias" &&
                "p-1 pr-2 pl-2 bg-primary bg-opacity-75 transform border-2 border-black/50 rounded-lg"
              }`}
              onClick={() => {
                handleInfoToggle("tecnologias");
              }}
            >
              <Link
                to="/web-insol/tecnologias"
                style={{
                  color: activeInfo === "tecnologias" ? "black" : txtColor,
                  // Ajusta según sea necesario
                }}
              ></Link>
            </div>
            <div
              className={`text-${
                activeInfo === "nosotros" ? "black" : "white"
              } cursor-pointer  ${
                activeInfo === "nosotros"
                  ? "p-1 pr-2 pl-2 bg-darkPrimary transform border-2 border-black/50 rounded-lg "
                  : " hover:text-black hover:bg-primary p-1 pr-2 pl-2 rounded-lg"
              }`}
              onClick={() => handleInfoToggle("nosotros")}
            >
              <Link
                to="/web-insol/nosotros"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                style={
                  {
                    //color: activeInfo === "nosotros" ? "black" : txtColor,
                    // Ajusta según sea necesario
                  }
                }
              >
                ¿Quiénes Somos?
              </Link>
            </div>
            <div
              className={`text-${txtColor} cursor-pointer ${
                activeInfo === "clientes" &&
                "p-1 pr-2 pl-2 bg-primary bg-opacity-75 transform border-2 border-black/50 rounded-lg "
              }`}
              onClick={() => handleInfoToggle("clientes")}
            >
              <Link
                to="/web-insol/tienda"
                style={{
                  color: activeInfo === "clientes" ? "black" : txtColor,
                  // Ajusta según sea necesario
                }}
              ></Link>
            </div>

            <div
              className={`text-${
                activeInfo === "contactanos" ? "black" : "white"
              } cursor-pointer  ${
                activeInfo === "contactanos"
                  ? "p-1 pr-2 pl-2 bg-darkPrimary transform border-2 border-black/50 rounded-lg"
                  : "hover:text-black hover:bg-primary p-1 pr-2 pl-2 rounded-lg"
              }`}
              onClick={() => handleInfoToggle("contactanos")}
            >
              <Link
                to="/web-insol/contactanos"
                style={
                  {
                    //color: activeInfo === "contactanos" ? "black" : txtColor,
                    // Ajusta según sea necesario
                  }
                }
              >
                Contactarnos
              </Link>
            </div>
          </div>
        </div>

        {/* menu en pantallas pequeñas */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-black bg-opacity-50 fixed inset-0 z-50"
              onClick={toggleMenu}
            >
              <div className="container mx-auto flex justify-end items-center py-16 ">
                <div className="bg-bajo p-4 ">
                  <div className="container mx-auto flex items-center h-auto ">
                    {/* Menú Principal */}
                    <div className="bg-white p-4 rounded-md shadow-md ">
                      <ul className="text-xl">
                        <li className="hover:bg-primary rounded p-2">
                          <Link to={"/web-insol/"}>Inicio</Link>
                        </li>
                        <br />
                        <li
                          className={`hover:bg-primary rounded p-2 ${
                            mostrarContenido ? "bg-primary" : ""
                          }`}
                          onClick={toggleContenido}
                        >
                          <a className="cursor-pointer">¿Qué hacemos?</a>
                        </li>
                        <br />
                        <li className="hover:bg-primary rounded p-2">
                          <Link to={"/web-insol/nosotros"}>
                            ¿Quiénes Somos?
                          </Link>
                        </li>
                        <br />
                        <li className="hover:bg-primary rounded">
                          <Link to={"/web-insol/tienda"}></Link>
                        </li>
                        <li className="hover:bg-primary rounded p-2">
                          <Link to={"/web-insol/contactanos"}>
                            Contactarnos
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Menú de "¿Qué hacemos?" */}
                    {mostrarContenido && (
                      <aside className="bg-white p-4 absolute left-0 border-2 border-primary rounded-md shadow-md w-52 mt-52 ">
                        <ul className="text-xl pl-2  ">
                          <li className="space-y-2 list-disc pt-2 pb-2">
                            <Link
                              to={!subMenu ? "/proyectos/BancoUAT" : `/web-insol/proyecto/${subMenu.enlace1._id}`}
                              className="block text-black hover:bg-primary rounded p-2"
                            >
                              {!subMenu
                                ? "Desarrollo Tecnológico"
                                : subMenu.area1.area}
                            </Link>
                          </li>
                          <li className="space-y-2 list-disc pt-2 pb-2">
                            <Link
                              to={!subMenu ? "/proyectos/Biorreactor" : `/web-insol/proyecto/${subMenu.enlace2._id}`}
                              className="block text-black hover:bg-primary rounded p-2"
                            >
                              {!subMenu ? "Soluciones de Integración" : subMenu.area2.area}
                            </Link>
                          </li>
                          <li className="space-y-2 list-disc pt-2 pb-2">
                            <Link
                              to={!subMenu ? "/proyectos/Consultas" : `/web-insol/proyecto/${subMenu.enlace3._id}`}
                              className="block text-black hover:bg-primary rounded p-2"
                            >
                              {!subMenu ? "Infraestructura TI" : subMenu.area3.area}
                            </Link>
                          </li>
                          <li className="space-y-2 list-disc pt-2 pb-2">
                            <Link
                              to={!subMenu ? "/web-insol/tienda" : `/web-insol/proyecto/${subMenu.enlace4._id}`}
                              className="block text-black hover:bg-primary rounded p-2"
                            >
                              {!subMenu ? "Adquisición de Equipos y Herramientas" : subMenu.area4.area}
                            </Link>
                          </li>
                        </ul>
                      </aside>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* menu de proyectos */}
        {activeInfo && (
          <div
            className={`bg-${
              activeInfo === "proyectos" ? "transparent" : "transparent"
            } bg-opacity-75 p-4 mt-2 w-full text-center text-black`}
            onMouseLeave={handleMouseLeave}
          >
            {activeInfo === "proyectos" && isContentActive && (
              <div className="flex items-center ">
                <div className="text-right text-white text-2xl mr-5 w-1/3">
                  <p
                    className={`cursor-pointer ${
                      selectedItem === 0
                        ? "hover:bg-primary hover:text-black p-1 pr-2 pl-2 rounded-lg text-black"
                        : "hover:bg-primary hover:text-black p-1 pr-2 pl-2 rounded-lg"
                    }`}
                    onClick={() => handleClick(0)}
                    //onClick={() => handleInfoToggle("proyectos")}
                  >
                    {!subMenu ? "Desarrollo Tecnológico" : subMenu.area1.area}
                    <br />
                  </p>
                  <br />
                  <p
                    className={`cursor-pointer ${
                      selectedItem === 1
                        ? "hover:bg-primary hover:text-black p-1 pr-2 pl-2 rounded-lg text-black"
                        : "hover:bg-primary hover:text-black p-1 pr-2 pl-2 rounded-lg"
                    }`}
                    onClick={() => handleClick(1)}
                  >
                    {!subMenu
                      ? "Soluciones de Integración"
                      : subMenu.area2.area}
                    <br />
                  </p>
                  <br />
                  <p
                    className={`cursor-pointer ${
                      selectedItem === 2
                        ? "hover:bg-primary hover:text-black p-1 pr-2 pl-2 rounded-lg text-black"
                        : "hover:bg-primary hover:text-black p-1 pr-2 pl-2 rounded-lg"
                    }`}
                    onClick={() => handleClick(2)}
                  >
                    {!subMenu ? "Infraestructura TI" : subMenu.area3.area}
                    <br />
                  </p>
                  <br />
                  <p
                    className={`cursor-pointer ${
                      selectedItem === 3
                        ? "hover:bg-primary hover:text-black p-1 pr-2 pl-2 rounded-lg text-black"
                        : "hover:bg-primary hover:text-black p-1 pr-2 pl-2 rounded-lg"
                    }`}
                    onClick={() => handleClick(3)}
                  >
                    {!subMenu
                      ? "Adquisición de Equipos y Herramientas"
                      : subMenu.area4.area}
                  </p>
                </div>

                <div className="border-r-2 border-yellow-500 h-[20rem] ml-10"></div>
                <div className="ml-16 w-2/3">
                  <div className="flex">
                    {imagePaths.map((path, index) => (
                      <div
                        key={index}
                        className={`relative flex ${
                          index === imagen ? "block" : "hidden"
                        }`}
                        data-te-carousel-item
                        data-te-carousel-active={index === imagen}
                      >
                        <img
                          src={path}
                          alt={`Slide ${index + 1}`}
                          className="w-[20rem]"
                        />
                        <div className="flex flex-col items-start mt-3 ml-3">
                          <p className="text-lg text-white text-justify p-5 ">
                            {descripciones[index]}
                          </p>
                          <Link to={enlaces[index]}>
                            <button
                              className="absolute bottom-0 right-0 p-1 pr-2 pl-2 mb-5 bg-primary transform border-2 border-black/50 bg-gradient-to-r hover:bg-darkPrimary rounded-lg "
                              onClick={() => handleInfoToggle("proyectos")}
                            >
                              Ver más
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};
{
  /* <Link to={"/proyectos/biorreactor"}>Biorreactor</Link> */
}
export default Navbar_Context;
