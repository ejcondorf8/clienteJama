import React, { useState } from 'react';
import { Search, User, Trophy, Calendar, AlertCircle } from 'lucide-react';

interface Incentive {
  descrption: string;  // Asegúrate de que la propiedad esté escrita tal como viene del backend
  idEmpleado: number;
  title: string;
}

const IncentiveSearch: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [incentives, setIncentives] = useState<Incentive[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId.trim()) {
      setError('Por favor, ingresa un ID de empleado');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const response = await fetch(`http://127.0.0.1:5000/incentive/${employeeId}`);
      const data = await response.json();

      if (response.ok) {
        // Asegúrate de acceder correctamente al array de "incentives"
        setIncentives(data.incentives);
      } else {
        setError(data.error || 'Error al buscar incentivos');
        setIncentives([]);
      }
    } catch (error) {
      setError('Error de conexión. Por favor, intenta de nuevo.');
      setIncentives([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <div className="flex items-center justify-center mb-6">
        <Search className="text-indigo-500 w-8 h-8 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Buscar Incentivos</h2>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 transition duration-200"
            placeholder="Ingresa ID del empleado"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full flex items-center justify-center ${
            !loading
              ? 'bg-indigo-500 hover:bg-indigo-600'
              : 'bg-gray-400 cursor-not-allowed'
          } text-white font-semibold py-3 px-4 rounded-lg transition duration-300`}
        >
          {loading ? (
            'Buscando...'
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Buscar Incentivos
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {searched && !loading && !error && incentives.length === 0 && (
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No se encontraron incentivos para este empleado.</p>
        </div>
      )}

      {incentives.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Incentivos Encontrados
          </h3>
          {incentives.map((incentive) => (
            <div
              key={incentive.idEmpleado}  // Asumí que "idEmpleado" es único
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition duration-200"
            >
              <div className="flex items-center mb-2">
                <Trophy className="w-5 h-5 text-indigo-500 mr-2" />
                <h4 className="font-semibold text-gray-800">{incentive.title}</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span>ID Empleado: {incentive.idEmpleado}</span>
                </div>
                <div className="flex items-center">
                  <span>Descripción: {incentive.descrption}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncentiveSearch;
