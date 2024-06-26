import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInsoel } from "../Context/InsoelContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilo por defecto del editor
//import { toast, ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

function FormProyectos({
  reloadProyectos,
  proyectoToUpdate,
  isUpdateMode,
  toast,
}) {
  const [contenido, setContenido] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const { crearProyecto, updateProyecto, obtenerAreas, areas} =
    useInsoel();

  useEffect(() => {
    if (isUpdateMode && proyectoToUpdate) {
      setValue("titulo", proyectoToUpdate.titulo);
      setValue("fecha", proyectoToUpdate.fecha);
      setValue("area", proyectoToUpdate.area);
      setValue("frase", proyectoToUpdate.frase);
      setContenido(proyectoToUpdate.contenido); // Aquí estableces el contenido del editor
      setValue("desc_Img1", proyectoToUpdate.imagenes[0].descripcion);
      setValue("desc_Img2", proyectoToUpdate.imagenes[1].descripcion);
      setValue("desc_Img3", proyectoToUpdate.imagenes[2].descripcion);
    }
  }, [isUpdateMode, proyectoToUpdate, setValue]);

  const handleChange = (value) => {
    setContenido(value);
  };

  useEffect(() => {
    obtenerAreas()
  }, []);

  console.log(areas);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("fecha", data.fecha);
    formData.append("contenido", contenido); // Aquí usas el estado contenido
    formData.append("area", data.area);
    formData.append("frase", data.frase);
    formData.append("imagen1", data.imagen1[0]);
    formData.append("imagen2", data.imagen2[0]);
    formData.append("imagen3", data.imagen3[0]);
    formData.append("desc_Img1", data.desc_Img1);
    formData.append("desc_Img2", data.desc_Img2);
    formData.append("desc_Img3", data.desc_Img3); 
    formData.append("video", data.video[0]);
    console.log([...formData.entries()]);

    if (isUpdateMode && proyectoToUpdate) {
      //await updateProyecto(proyectoToUpdate._id, formData);
      await toast.promise(updateProyecto(proyectoToUpdate._id, formData), {
        pending: "Actualizando proyecto...",
        success: "Proyecto actualizado con éxito",
        error: "Error al actualizar el proyecto",
      });
    } else {
      await toast.promise(crearProyecto(formData), {
        pending: "Guardando proyecto...",
        success: "Proyecto guardado con éxito",
        error: "Error al guardar el proyecto",
      });
    }
    reloadProyectos();
  });

  return (
    <div className="flex">
      <div className="ml-10 mr-10">
        <div className="text-left mt-10 mb-2">
          <h1 className="font-bold text-2xl text-secondary">
            {isUpdateMode ? "Actualizar Proyecto" : "Nuevo Proyecto"}
          </h1>
        </div>
        <div className=" ">
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="titulo" className="block text-lg font-bold">
                  Título
                </label>
                <input
                  type="text"
                  {...register("titulo")}
                  id="titulo"
                  name="titulo"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  placeholder="Titulo del Proyecto"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="frase" className="block text-lg font-semibold">
                  Frase
                </label>
                <input
                  type="text"
                  {...register("frase")}
                  id="frase"
                  name="frase"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  placeholder="Frase inspiradora"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label htmlFor="video" className="block text-lg font-semibold">
                  Video
                </label>
                <input
                  type="file"
                  {...register("video")}
                  id="video"
                  name="video"
                  accept="video/*"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  placeholder="Agregar Video del Proyecto"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fecha" className="block text-lg font-semibold">
                  Fecha del Proyecto
                </label>
                <input
                  type="date"
                  {...register("fecha")}
                  id="fecha"
                  name="fecha"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  placeholder="Fecha"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="area" className="block text-lg font-semibold">
                  Seleccionar
                </label>
                {/** 
                <select
                  id="area"
                  name="area"
                  className=" mt-1 p-2 w-full border rounded-md border-gray-800"
                  {...register("area")}
                >
                  <option value="" disabled defaultValue>
                    Area / Campo
                  </option>
                  <option value="Desarrollo Tecnológico">
                    Desarrollo Tecnológico
                  </option>
                  <option value="Soluciones de Integracion">
                    Soluciones de Integracion
                  </option>
                  <option value="Infraestructura TI">Infraestructura TI</option>
                  <option value="Adquisición de Equipos y Herramientas">
                    Adquisición de Equipos y Herramientas
                  </option>
                </select>*/}
                <select
                  id="area"
                  name="area"
                  className=" mt-1 p-2 w-full border rounded-md border-gray-800"
                  {...register("area")}
                >
                  <option value=""  defaultValue>
                    Area / Campo
                  </option>
                  {areas.map((area) => (
                    <option key={area._id} value={area._id}>{area.area}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="contenido"
                className="block text-lg font-semibold"
              >
                Contenido
              </label>
              <ReactQuill
                theme="snow"
                className="border-gray-800 border "
                value={contenido}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="imagen1"
                  className="block text-lg font-semibold"
                >
                  Imagen 1
                </label>
                <input
                  type="file"
                  {...register("imagen1")}
                  id="imagen1"
                  name="imagen1"
                  accept="image/*"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imagen2"
                  className="block text-lg font-semibold"
                >
                  Imagen 2
                </label>
                <input
                  type="file"
                  {...register("imagen2")}
                  id="imagen2"
                  name="imagen2"
                  accept="image/*"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imagen3"
                  className="block text-lg font-semibold"
                >
                  Imagen 3
                </label>
                <input
                  type="file"
                  {...register("imagen3")}
                  id="imagen3"
                  name="imagen3"
                  accept="image/*"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                />
              </div>
            </div>

            {/*input para descripcion de las imagenes */}
            <div className="grid grid-cols-3 gap-4 mb-2">
              <input
                {...register("desc_Img1")}
                id="desc_Img1"
                name="desc_Img1"
                type="text"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
                placeholder="Descripción imagen 1"
              />
              <input
                {...register("desc_Img2")}
                id="desc_Img2"
                name="desc_Img2"
                type="text"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
                placeholder="Descripción imagen 2"
              />
              <input
                {...register("desc_Img3")}
                id="desc_Img3"
                name="desc_Img3"
                type="text"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
                placeholder="Descripción imagen 3"
              />
            </div>
            <div className="mb-12">
              <button
                type="submit"
                className="mt-2 bg-primary text-black py-2 px-4 rounded-md hover:bg-darkPrimary hover:text-white absolute right-14 w-1/4"
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
