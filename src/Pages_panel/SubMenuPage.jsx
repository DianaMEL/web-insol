import React, { useState } from "react";
import FormSeleccionAreas from '../Components_Panel/FormSeleccionAreas'

function SubMenuPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const handleClickActualizarSubMenu = () =>{
    setMostrarFormulario(true)
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 ">
        {!mostrarFormulario && (
        <h1 className="mt-16 text-3xl font-bold ml-5">Sub Menu </h1>
      )}
      {
        mostrarFormulario ? (
          <div>
            <FormSeleccionAreas/>
          </div>
        ):(
          <button onClick={handleClickActualizarSubMenu} className="mt-14 bg-tertiary hover:bg-secondary text-white py-2 px-4 rounded-md">
            Actualizar SubMenu
          </button>
        )
      }
      </div>
    </div>
  );
}

export default SubMenuPage;
