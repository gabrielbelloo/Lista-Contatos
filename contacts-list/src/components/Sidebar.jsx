import { useState } from "react";
import {
  Home,
  Users,
  Folder,
  Calendar,
  FileText,
  PieChart,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menus = [
    { name: "Dashboard", icon: <Home size={20} />, badge: "5" },
    { name: "Team", icon: <Users size={20} /> },
    { name: "Projects", icon: <Folder size={20} />, badge: "12" },
    { name: "Calendar", icon: <Calendar size={20} />, badge: "20+" },
    { name: "Documents", icon: <FileText size={20} /> },
    { name: "Reports", icon: <PieChart size={20} /> },
  ];

  return (
    <aside
      className={`bg-[#0f172a] text-gray-200 h-screen flex flex-col justify-center transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header / Toggle */}
      <div className="flex items-center justify-between p-4">
        <div className="text-blue-400 font-bold text-xl align-items-center flex gap-2">

        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white transition"
        >
          {isOpen && <PanelRightOpen size={20} />}
          {!isOpen && <PanelRightClose size={20} />}
        </button>
      </div>

      {/* Menu principal */}
      <nav className="flex-1 px-3 space-y-1 mt-4">
                  <p className="text-sm text-gray-500 mb-2 uppercase">Home</p>
        {menus.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-2 rounded-md hover:bg-[#1e293b] transition cursor-pointer ${ isOpen ? "justify-between" : "justify-center"}`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </div>
            {isOpen && item.badge && (
              <span className="bg-[#1e293b] text-xs px-2 py-0.5 rounded-full text-gray-300">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Seção de times */}
      {isOpen && (
        <div className="px-4 mt-4">
          <p className="text-sm text-gray-500 mb-2 uppercase">Social Media</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 hover:bg-[#1e293b] rounded-md">
              <span className="w-6 h-6 flex items-center justify-center bg-[#1e293b] text-xs rounded-full">
                H
              </span>
              <span>Gabriel Bello</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#1e293b] rounded-md">
              <span className="w-6 h-6 flex items-center justify-center bg-[#1e293b] text-xs rounded-full">
                T
              </span>
              <span>gabrielbelloo</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#1e293b] rounded-md">
              <span className="w-6 h-6 flex items-center justify-center bg-[#1e293b] text-xs rounded-full">
                W
              </span>
              <span>gabrielbelloo</span>
            </div>
          </div>
        </div>
      )}

      {/* Perfil */}
      <div className="flex items-center gap-3 p-4 border-t border-gray-700 mt-auto">
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        {isOpen && <span className="font-medium">Usuário</span>}
      </div>
    </aside>
  );
}
