import { useEffect } from "react";
import { useInsoel } from "../Context/InsoelContext";
import Formulario from "../Components/Formulario";
function ContactanosPage() {
  const { setLogoColor, setTxtColor } = useInsoel();
  setLogoColor("amarilloBlanco");
  setTxtColor("white");
  useEffect(() => {
    document.title = "Contáctanos | INSOEL";
    return () => {
      document.title = "INSOEL";
    };
  }, []);
  return (
    <div className="min-h-screen">
      <Formulario />
    </div>

  );
}

export default ContactanosPage;
