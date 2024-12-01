import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para navegación

const Navbar = () => {
  return (
    <div className="flex">
      {/* Barra lateral con el navbar */}
      <div className="bg-[#2D3A45] w-64 h-screen p-6 shadow-lg fixed top-0 left-0">
        {/* Logo o título */}
        <div className="text-white text-2xl font-semibold mb-12">
          <Link to="/">CRUD</Link>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex flex-col space-y-6">
          <Link
            to="/producto" // Ruta a la página de Producto
            className="text-[#4CAF50] hover:text-[#388E3C] transition duration-300 text-lg"
          >
            Productos
          </Link>
          <Link
            to="/categoria" // Ruta a la página de Categoria
            className="text-[#4CAF50] hover:text-[#388E3C] transition duration-300 text-lg"
          >
            Categorías
          </Link>
          <Link
            to="/" // Ruta a la página de Salir
            className="text-[#4CAF50] hover:text-[#388E3C] transition duration-300 text-lg"
          >
            Salir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;