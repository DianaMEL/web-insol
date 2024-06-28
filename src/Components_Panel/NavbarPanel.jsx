import React from "react";
import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";
import { useAuth } from "../Context/AuthContext";

function NavbarPanel() {
  const {logout} = useAuth()
  return (
    <div>
      <nav className="bg-secondary p-5 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-lg">
          <img src={LogoAmarilloBlanco} alt="Logo" className="h-7 transform scale-150" />
          </div>
          <ul className="flex space-x-4">
            <li>
              <button className="bg-red-500 rounded p-1 text-white hover:text-gray-400" onClick={()=>{
                logout()
              }} >
                Cerra Sesión
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarPanel;
