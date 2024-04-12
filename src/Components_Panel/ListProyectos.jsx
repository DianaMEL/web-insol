import React, {useState} from 'react'
import Proyectos from './Proyectos'
import Paginador from './Paginador';

function ListProyectos({ proyectos, reloadProyectos, onUpdateClick}) {
  // Verificamos si el arreglo de datos está vacío o es nulo
  if (!proyectos.length) return <h1>No hay datos disponibles</h1>;

  // Estados para el paginador
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Cambia este valor según tus necesidades numero de elementos por página

  // Calcula el total de páginas
  const totalPages = Math.ceil(proyectos.length / itemsPerPage);

  // Función para cambiar la página
  const handlePageChange = (page) => { 
    setCurrentPage(page);
  };

  const paginatedData = proyectos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

    return (
        <div>
          {" "}
          <div className="">
            {paginatedData.map((proyecto) => (
              <Proyectos key={proyecto._id} proyecto={proyecto}  reloadProyectos={reloadProyectos} onUpdateClick={onUpdateClick} />
            ))}
          </div> 
           {/* Contenedor para el paginador con estilos para posicionarlo */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <Paginador
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> 
      </div>
        </div>
      );
}

export default ListProyectos
