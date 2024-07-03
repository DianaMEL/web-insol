import React from 'react'
import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";
import { useForm } from "react-hook-form";
import { useInsoel } from '../Context/InsoelContext';

function FormProductos() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async(data)=>{
    const formData = new FormData();
    //formData.append('area', data.area)
    //formData.append('enlace', data.enlace);
    //formData.append('img', data.img[0]);
    //formData.append('descripcion', data.descripcion);
    //console.log(formData)
    //await crearArea(formData)
    //await crearSubMenu(formData)

    await toast.promise(crearArea(formData), {
      pending: "Guardando Producto...",
      success: "Producto Guardado con Éxito",
      error: "Error al Guardar el Producto"
    });

    console.log("Enviando formulario...");
    reloadArea();
  })

  return (
    <div className='flex  m-5'>
          <div className="ml-2 ">
          <div className="text-left mt-14 mb-5">
                <h1 className="font-bold text-2xl text-secondary">Nuevo Producto </h1>
              </div>
          <div className="my-5 ">
            <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-3 gap-4">
            <div className="mb-4">
            <label for="nombre" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="mt-1 p-2 w-full border rounded-md border-gray-800"
              placeholder="Nombre del Producto"
            />
          </div>
          <div className="mb-4">
            <label for="precio" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold ">
                Precio
              </label>
              <input
                type="text"
                id="precio"
                name="precio"
                accept="image/*"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
              />
            </div>
            <div className="mb-4">
            <label for="imagen" className="block text-lg font-semibold ">
                Imagen
              </label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
              />
            </div>

         
              </div>
              <div className="mb-4">
                <label htmlFor="descripcion" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
        Descripción
    </label>
    <textarea
        {...register("descripcion")}
        id="descripcion"
        name="descripcion"
        className="mt-1 p-2 w-full border rounded-md border-gray-800"
        rows="4" // puedes ajustar este valor según la cantidad de líneas que desees mostrar inicialmente
    />
                </div>
                <div className="">
            <button
              type="submit"
              className="bg-primary text-black py-2 px-4 rounded-md hover:bg-darkPrimary hover:text-white absolute right-10"
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
export default FormProductos