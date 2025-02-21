import React from 'react';

interface MenuItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeTab, setActiveTab }) => {
  return (
    <div className="bg-gray-900 text-white w-64 flex flex-col">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center p-1 mb-4">
            <img
              src="https://raw.githubusercontent.com/jjmontalban/images-projects/main/dinoes.png"
              alt="DINOES Logo"
              className="w-28 h-28 object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-center">DINOES</h1>
          <p className="text-sm text-gray-400 text-center mt-1">Dirección Nacional de Operaciones Especiales</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className={`h-5 w-5 ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center p-0.5">
            <img
              src="https://raw.githubusercontent.com/jjmontalban/images-projects/main/dinoes.png"
              alt="User"
              className="w-9 h-9 object-contain"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">OPERACIONES</p>
            <p className="text-xs text-gray-400">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;