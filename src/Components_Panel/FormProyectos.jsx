import React, { useState } from "react";

import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";
import { useForm } from "react-hook-form";
import { useInsoel } from "../Context/InsoelContext";

function FormProyectos({reloadProyectos}) {
  const [contenido, setContenido] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const { crearProyecto } = useInsoel();

  const handleChange = (event) => {
    // Reemplazar saltos de línea con \n
    setContenido(event.target.value);
  };
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("fecha", data.fecha);
    formData.append("contenido", data.contenido);
    formData.append("area", data.area)
    formData.append("frase", data.frase);
    formData.append("imagen1", data.imagen1[0]);
    formData.append("imagen2", data.imagen2[0]);
    formData.append("imagen3", data.imagen3[0]);
    formData.append("video", data.video[0]);
    //console.log(data.area)
    await crearProyecto(formData);
    reloadProyectos()
  });

  /** 
  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí guardas la descripción en la base de datos
    // Asegúrate de que el backend interprete \n como saltos de línea
    console.log("Descripción a guardar:", contenido);
    
  };
  */

  return (
    <div className="flex ">
      <div className=" ml-10 mr-10">
        <div className="text-left mt-4 mb-2">
          <h1 className="font-bold text-2xl text-secondary">Nuevo Proyecto </h1>
        </div>
        <div className=" ">
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4 ">
                <label for="titulo" className="block text-lg font-bold ">
                  Titulo
                </label>
                <input
                  type="text"
                  {...register("titulo")}
                  id="titulo"
                  name="titulo"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Titulo del Proyecto"
                />
              </div>
              <div className="mb-4">
                <label for="frase" className="block text-lg font-semibold ">
                  Frase
                </label>
                <input
                  type="text"
                  {...register("frase")}
                  id="frase"
                  name="frase"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Frase inspiradora"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label for="video" className="block text-lg font-semibold">
                  Video
                </label>
                <input
                  type="file"
                  {...register("video")}
                  id="video"
                  name="video"
                  accept="video/*"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Agregar Video del Proyecto"
                />
              </div>
              <div className="mb-4">
                <label for="fecha" className="block text-lg font-semibold ">
                  Fecha del Proyecto
                </label>
                <input
                  type="date"
                  {...register("fecha")}
                  id="fecha"
                  name="fecha"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Fecha"
                />
              </div>
              <div className="mb-4">
                <label for="fecha" className="block text-lg font-semibold ">
                  Seleccionar
                </label>
                <select
                  id="area"
                  name="area"
                  className=" mt-1 p-2 w-full border rounded-md"
                  {...register("area")}
                >
                  <option value="" disabled selected>
                    Area / Campo
                  </option>
                  <option value= "Desarrollo Tecnológico">Desarrollo Tecnológico</option>
                  <option value="Soluciones de Integracion">Soluciones de Integracion</option>
                  <option value="Infraestructura TI">Infraestructura TI</option>
                  <option value="Adquisición de Equipos y Herramientas">
                    Adquisición de Equipos y Herramientas
                  </option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label for="contenido" className="block text-lg font-semibold ">
                Contenido
              </label>
              <textarea
                id="contenido"
                {...register("contenido")}
                name="contenido"
                value={contenido}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Informacion del Proyecto "
              ></textarea>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label for="imagen1" className="block text-lg font-semibold ">
                  Imagen 1
                </label>
                <input
                  type="file"
                  {...register("imagen1")}
                  id="imagen1"
                  name="imagen1"
                  //accept: que tipo de archivo acepta en este caso imagen y el /* es que acepta jpg,, png, etc
                  accept="image/*"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label for="imagen2" className="block text-lg font-semibold ">
                  Imagen 2
                </label>
                <input
                  type="file"
                  {...register("imagen2")}
                  id="imagen2"
                  name="imagen2"
                  accept="image/*"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label for="imagen3" className="block text-lg font-semibold ">
                  Imagen 3
                </label>
                <input
                  type="file"
                  {...register("imagen3")}
                  id="imagen3"
                  name="imagen3"
                  accept="image/*"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <div className="mb-12">
              <button
                type="submit"
                className="bg-primary text-black py-2 px-4 rounded-md hover:bg-darkPrimary hover:text-white absolute right-14 "
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormProyectos;
