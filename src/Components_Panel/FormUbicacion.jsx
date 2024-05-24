import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useInsoel } from "../Context/InsoelContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function FormUbicacion({ id, toast, reloadMapa }) {
  const { register, handleSubmit, setValue } = useForm();
  const { crearUbicacion } = useInsoel();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [coordinates, setCoordinates] = useState([23.6345, -102.5528]); // Coordenadas por defecto para México

  // Función para manejar el clic en el mapa y actualizar las coordenadas
  const handleMapClick = (e) => {
    setCoordinates([e.latlng.lat, e.latlng.lng]);
    setValue("latitud", e.latlng.lat.toString());
    setValue("longitud", e.latlng.lng.toString());
  };

  // Función para enviar el formulario
  const onSubmit = handleSubmit(async (data) => {
    // Lógica para guardar la ubicación y mostrar un mensaje de confirmación
    await toast.promise(crearUbicacion(data), {
      pending: "Guardando ubicación...",
      success: "Ubicación guardada con éxito",
      error: "Error al guardar la ubicación"
    });
    // mensaje de confirmacion 
    setMostrarMensaje(true);

    //reinicia los campos del formulario 
    setValue("nombre", "");
    setValue("direccion", "");
    setValue("latitud", "");
    setValue("longitud", "");

    //actualiza el mapa 
    reloadMapa();
  });

  // Función para obtener las coordenadas a partir de una dirección ingresada
  const geocodeAddress = async (address) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setValue("latitud", lat.toString());
      setValue("longitud", lon.toString());
      setCoordinates([parseFloat(lat), parseFloat(lon)]);
    }
  };

  // Efecto para actualizar el formulario cuando cambian las coordenadas
  useEffect(() => {
    if (coordinates[0] !== 23.6345 || coordinates[1] !== -102.5528) {
      setValue("latitud", coordinates[0].toString());
      setValue("longitud", coordinates[1].toString());
    }
  }, [coordinates]);

  return (
    <div className='flex'>
      <div className="">
        <div className="text-left mt-20 mb-5 ml-10">
          <h1 className="font-bold text-2xl text-secondary">Nueva Ubicacion al Mapa</h1>
        </div>
        <div className="mx-10 my-14 w-full">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
                Nombre
              </label>
              <input
                type="text"
                {...register("nombre")}
                id="nombre"
                name="nombre"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
                placeholder="Nombre de la Ubicacion"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="direccion" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
                Direccion
              </label>
              <input
                type="text"
                {...register("direccion")}
                id="direccion"
                name="direccion"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
                placeholder="Direccion del Lugar"
                onChange={(e) => geocodeAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="latitud" className="block text-lg font-semibold">
                  Latitud
                </label>
                <input
                  type="text"
                  {...register("latitud")}
                  id="latitud"
                  name="latitud"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  value={coordinates[0]}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="longitud" className="block text-lg font-semibold">
                  Longitud
                </label>
                <input
                  type="text"
                  {...register("longitud")}
                  id="longitud"
                  name="longitud"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  value={coordinates[1]}
                  readOnly
                />
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-primary text-black py-2 px-4 rounded-md hover:bg-darkPrimary hover:text-white absolute  mr-3"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=' mt-20 ml-28 p-5'>
      <div className=" h-96 w-96 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-lg shadow-lg border border-gray-300 overflow-hidden">
  <MapContainer
    center={coordinates}
    zoom={coordinates[0] === 23.6345 && coordinates[1] === -102.5528 ? 5 : 15}
    style={{ width: '100%', height: '100%' }}
    onClick={handleMapClick}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='© OpenStreetMap contributors'
    />
    <Marker position={coordinates}>
      <Popup>
        Ubicación seleccionada
      </Popup>
    </Marker>
  </MapContainer>
</div>

      </div>
    </div>
  );
}




export default FormUbicacion