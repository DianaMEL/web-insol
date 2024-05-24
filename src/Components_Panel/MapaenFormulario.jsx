import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import 'tailwindcss/tailwind.css'; // Importa los estilos de Tailwind CSS

function MapaenFormulario() {
  const [address, setAddress] = useState(""); // Estado para almacenar la dirección ingresada por el usuario
  const [coordinates, setCoordinates] = useState([23.6345, -102.5528]); // Coordenadas por defecto para México
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    // Función para obtener las coordenadas a partir de una dirección utilizando OpenStreetMap Nominatim
    async function fetchCoordinates() {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setCoordinates([lat, lon]);
          setLatitude(lat);
          setLongitude(lon);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }

    if (address !== "") {
      fetchCoordinates();
    }
  }, [address]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center my-4">
        <label htmlFor="addressInput" className="mr-2">Dirección:</label>
        <input
          id="addressInput"
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Ingrese una dirección..."
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="h-80 w-80 mb-4"> {/* Tamaño personalizado del contenedor del mapa */}
        <MapContainer
          center={coordinates}
          zoom={5}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          <Marker position={coordinates}>
            <Popup>
              {address}
              <br />
              Latitud: {latitude}
              <br />
              Longitud: {longitude}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Mostrar los campos de latitud y longitud */}
      <div className="flex flex-col items-center">
        <label htmlFor="latitudeInput" className="mb-2">Latitud:</label>
        <input
          id="latitudeInput"
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitud..."
          className="border border-gray-300 rounded px-2 py-1 mb-2"
        />
        <label htmlFor="longitudeInput" className="mb-2">Longitud:</label>
        <input
          id="longitudeInput"
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitud..."
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      
    </div>
  );
}

export default MapaenFormulario;


