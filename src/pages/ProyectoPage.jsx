import { useRef, useEffect, useState } from "react";
import { useInsoel } from "../Context/InsoelContext";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen";
import Carga from "../img/Proyectos/Banco_Uat/001.gif";
import Bio from "../img/Proyectos/Bio_Reactor/001.mp4";

function ProyectoPage() {
  const { getProyecto, proyecto, fechaFormateada } = useInsoel();
  const { setLogoColor, setTxtColor, setOpacidadColor } = useInsoel();
  const videoRef = useRef(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const res = await getProyecto(id);
        console.log(res);
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProyecto();
  }, []);

  useEffect(() => {
    document.title = proyecto ? `${proyecto.titulo} | INSOEL ` : "INSOEL";
    return () => {
      document.title = "INSOEL";
    };
  }, [proyecto]);

  const handleLoadedData = () => {
    console.log("cargado");
    setVideoLoaded(true);
  };

  

  return (
    <>
      {isLoading || !proyecto ? (
        <LoadingScreen />
      ) : (
        <div className="bg-bajo min-h-screen  flex flex-col">
          <div className="relative w-full h-auto md:h-screen">
          {!videoLoaded && ( // Mostrar el gif o video de carga mientras el video principal se está cargando
            <div className="absolute inset-y-0 inset-x-0 flex justify-center max-h-[80%] md:max-h-full items-center bg-black bg-opacity-50 mt-52 sm:mt-0">
              {/* gif de carga */}
              <img src={Carga} alt="Cargando..." />
            </div>
          )}
            <video
              loop
              muted
              preload={"auto"}
              ref={videoRef}
              autoPlay
              onLoadedData={handleLoadedData}
              src={`http://localhost:3000/uploads/${proyecto?.video?.nuevoNombre}`}
              className={`block h-5/6 w-full object-fill max-h-[80%] md:max-h-full shadow-md mt-24 ${
                videoLoaded ? "block" : "hidden"
              }`}
            />

        </div>
          <div className="text-black m-3 bg-light p-6 rounded-md shadow-md space-y-4">
            <h1 className="text-4xl font-semibold text-accent">
              {proyecto.titulo}
            </h1>
            <h2 className="text-xl text-secondary">{fechaFormateada(proyecto.fecha)}</h2>
            <div dangerouslySetInnerHTML={{ __html: proyecto.contenido }}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {proyecto.imagenes.map((imagen, index) => (
                <div key={index} className="relative group">
                  <img
                    src={`http://localhost:3000/uploads/${imagen.nuevoNombre}`}
                    alt={`Imagen ${index}`}
                    className="w-[35rem] h-[25rem] object-cover rounded-md transition-transform transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-primary bg-secondary bg-opacity-75 p-2 text-lg font-bold">
                      descripcion
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonial-section mt-8">
              <p className="text-lg italic text-gray-600">{proyecto.frase}</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default ProyectoPage;
