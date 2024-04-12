import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import NavbarPanel from "../Components_Panel/NavbarPanel";
import { HiOutlineViewList } from "react-icons/hi";
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

  const handleTabClick = (tabName) => {
    // Esta función cambiará el estado activeTab cuando se haga clic en una pestaña
    setActiveTab(tabName);
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
    <div className="bg-darkPrimary bg-opacity-50 h-screen">
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
                <a
                  href="#"
                  className={`flex items-center text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "proyectos" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("proyectos")}
                >
                  <HiOutlineViewList className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Proyectos</span>
                </a>
              </li>

              {/* Mapa */}
              <li>
                <a
                  href="#"
                  className={`flex items-center text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "mapa" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("mapa")}
                >
                  <HiOutlineViewList className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Mapa</span>
                </a>
              </li>

              {/* Carrusel */}
              <li>
                <a
                  href="#"
                  className={`flex items-center text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "carrusel" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("carrusel")}
                >
                  <HiOutlineViewList className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Carrusel</span>
                </a>
              </li>

              {/* SubMenu */}
              <li>
                <a
                  href="#"
                  className={`flex items-center text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "submenu" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("submenu")}
                >
                  <HiOutlineViewList className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">SubMenu</span>
                </a>
              </li>

              {/* Tienda */}
              <li>
                <a
                  href="#"
                  className={`flex items-center text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "tienda" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("tienda")}
                >
                  <HiOutlineViewList className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Tienda</span>
                </a>
              </li>
              {/* Agregar Productos */}
              <li>
                <a
                  href="#"
                  className={`flex items-center text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "agregarProducto" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("agregarProducto")}
                >
                  <HiOutlineViewList className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Agregar Productos</span>
                </a>
              </li>
              {/* Agregar Categorias */}
              <li>
                <a
                  href="#"
                  className={`flex items-center text-white hover:text-black hover:bg-primary p-2 mt-2 rounded-lg dark:text-white group ${
                    activeTab === "agregarCategoria" ? "" : ""
                  }`}
                  onClick={() => handleTabClick("agregarCategoria")}
                >
                  <HiOutlineViewList className="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-secondary text-primary" />
                  <span className="p-2 font-bold">Agregar Categoria</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 xl:mt-0 sm:ml-64 ">
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
