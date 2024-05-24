import React,{useState} from 'react'
import Area from './Area'
import Paginador from './Paginador';

function ListArea({areas, reloadArea}) {
   // Verificamos si el arreglo de datos está vacío o es nulo
   if (!areas.length) return <h1>No hay datos disponibles</h1>;

   // Estados para el paginador
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 1; // Cambia este valor según tus necesidades numero de elementos por página
 
   // Calcula el total de páginas
   const totalPages = Math.ceil(areas.length / itemsPerPage);
 
   // Función para cambiar la página
   const handlePageChange = (page) => { 
     setCurrentPage(page);
   };
 
   const paginatedData = areas.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );
    return (
        <div>
          {" "} 
          <div className="grid gap-4 grid-cols-1">
            {paginatedData.map((area) => (
              <Area key={area.id} area={area} reloadArea={reloadArea} />
            ))}
          </div> 
          <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <Paginador
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div> 
        </div>
  )
}

export default ListArea