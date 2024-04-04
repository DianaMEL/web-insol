import React, {useState, useEffect} from 'react'
import { useInsoel } from '../Context/InsoelContext'
import { useForm } from 'react-hook-form';

function FormUbicacion({id}) {

  const { register, handleSubmit, setValue } = useForm();
  const {crearUbicacion, getUbicacion} = useInsoel();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const [formData, setFormData] = useState({
    // Define aquí los campos de tu formulario y sus valores iniciales
    nombre: "",
    direccion: "",
    latitud: "",
    longitud: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    async function loadUbicacion() {
      if (id) {
        const ubicacion = await getUbicacion(id);
        console.log("Ubicacion obtenido", ubicacion);
        setValue("nombre", ubicacion.nombre);
        setValue("direccion", ubicacion.direccion);
        setValue("latitud", ubicacion.latitud);
        setValue("longitud", ubicacion.longitud);
      }
    }
    loadUbicacion();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (id) {
      setMostrarMensaje(true);
    } else {
      crearUbicacion(data);
      // Muestra el mensaje de confirmación
      setMostrarMensaje(true);
      // Reinicia los campos del formulario
      setFormData({
        nombre: "",
        direccion: "",
        latitud: "",
        longitud: "",
      });
    }
  });

  useEffect(() => {
    let timeout;
    if (mostrarMensaje) {
      timeout = setTimeout(() => {
        setMostrarMensaje(false);
      }, 1500); // Oculta el mensaje después de 1.5 segundos
    }
    return () => clearTimeout(timeout);
  }, [mostrarMensaje]);



  return ( 
    <div className='flex '>
      <div className=" ">
      <div className="text-left mt-20 mb-5 ml-32">
            <h1 className="font-bold text-2xl text-secondary">Nueva Ubicacion al Mapa </h1>
          </div>
      <div className="mx-32 my-14 w-full">
        
        <form onSubmit={onSubmit} >
          <div className="mb-4">
            <label htmlFor="Nombre" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
              Nombre
            </label>
            <input
              type="text"
              {...register("nombre")}
              id="nombre"
              name="nombre"
              className="mt-1 p-2 w-full border rounded-md "
              placeholder="Nombre de la Ubucacion"
            />
          </div>   
          <div className="mb-4">
            <label htmlFor="direccion" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold ">
              Direccion
            </label>
            <input
              type="text"
              {...register("direccion")}
              id="direccion"
              name="direccion"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Direccion del Lugar"
            />
          </div> 
          <div class="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="latitud" className="block text-lg font-semibold ">
                Latitud
              </label>
              <input
                type="text"
                {...register("latitud")}
                id="latitud"
                name="latitud"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="longitud" className="block text-lg font-semibold ">
                Longitud
              </label>
              <input
                type="text"
                {...register("longitud")}
                id="longitud"
                name="longitud"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
          <div className="mb-12">
            <button
              type="submit"
              className="bg-primary text-black py-2 px-4 rounded-md hover:bg-darkPrimary hover:text-white absolute  right-72 mr-3"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default FormUbicacion