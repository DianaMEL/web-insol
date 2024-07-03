import React, {useEffect, useState} from 'react'
import TiendaPanel from '../Components_Panel/TiendaPanel';
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import FormProductos from '../Components_Panel/FormProductos';

function TiendaPanelPage() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recargar, setRecargar] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      
      setIsLoading(false);
    };

    fetchData();
    setRecargar(false)
  }, [recargar]);

  const handleReloadSubMenu = () =>{
    setRecargar(true)
    setMostrarFormulario(false)
  }

  const handleClickAgreagrProducto = () => {
    setMostrarFormulario(true);
  };

    return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8 ">
            {!mostrarFormulario && (
              <h1 className="mt-16 text-3xl font-bold ml-5">Productos en Tienda </h1>
            )}
            {mostrarFormulario ? (
              <div>
                <FormProductos />
              </div>
            ) : (
              <button
                onClick={handleClickAgreagrProducto}
                className="mt-14 bg-tertiary hover:bg-secondary text-white py-2 px-4 rounded-md"
              >
                Agregar Producto
              </button>
              
            )}
          </div>
    
          <ToastContainer/>
    
          {!mostrarFormulario && (
            isLoading ? (
              <div className="flex flex-col items-center justify-center mt-48">
          <div className="custom-progress-bar">
            <div className="custom-progress"></div>
          </div>
          <p className="custom-loading-text mt-4 text-xl font-semibold text-black">Cargando...</p>
        </div>
            ) : (
              <TiendaPanel /> 
            )
          )}
        </div>
      );
}

export default TiendaPanelPage