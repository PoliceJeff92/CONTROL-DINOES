import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
              <img
                src="https://raw.githubusercontent.com/jjmontalban/images-projects/main/dinoes.png"
                alt="DINOES Logo"
                className="w-9 h-9 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Control DINOES</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center p-0.5">
                <img
                  src="https://raw.githubusercontent.com/jjmontalban/images-projects/main/dinoes.png"
                  alt="Profile"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div>
                <p className="font-medium text-gray-800">OPERACIONES</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;