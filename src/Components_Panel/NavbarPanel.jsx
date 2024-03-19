import React from "react";
import LogoAmarilloBlanco from "../img/Logos/AmarilloBlanco.png";

function NavbarPanel() {
  return (
    <div>
      <nav class="bg-secondary p-5 fixed top-0 left-0 w-full z-50">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-white font-bold text-lg">
          <img src={LogoAmarilloBlanco} alt="Logo" className="h-7 transform scale-150" />
          </div>
          <ul class="flex space-x-4">
            <li>
              <a href="#" class="text-white hover:text-gray-400">
                Cerra Sesion
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarPanel;
