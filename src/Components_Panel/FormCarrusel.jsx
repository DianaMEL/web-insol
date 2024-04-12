import React from 'react'
import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";
import { useForm } from "react-hook-form";
import { useInsoel } from '../Context/InsoelContext';

function FormCarrusel() {
  const { register, handleSubmit } = useForm();
  const { createCarrusel } = useInsoel();

  const onSubmit = handleSubmit(async(data)=>{
    const formData = new FormData();
    formData.append('titulo', data.titulo)
    formData.append('img1', data.img1[0]);
    formData.append('img2', data.img2[0]);
    formData.append('img3', data.img3[0]);
    formData.append('img4', data.img4[0]);
    //console.log(formData)
    await createCarrusel(formData)
  })

  return (
    <div className='flex  mb-2'>
      <div className="ml-2 ">
      <div className="text-left mt-14 mb-5">
            <h1 className="font-bold text-2xl text-secondary">Nuevas Imagenes para el Carrusel </h1>
          </div>
      <div className="my-12 ">
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label for="titulo" className="block text-lg sm:text-base md:text-lg lg:text-xl font-semibold">
              Titulo
            </label>
            <input
              type="text"
              {...register("titulo")}
              id="titulo"
              name="titulo"
              className="mt-1 p-2 w-full border rounded-md border-gray-800"
              placeholder="Titulo "
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div className="mb-4">
            <label for="img1" className="block text-lg font-semibold ">
                Imagen 1
              </label>
              <input
                type="file"
                {...register("img1")}
                id="img1"
                name="img1"
                accept="image/*"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
              />
            </div>
            <div className="mb-4">
            <label for="img2" className="block text-lg font-semibold ">
                Imagen 2
              </label>
              <input
                type="file"
                {...register("img2")}
                id="img2"
                name="img2"
                accept="image/*"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label for="img3" className="block text-lg font-semibold ">
                Imagen 3
              </label>
              <input
                type="file"
                {...register("img3")}
                id="img3"
                name="img3"
                //accept: que tipo de archivo acepta en este caso imagen y el /* es que acepta jpg,, png, etc
                accept="image/*"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
              />
            </div>
            <div className="mb-4">
              <label for="img4" className="block text-lg font-semibold ">
                Imagen 4
              </label>
              <input
                type="file"
                {...register("img4")}
                id="img4"
                name="img4"
                accept="image/*"
                className="mt-1 p-2 w-full border rounded-md border-gray-800"
              /> 
            </div>
          </div>
          <div className="mb-12">
            <button
              type="submit"
              className="bg-primary text-black py-2 px-4 rounded-md hover:bg-darkPrimary hover:text-white absolute right-64 "
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

export default FormCarrusel