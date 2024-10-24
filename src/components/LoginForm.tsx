import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:5000/iniciar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.login) {
          onSubmit(email, password);
        } else {
          setError('Credenciales inválidas');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error de red. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="../../public/fish-logo.svg" 
            alt="JAMA Logo" 
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-blue-600">¡LA JAMA!</h1>
        </div>

        {/* Bienvenida */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Bienvenido
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sistema de Gestión de Datos
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
            <p className="text-sm text-center">{error}</p>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-600 text-sm mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-150 ease-in-out"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 text-sm mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-150 ease-in-out"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition duration-300 ease-in-out"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
