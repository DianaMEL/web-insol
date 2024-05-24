import React, {useState} from 'react'
import MapaUbicacion from './MapaUbicacion'
import Paginador from './Paginador';

function ListMapaUbicacion({ubicaciones, reloadMapa}) {
  // Verificamos si el arreglo de datos está vacío o es nulo
  if (!ubicaciones.length) return <h1>No hay datos disponibles</h1>;

  // Estados para el paginador
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Cambia este valor según tus necesidades numero de elementos por página

  // Calcula el total de páginas
  const totalPages = Math.ceil(ubicaciones.length / itemsPerPage);

  // Función para cambiar la página
  const handlePageChange = (page) => { 
    setCurrentPage(page);
  };

  const paginatedData = ubicaciones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="">
        {paginatedData.map((ubicacion) => (
          <MapaUbicacion key={ubicacion.id} ubicacion={ubicacion} reloadMapa={reloadMapa} />
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

export default ListMapaUbicacion