import React from 'react';
import { User } from 'firebase/auth';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="relative w-screen h-screen bg-gray-900 font-mono overflow-hidden">
      <iframe
        src="https://shadowscriptz.xyz/shadowinnovationsapps/simdataapp.php"
        title="Secure Dashboard"
        className="w-full h-full border-0"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      ></iframe>
      {/* Overlay to hide the footer of the embedded site */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900 z-5"></div>
      <button
        onClick={onLogout}
        className="absolute top-4 right-4 z-10 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500 transition-all duration-300"
      >
        Disconnect & Logout
      </button>
    </div>
  );
};

export default Dashboard;