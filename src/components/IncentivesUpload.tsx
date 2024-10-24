import React, { useState } from 'react';
import { Trophy, DollarSign, Calendar, Send } from 'lucide-react';
import {User } from 'lucide-react';

const IncentiveUpload: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    deadline: '',
    description: '',
    idEmpleado: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.deadline) {
      setMessage('Por favor, completa todos los campos requeridos.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/incentive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Incentivo creado exitosamente!');
        setFormData({
          title: '',
          amount: '',
          deadline: '',
          description: '',
          idEmpleado: '',
        });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error de red. Por favor, intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <div className="flex items-center justify-center mb-6">
        <Trophy className="text-indigo-500 w-8 h-8 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Nuevo Incentivo</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
            Título del Incentivo
          </label>
          <div className="relative">
            <Trophy className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 transition duration-200"
              placeholder="Ej: Bono por Rendimiento Q4"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-700 text-sm font-semibold mb-2">
            Monto del Incentivo
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 transition duration-200"
              placeholder="Ej: 5000"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="deadline" className="block text-gray-700 text-sm font-semibold mb-2">
            Fecha Límite
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 transition duration-200"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
            Descripción (Opcional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 transition duration-200 min-h-[100px]"
            placeholder="Describe los detalles y requisitos del incentivo..."
          />
        </div>

        <div>
          <label htmlFor="idEmpleado" className="block text-gray-700 text-sm font-semibold mb-2">
            ID Empleado
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="number"
              id="idEmpleado"
              name="idEmpleado"
              value={formData.idEmpleado}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 transition duration-200"
              placeholder="Ej: 123456"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full flex items-center justify-center ${
            !submitting
              ? 'bg-indigo-500 hover:bg-indigo-600'
              : 'bg-gray-400 cursor-not-allowed'
          } text-white font-semibold py-3 px-4 rounded-lg transition duration-300`}
        >
          {submitting ? (
            'Procesando...'
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Crear Incentivo
            </>
          )}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg ${
          message.includes('exitosamente')
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default IncentiveUpload;