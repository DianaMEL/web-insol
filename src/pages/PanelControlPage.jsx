import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import NavbarPanel from "../Components_Panel/NavbarPanel";
import { HiOutlineViewList } from "react-icons/hi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineViewCarousel } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import FormProyectos from "../Components_Panel/FormProyectos";
import FormCarrusel from "../Components_Panel/FormCarrusel";
import PanelPrincipal from "../Components_Panel/PanelPrincipal";
import FormProductos from "../Components_Panel/FormProductos";
import FormCategoria from "../Components_Panel/FormCategoria";
import FormUbicacion from "../Components_Panel/FormUbicacion";
import ProyectosPage from "../Pages_panel/ProyectosPage";
import CarruselPage from "../Pages_panel/CarruselPage";
import SubMenuPage from "../Pages_panel/SubMenuPage";
import MapaUbicacionPage from "../Pages_panel/MapaUbicacionPage";

function PanelControlPage() {
  const [activeTab, setActiveTab] = useState(null); // Estado para rastrear la pestaña activa
  const [showSubMenu, setShowSubMenu] = useState(false); // Estado para rastrear si se muestra el submenú de Proyectos
  const [key, setKey] = useState(0); // Clave para forzar la recarga del componente

  const handleTabClick = (tabName) => {
    // Esta función cambiará el estado activeTab cuando se haga clic en una pestaña
    setActiveTab(tabName);
    // Incrementar la clave para forzar la recarga del componente
    setKey((prevKey) => prevKey + 1);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  /* useEffect(() => {
    if (isAuthenticated) {
      navigate("/web-insol/panel");
    } else {
      navigate("/web-insol/login");
    }
  }, [isAuthenticated]);*/

  return (
    <div className="h-screen">
      <NavbarPanel />
      <div className="flex ">
        {/* Barra lateral */}
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 mt-1 overflow-y-auto bg-secondary  border-t-2 border-primary dark:bg-secondary">
            <ul className="space-y-2 font-medium">
              {/* Proyectos */}
              <li>
                <button
                  className={`flex items-center w-full text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "proyectos" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("proyectos")}
                >
                  <GrProjects className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Proyectos</span>
                </button>
              </li>

              {/* Mapa */}
              <li>
                <button
                  className={`flex items-center w-full text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "mapa" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("mapa")}
                >
                  <FaMapMarkedAlt className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Mapa</span>
                </button>
              </li>

              {/* Carrusel */}
              <li>
                <button
                  className={`flex items-center w-full text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "carrusel" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("carrusel")}
                >
                  <MdOutlineViewCarousel className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Carrusel</span>
                </button>
              </li>

              {/* SubMenu */}
              <li>
                <button
                  className={`flex items-center w-full text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "submenu" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("submenu")}
                >
                  <HiOutlineViewList className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Areas</span>
                </button>
              </li>

              {/* Tienda */}
              <li>
                <button
                  className={`flex items-center w-full text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "tienda" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("tienda")}
                >
                  <FaStore className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Tienda</span>
                </button>
              </li>
              {/* Agregar Productos */}
              <li>
                <button
                  className={`flex items-center w-full text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "agregarProducto" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("agregarProducto")}
                > 
                </button>
              </li>
              {/* Agregar Categorias */}
              <li>
                <button
                  className={`flex items-center w-full text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "agregarCategoria" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("agregarCategoria")}
                > 
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Contenido principal */}
        <div key={key} className="flex-1 xl:mt-0 sm:ml-64 ">
          {/* Contenido dinámico basado en la pestaña activa */}
          {!activeTab && (
            <div>
              <PanelPrincipal />
            </div>
          )}
          {activeTab === "carrusel" && (
            <div>
              <CarruselPage />
            </div>
          )}
          {activeTab === "proyectos" && (
            <div>
              <ProyectosPage />
            </div>
          )}
          {activeTab === "tienda" && (
            <div>
              <PanelPrincipal />
            </div>
          )}
          {activeTab === "submenu" && (
            <div className="mb-20">
              <SubMenuPage />
            </div>
          )}
          {activeTab === "mapa" && (
            <div>
              <MapaUbicacionPage />
            </div>
          )}
          {activeTab === "nuevoProyecto" && (
            <div className="mt-24">
              <FormProyectos />
            </div>
          )}
          {activeTab === "agregarProducto" && (
            <div className="">
              <FormProductos />
            </div>
          )}
          {activeTab === "agregarCategoria" && (
            <div className="">
              <FormCategoria />
            </div>
          )}
          {activeTab === "agregarImg" && (
            <div className="">
              <FormCarrusel />
            </div>
          )}
          {activeTab === "agregarUbicacion" && (
            <div className="">
              <FormUbicacion />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PanelControlPage;
