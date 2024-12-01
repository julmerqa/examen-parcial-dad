import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Crear instancia de useNavigate
  const navigate = useNavigate();

  // Manejo de cambios en los campos de inicio de sesión
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar mensajes de error previos
    try {
      const response = await axios.post('http://localhost:1501/auth/login', {
        userName: username,
        password: password,
      });
      console.log('Login exitoso:', response.data);
      
      // Verifica el role de la respuesta y redirige a la ruta correspondiente
      if (response.data.role === 'USER_DEFAULT') {
        navigate('/producto'); // Redirigir a /categoria si es USER_DEFAULT
      }

      // Aquí puedes guardar el token si es necesario
      // localStorage.setItem('token', response.data.token);

    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en login:', error);
    }
  };

  // Manejo de cambios en los campos de registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar mensajes de error previos
    try {
      const response = await axios.post('http://localhost:1501/auth/create', {
        userName: newUsername,
        password: newPassword,
      });
      console.log('Registro exitoso:', response.data);
      setIsCreatingAccount(false); // Cambiar al formulario de login después de crear la cuenta
    } catch (error) {
      setErrorMessage('Error al crear la cuenta. Intenta nuevamente.');
      console.error('Error en registro:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1A2D42] to-[#2E4156] flex items-center justify-center">
      <div className="bg-[#C0C8CA] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#1A2D42] mb-6">
          {isCreatingAccount ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h2>

        {/* Mostrar mensaje de error si ocurre */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {isCreatingAccount ? (
          <form onSubmit={handleRegisterSubmit}>
            {/* Campo Usuario (Nuevo usuario) */}
            <div className="mb-4">
              <label
                htmlFor="newUsername"
                className="block text-sm font-semibold text-[#1A2D42] mb-2"
              >
                Usuario
              </label>
              <input
                type="text"
                id="newUsername"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full px-4 py-2 border border-[#AAB7B7] rounded focus:outline-none focus:ring focus:ring-[#2E4156] text-[#1A2D42]"
                placeholder="Ingresa un nuevo usuario"
              />
            </div>

            {/* Campo Contraseña (Nueva contraseña) */}
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-[#1A2D42] mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#AAB7B7] rounded focus:outline-none focus:ring focus:ring-[#2E4156] text-[#1A2D42]"
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>

            {/* Botón Crear Cuenta */}
            <button
              type="submit"
              className="w-full bg-[#1A2D42] hover:bg-[#2E4156] text-[#D4D8DD] font-semibold py-2 rounded transition duration-300"
            >
              Crear Cuenta
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            {/* Campo Usuario */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-[#1A2D42] mb-2"
              >
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-[#AAB7B7] rounded focus:outline-none focus:ring focus:ring-[#2E4156] text-[#1A2D42]"
                placeholder="Ingresa tu usuario"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#1A2D42] mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#AAB7B7] rounded focus:outline-none focus:ring focus:ring-[#2E4156] text-[#1A2D42]"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            {/* Botón Iniciar Sesión */}
            <button
              type="submit"
              className="w-full bg-[#1A2D42] hover:bg-[#2E4156] text-[#D4D8DD] font-semibold py-2 rounded transition duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        )}

        {/* Opciones adicionales */}
        <div className="text-center mt-4">
          <p className="text-sm text-[#1A2D42]">
            {isCreatingAccount ? (
              <>
                ¿Ya tienes una cuenta?{' '}
                <button
                  className="text-[#2E4156] font-semibold hover:underline"
                  onClick={() => setIsCreatingAccount(false)}
                >
                  Iniciar Sesión
                </button>
              </>
            ) : (
              <>
                ¿No tienes una cuenta?{' '}
                <button
                  className="text-[#2E4156] font-semibold hover:underline"
                  onClick={() => setIsCreatingAccount(true)}
                >
                  Crear Cuenta
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;