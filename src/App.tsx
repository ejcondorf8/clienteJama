import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import { Sidebar } from './components/SideBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email: string, password: string) => {
    console.log('Intento de inicio de sesión', { email, password });
    // Aquí iría la lógica de autenticación real
    setIsLoggedIn(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {isLoggedIn  }
      <main className="flex-grow flex items-center justify-center">
        {isLoggedIn ? (
           <div className="flex">
           <Sidebar />
         </div>
        ) : (
          <LoginForm onSubmit={handleLogin} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;