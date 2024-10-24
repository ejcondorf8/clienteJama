import React from 'react';
import { Fish } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-jama-blue to-jama-blue-dark text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Fish className="h-6 w-6" />
            <span className="text-2xl font-bold">¡LA JAMA!</span>
          </div>

          {/* Contact Info */}
          <div className="text-center text-white/90 text-sm">
            <p>Sistema de Gestión de Restaurante</p>
            <p className="mt-1">Atención al cliente: (123) 456-7890</p>
          </div>

          {/* Copyright */}
          <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/20 w-full text-center">
            <p>&copy; {currentYear} JAMA Restaurant Management System</p>
            <p className="mt-1">Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;