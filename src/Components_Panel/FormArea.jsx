import React from 'react'
import { useForm } from "react-hook-form";
import { useInsoel } from '../Context/InsoelContext';

function FormArea({reloadArea, toast}) {
    const { register, handleSubmit } = useForm();
    const {crearArea} = useInsoel();

    const onSubmit = handleSubmit(async(data)=>{
        const formData = new FormData();
        formData.append('area', data.area)
        formData.append('enlace', data.enlace);
        formData.append('img', data.img[0]);
        formData.append('descripcion', data.descripcion);
        //console.log(formData)
        //await crearArea(formData)
        //await crearSubMenu(formData)

        await toast.promise(crearArea(formData), {
          pending: "Guardando Area...",
          success: "Area Guardado con Éxito",
          error: "Error al Guardar el Area"
        });

        console.log("Enviando formulario...");
        reloadArea();
      })


    return (
        <div className='flex  m-5'>
          <div className="ml-2 ">
          <div className="text-left mt-14 mb-5">
                <h1 className="font-bold text-2xl text-secondary">Nueva Area </h1>
              </div>
          <div className="my-5 ">
            <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-3 gap-4">
            <div className="mb-4">
                <label htmlFor="area" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
                  Area
                </label>
                <input
                  type="text"
                  {...register("area")}
                  id="area"
                  name="area"
                  className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  placeholder="area "
                />
                </div>
               
              <div className="mb-4">
                <label htmlFor="img" className="block text-lg font-semibold ">
                    Imagen 
                  </label>
                  <input
                    type="file"
                    {...register("img")}
                    id="img"
                    name="img"
                    accept="image/*"
                    className="mt-1 p-2 w-full border rounded-md border-gray-800"
                  />
                </div>
              </div>
                <div className="mb-4">
                <label htmlFor="descripcion" className="block text-lg font-semibold">
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
                  className="bg-primary text-black py-2 px-4 rounded-md hover:bg-darkPrimary hover:text-white absolute right-10 "
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

export default FormArea