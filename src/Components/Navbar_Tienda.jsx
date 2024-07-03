import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useInsoel } from "../Context/InsoelContext";
import { RiSearchLine } from 'react-icons/ri';
import { FaWhatsapp } from "react-icons/fa";

import LogoAmarilloNegro from "../img/Logos/AmarilloNegro.png";
import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";
import LogoAmarilloBlancoNosotros from "../img/Logos/AmarilloBlanco.png";
import LogoVerdeNegro from "../img/Logos/VerdeNegro.png";
import LogoVerdeBlanco from "../img/Logos/VerdeBlanco.png";
import LogoAzulNegro from "../img/Logos/AzulNegro.png";
import LogoAzulBlanco from "../img/Logos/AzulBlanco.png";

function Navbar_Tienda() {
  const { logoColor } = useInsoel();
  const { proyectColor, opacidadColor } = useInsoel();
  const [activeInfo, setActiveInfo] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");

  const handleInfoToggle = (info) => {
    setActiveInfo(activeInfo === info ? null : info);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    setActiveInfo(null);
  };

  const handleChangeFiltroNombre = (event) => {
    setFiltroNombre(event.target.value);
  };

  return (
    <div>
      <nav className="bg-secondary shadow-lg p-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to={"/web-insol/"} onClick={handleLogoClick}>
                <motion.img
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.5 }}
                  className="h-16"
                  src={
                    logoColor === "amarilloBlanco"
                      ? LogoAmarilloBlanco
                     
                      : LogoAmarilloBlanco
                  }
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
              <div className="hidden md:flex items-center ">
               {/* Agregar el campo de búsqueda  */}
               <input
                  type="text"
                  //value={filtroNombre}
                 // onChange={handleChangeFiltroNombre}
                  placeholder="Buscar por nombre "
                  className=" p-2 w-[20rem] border rounded-md mr-5 border-gray-800 pl-8"
                />
                <RiSearchLine className="absolute top-1/2 left-2 transform -translate-y-1/2 text-darkPrimary" /> 
              
            </div>
                <div className="relative">
                  <button
                    onClick={() => handleInfoToggle("categorias")}
                    className={`text-white hover:bg-primary hover:text-black px-3 py-2 rounded-md text-base font-medium ${
                      activeInfo === "categorias" ? "bg-darkPrimary text-white" : ""
                    }`}
                  >
                    Categorías
                  </button>
                  {activeInfo === "categorias" && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg z-10">
                      <div className="py-1 bg-white rounded-md shadow-xs">
                        <Link
                          to="/web-insol/categoria1"
                          className="block px-4 py-2 text-sm text-black hover:bg-darkPrimary"
                        >
                          Categoría 1
                        </Link>
                        <Link
                          to="/web-insol/categoria2"
                          className="block px-4 py-2 text-sm text-black hover:bg-darkPrimary"
                        >
                          Categoría 2
                        </Link>
                        <Link
                          to="/web-insol/categoria3"
                          className="block px-4 py-2 text-sm text-black hover:bg-darkPrimary"
                        >
                          Categoría 3
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  to={"https://wa.me/message/WAYW2ZY6BUU6G1?src=qr"}
                  className="text-white bg-green-500  px-3 py-2 rounded-md text-base font-medium"
                >
                  <div className="flex">
                  <FaWhatsapp className=' mr-1 text-xl'/>
                  <p>WhatsApp</p>
                  </div>
                  
                  
                </Link>
              </div>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-16 6h16"
                  />
                </svg>
              </button>
            </div>
           
          </div>
        </div>

        {/* Menu para pantallas pequeñas */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="md:hidden bg-gray-100"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/web-insol/"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Inicio
                </Link>
                <button
                  onClick={() => handleInfoToggle("categorias")}
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Categorías
                </button>
                {activeInfo === "categorias" && (
                  <div className="px-3 py-2">
                    <Link
                      to="/web-insol/categoria1"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Categoría 1
                    </Link>
                    <Link
                      to="/web-insol/categoria2"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Categoría 2
                    </Link>
                    <Link
                      to="/web-insol/categoria3"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Categoría 3
                    </Link>
                  </div>
                )}
                <Link
                  to="/web-insol/contactanos"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Contactarnos
                </Link>
                <div className="mt-3 px-2">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="px-4 py-2 border rounded-lg w-full text-sm"
                  />
                  
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

export default Navbar_Tienda;
