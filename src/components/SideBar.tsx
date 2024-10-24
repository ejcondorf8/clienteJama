import { LayoutDashboard, ShoppingCart, Users, Inbox, Settings } from "lucide-react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PdfUpload from './PdfUpload';
import  ViewManuals  from './ViewManuals';
import PowerBIReport from "./PowerBIReport";
import IncentiveUpload from "./IncentivesUpload";
import IncentiveSearch from "./IncentiveSearch";
  // Componente para ventas

export function Sidebar() {
  return (
    <Router>
      <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-4">
        <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard className="w-8 h-8" />
          <span className="text-xl font-bold">Dashboard Jama</span>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/manual" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span>Subir Manuales</span>
              </Link>
            </li>
            
            <li>
              <Link to="/view-manuals" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span>Ver Manuales</span>
              </Link>
            </li>

            <li>
              <Link to="/incentive" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Users className="w-5 h-5" />
                <span>Subir Incentivos</span>
              </Link>
            </li>
            
            <li>
              <Link to="/view-incentives" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Users className="w-5 h-5" />
                <span>Ver Incentivos</span>
              </Link>
            </li>
            
            <li>
              <Link to="/sales" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span>Ventas</span>
              </Link>
            </li>

            <li>
              <Link to="/messages" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Inbox className="w-5 h-5" />
                <span>Messages</span>
                <span className="ml-auto bg-blue-500 text-xs px-2 py-1 rounded-full">3</span>
              </Link>
            </li>
            
            <li>
              <Link to="/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="ml-64 p-4">
        <Routes>
          <Route path="/manual" element={<PdfUpload />} />
          <Route path="/incentive" element={<IncentiveUpload />} />
          <Route path="/view-manuals" element={<ViewManuals />} />
          <Route path="/sales" element={<PowerBIReport />} />
          <Route path="/view-incentives" element={<IncentiveSearch />} />
        </Routes>
      </div>  
    </Router>
  );
}
