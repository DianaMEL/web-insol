import React, { useState } from "react";
import LogoAmarilloBlanco from "../img/LogoAmarilloBlanco.png";
import { ImUser } from "react-icons/im";
import { BsBuildingsFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { MdDescription } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInsoel } from "../Context/InsoelContext";
import {useForm} from 'react-hook-form'

function Formulario() {
  const {register, handleSubmit, setValue} = useForm()
  const {createSolicitud} = useInsoel()
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    servicio: "",
    descripcion: "",
  });

  const [errores, setErrores] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const mensajesValidacion = (e) => {
    e.preventDefault();
  
    // Realiza la validación aquí
    const nuevosErrores = {};
  
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido";
    }
    if (!formData.correo.trim()) {
      nuevosErrores.correo = "El correo es requerido";
    }
    if (!formData.empresa.trim()) {
      nuevosErrores.empresa = "La empresa es requerida";
    }
    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es requerida";
    }
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = "El telefono es requerida";
    }
    if (!formData.servicio) {
      nuevosErrores.servicio = "Selecciona un servicio";
    }
  
    // Validación de correo electrónico
    const correoValido = /\S+@\S+\.\S+/; 
    if (!correoValido.test(formData.correo)) {
      nuevosErrores.correo = "Introduce un correo válido";
    }
  
    // Validación de número de teléfono (formato simple)
    const telefonoValido = /^\d{10}$/;
    if (!telefonoValido.test(formData.telefono)) {
      nuevosErrores.telefono ='Por favor, introduce un número de teléfono válido (10 dígitos)';
    }
  
    // Actualiza el estado de errores
    setErrores(nuevosErrores);
  
    // Si hay errores, muestra una advertencia
    if (Object.keys(nuevosErrores).length > 0) {
      toast.warn("Faltan datos o hay errores en el formulario");
      return;
    }
  
    // Aquí puedes realizar acciones adicionales antes de enviar el formulario
    // En este ejemplo, simplemente mostramos una alerta de éxito
    // Limpia el formulario y los errores después del envío
    setFormData({
      nombre: "",
      empresa: "",
      correo: "", 
      telefono: "",
      servicio: "",
      descripcion: "",
    });
    setErrores({});
    toast.success("Gracias por su interés, nos pondremos en contacto");
    createSolicitud(formData)
    console.log(formData);
  };

  return (
    <div className="bg-gradient-to-b from-secondary to-secondary z-10">
      <div className="md:pt-32 md:pb-16">
        <div className="md:flex bg-gradient-to-r from-secondary from-10% via-secondary via-30% to-black to-90% ">
          <div className="md:w-1/2 p-8 space-y-4">
            <h1 className="text-4xl font-bold mb-4 text-white text-left pt-32 ">
              AUTOMATIZACIÓN <br />
              REDEFINIDA <br />
              </h1>
              <h2 className="md:pl-24 font-bold text-white text-3xl">Contáctanos.</h2>
            
          </div>
          <div className="md:w-1/2 p-5">
            <form className="md:pr-28 z-10" >
              <div className="md:flex mb-4 border-b border-white py-2 items-center">
                <ImUser className="text-white text-2xl mr-2" />
                <input
                  className="md:w-2/3 appearance-none bg-transparent border-none w-full text-white py-1 px-2 leading-tight focus:outline-none"
                  id="nombre"
                  type="text"
                  {...register("nombre")}
                  placeholder="Nombre y Apellido"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              {errores.nombre && (
                <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>
              )}
              <div className="md:flex mb-4 border-b border-white py-2 items-center">
                <BsBuildingsFill className="text-white text-2xl mr-2" />
                <input
                  className="md:w-2/3 appearance-none bg-transparent border-none w-full text-white py-1 px-2 leading-tight focus:outline-none"
                  id="empresa"
                  type="text"
                  {...register("empresa")}
                  placeholder="Empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                />
              </div>
              {errores.empresa && (
                <p className="text-red-500 text-xs mt-1">{errores.empresa}</p>
              )}
              <div className="md:flex mb-4 border-b border-white py-2 items-center">
                <MdEmail className="text-white text-2xl mr-2" />
                <input
                  className="md:w-2/3 appearance-none bg-transparent border-none w-full text-white py-1 px-2 leading-tight focus:outline-none"
                  id="correo"
                  type="email"
                  {...register("correo")}
                  placeholder="Correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                />
              </div>
              {errores.correo && (
                <p className="text-red-500 text-xs mt-1">{errores.correo}</p>
              )}
              <div className="md:flex mb-4 border-b border-white py-2 items-center">
                <FaPhoneAlt className="text-white text-2xl mr-2" />
                <input
                  className="md:w-2/3 appearance-none bg-transparent border-none w-full text-white  py-1 px-2 leading-tight focus:outline-none"
                  id="telefono"
                  type="tel"
                  {...register("telefono")}
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              {<errores className="telefono"></errores> && (
                <p className="text-red-500 text-xs mt-1">{errores.telefono}</p>
              )}
              <div className="md:flex mb-4 border-b border-white py-2 items-center relative ">
                <GrServices className="text-white text-2xl mr-2" />
                <select
                  className="md:w-2/3 appearance-none w-full bg-transparent  py-1 px-2 rounded leading-tight focus:outline-none focus:shadow-outline text-white text-opacity-50"
                  id="servicio"
                  value={formData.servicio}
                  {...register("servicio")}
                  onChange={handleInputChange}
                >
                  <option disabled value="">
                    Servicios
                  </option>
                  <option className="bg-blue-500 text-white" value="Venta de herramientas">
                    Venta de Herramientas
                  </option>
                  <option className="bg-blue-500 text-white" value="Desarrollo web">
                    Desarrollo web
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errores.servicio && (
                <p className="text-red-500 text-xs mt-1">{errores.servicio}</p>
              )}
              <div className="md:flex mb-4 border-b border-white py-2 items-center">
                <MdDescription className="text-white text-2xl mr-2" />
                <input
                  className="md:w-2/3 appearance-none bg-transparent border-none w-full text-white py-1 px-2 leading-tight focus:outline-none"
                  id="descripcion"
                  type="text"
                  {...register("descripcion")}
                  placeholder="Descripción del Proyecto"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
              </div>
              {errores.descripcion && (
                <p className="text-red-500 text-xs mt-1">
                  {errores.descripcion}
                </p>
              )}
              <button
                className=" w-auto bg-black text-white rounded-full py-2 px-4 focus:outline-none focus:shadow-outline "
                type="submit"
                onClick={mensajesValidacion}
              >
                Contacta a
                <img
                  src={LogoAmarilloBlanco}
                  className="inline-block h-6 w-20 mr-2 pl-2 "
                />
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
