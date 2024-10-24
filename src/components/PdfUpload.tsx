import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

const PdfUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [manualName, setManualName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleManualNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualName(e.target.value);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Por favor, selecciona un archivo PDF.');
      return;
    }
    if (!manualName.trim()) {
      setMessage('Por favor, ingresa el nombre del manual.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', manualName);
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/manual', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Manual "${manualName}" subido exitosamente. URL: ${data.url}`);
        setFile(null);
        setManualName('');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error de red. Por favor, intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Subir Manual PDF</h2>
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <label htmlFor="manual-name" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Manual
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">
              <FileText size={20} />
            </span>
            <input
              type="text"
              id="manual-name"
              value={manualName}
              onChange={handleManualNameChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="Ingresa el nombre del manual"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="pdf-file" className="block text-gray-700 text-sm font-bold mb-2">
            Seleccionar archivo PDF
          </label>
          <div className="relative">
            <input
              type="file"
              id="pdf-file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="pdf-file"
              className="flex items-center justify-center w-full px-4 py-2 bg-white text-indigo-500 rounded-lg border-2 border-indigo-500 cursor-pointer hover:bg-indigo-50 transition duration-300"
            >
              <Upload size={20} className="mr-2" />
              {file ? file.name : 'Seleccionar PDF'}
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={!file || !manualName.trim() || uploading}
          className={`w-full ${
            file && manualName.trim() && !uploading ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-300 cursor-not-allowed'
          } text-white text-sm font-bold py-2 px-4 rounded-lg transition duration-300`}
        >
          {uploading ? 'Subiendo...' : 'Subir Manual'}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${message.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default PdfUpload;