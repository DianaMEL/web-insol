import React, { useEffect, useState } from "react";
import FormSeleccionAreas from "../Components_Panel/FormSeleccionAreas";
import { useInsoel } from "../Context/InsoelContext";
import SubMenuTable from "../Components_Panel/subMenuTable";
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function SubMenuPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recargar, setRecargar] = useState(false);

  const { obtenerSubMenu, subMenu } = useInsoel();

  useEffect(() => {
    const fetchData = async () => {
      await obtenerSubMenu();
      setIsLoading(false);
    };

    fetchData();
    setRecargar(false)
  }, [recargar]);

  const handleReloadSubMenu = () =>{
    setRecargar(true)
    setMostrarFormulario(false)
  }

  const handleClickActualizarSubMenu = () => {
    setMostrarFormulario(true);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 ">
        {!mostrarFormulario && (
          <h1 className="mt-16 text-3xl font-bold ml-5">Sub Menu </h1>
        )}
        {mostrarFormulario ? (
          <div>
            <FormSeleccionAreas reloadSubMenu = {handleReloadSubMenu} toast={toast} />
          </div>
        ) : (
          <button
            onClick={handleClickActualizarSubMenu}
            className="mt-14 bg-tertiary hover:bg-secondary text-white py-2 px-4 rounded-md"
          >
            Actualizar SubMenu
          </button>
          
        )}
      </div>

      <ToastContainer/>

      {!mostrarFormulario && (
        isLoading ? (
          <div className="text-center">
            <p className="text-xl">Cargando...</p>
          </div>
        ) : (
          <SubMenuTable subMenu={subMenu} />
        )
      )}
    </div>
  );
}

export default SubMenuPage;
