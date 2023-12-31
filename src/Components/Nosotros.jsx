import React from "react";

import NosotrosInformacion from "./NosotrosInformacion";
import Fundadores from "./Fundadores";
import Clientes from "./Clientes";

function Nosotros() {
  return (
    <div className="min-h-screen flex flex-col">
  {/* Section: NosotrosInformacion */}
  <div className="min-h-screen bg-gradient-to-b from-black via-black to-black ">
    <NosotrosInformacion />
  </div>

  {/* Section: Fundadores */}
  <div className="min-h-screen bg-gradient-to-b from-black via-black to-quaternary">
    <Fundadores />
  </div>

  {/* section: Clientes */}
  <div className="bg-gradient-to-b from-quaternary  to-quaternary" >
    <Clientes />
  </div>

  
</div>
  );
}

export default Nosotros;
