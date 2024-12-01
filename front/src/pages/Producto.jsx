import React, { useState, useEffect } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/api'; // Importar las funciones de api
import Navbar from '../nav/Navbar';

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({ id: '', jqaNombre: '', jqaProducto: '', categoriaId: '' });
  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener todos los productos
  const fetchProductos = async () => {
    try {
      const data = await apiGet('/producto');
      setProductos(data); // Suponiendo que la respuesta es un arreglo de productos
    } catch (error) {
      setErrorMessage('Error al obtener los productos.');
      console.error(error);
    }
  };

  // Obtener todas las categorías
  const fetchCategorias = async () => {
    try {
      const data = await apiGet('/categoria');
      setCategorias(data); // Suponiendo que la respuesta es un arreglo de categorías
    } catch (error) {
      setErrorMessage('Error al obtener las categorías.');
      console.error(error);
    }
  };

  // Obtener un producto por ID
  const fetchProductoById = async (id) => {
    try {
      const data = await apiGet(`/producto/${id}`);
      setProducto(data); // Suponiendo que la respuesta es un producto
    } catch (error) {
      setErrorMessage('Error al obtener el producto.');
      console.error(error);
    }
  };

  // Crear un nuevo producto
  const createProducto = async (e) => {
    e.preventDefault();
    try {
      await apiPost('/producto', {
        jqaNombre: producto.jqaNombre,
        jqaProducto: producto.jqaProducto,
        categoriaId: producto.categoriaId,
      });
      fetchProductos(); // Recargar los productos
      setProducto({ id: '', jqaNombre: '', jqaProducto: '', categoriaId: '' }); // Limpiar formulario
    } catch (error) {
      setErrorMessage('Error al crear el producto.');
      console.error(error);
    }
  };

  // Actualizar un producto
  const updateProducto = async (e) => {
    e.preventDefault();
    try {
      await apiPut('/producto', {
        id: producto.id,
        jqaNombre: producto.jqaNombre,
        jqaProducto: producto.jqaProducto,
        categoriaId: producto.categoriaId,
      });
      fetchProductos(); // Recargar los productos
      setProducto({ id: '', jqaNombre: '', jqaProducto: '', categoriaId: '' }); // Limpiar formulario
    } catch (error) {
      setErrorMessage('Error al actualizar el producto.');
      console.error(error);
    }
  };

  // Eliminar un producto
  const deleteProducto = async (id) => {
    try {
      await apiDelete(`/producto/${id}`);
      fetchProductos(); // Recargar los productos
    } catch (error) {
      setErrorMessage('Error al eliminar el producto.');
      console.error(error);
    }
  };

  // Cargar productos y categorías cuando el componente se monte
  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  return (
    <div className="flex max-w-4xl mx-auto px-4 py-8">
      <Navbar />
      <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-sm mr-6">
        {/* Lista de productos */}
        <h2 className="text-xl font-semibold mb-6">Lista de Productos</h2>
        <ul>
          {productos.map((prod) => (
            <li key={prod.id} className="flex justify-between items-center bg-white p-4 rounded shadow-sm mb-4">
              <div>
                <span className="font-semibold">{prod.jqaNombre}</span><br />
                <span className="text-sm text-gray-600">{prod.jqaProducto}</span><br />
                <span className="text-sm text-gray-500">Categoría: {prod.categoriaDto?.jqaNombre || 'Sin categoría'}</span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => fetchProductoById(prod.id)}
                  className="bg-gray-300 text-black py-1 px-2 ml-2 mb-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProducto(prod.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3">
        {/* Formulario para crear o actualizar producto */}
        <h1 className="text-3xl font-semibold text-center text-[#1A2D42] mb-8">Gestión de Productos</h1>

        {/* Mostrar mensaje de error si ocurre */}
        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        <form onSubmit={producto.id ? updateProducto : createProducto} className="bg-gray-100 p-6 rounded shadow-sm">
          <div className="mb-4">
            <label htmlFor="jqaNombre" className="block text-sm font-medium mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="jqaNombre"
              value={producto.jqaNombre}
              onChange={(e) => setProducto({ ...producto, jqaNombre: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Nombre del producto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="jqaProducto" className="block text-sm font-medium mb-2">
              Descripción del Producto
            </label>
            <input
              type="text"
              id="jqaProducto"
              value={producto.jqaProducto}
              onChange={(e) => setProducto({ ...producto, jqaProducto: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Descripción del producto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="categoriaId" className="block text-sm font-medium mb-2">
              Categoría
            </label>
            <select
              id="categoriaId"
              value={producto.categoriaId}
              onChange={(e) => setProducto({ ...producto, categoriaId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.jqaNombre} - {cat.jqaCategoria}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            {producto.id ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Producto;