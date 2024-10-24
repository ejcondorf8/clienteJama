import React, { useEffect, useState } from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';
import axios from 'axios';
interface Manual {
  id: number;
  name: string;
  link: string;
}

export function ViewManuals() {
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManuals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manuals');
        setManuals(response.data.manuals);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los manuales');
        setLoading(false);
      }
    };

    fetchManuals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Manuales Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {manuals.map((manual) => (
          <div
            key={manual.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-lg font-semibold">{manual.name}</h2>
            </div>
            <div className="flex justify-between mt-4">
              <a
                href={manual.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Download className="w-5 h-5 mr-1" />
                Descargar
              </a>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => {
                  // Implement delete functionality
                  console.log('Delete manual:', manual.id);
                }}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ViewManuals;