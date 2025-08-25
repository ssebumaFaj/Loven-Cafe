
import React, { useState } from 'react';
import { View } from './types';
import { POSView } from './components/POSView';
import { InventoryView } from './components/InventoryView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { CashRegisterIcon } from './components/icons/CashRegisterIcon';
import { InventoryIcon } from './components/icons/InventoryIcon';
import { ChartBarIcon } from './components/icons/ChartBarIcon';
import { CogIcon } from './components/icons/CogIcon';


const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
        <span className="mr-3">{icon}</span>
        {label}
    </button>
);


const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>(View.POS);

    const renderView = () => {
        switch (activeView) {
            case View.POS:
                return <POSView />;
            case View.Inventory:
                return <InventoryView />;
            case View.Reports:
                return <ReportsView />;
            case View.Settings:
                return <SettingsView />;
            default:
                return <POSView />;
        }
    };
    
    return (
        <div className="flex h-screen w-screen bg-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800/50 border-r border-gray-700 flex flex-col p-4">
                <div className="flex items-center mb-8">
                    <div className="p-2 bg-indigo-600 rounded-lg mr-3">
                        <CashRegisterIcon className="w-6 h-6 text-white"/>
                    </div>
                    <h1 className="text-xl font-bold text-white">Zenith POS</h1>
                </div>

                <nav className="flex-grow space-y-2">
                    <NavItem
                        icon={<CashRegisterIcon className="w-5 h-5" />}
                        label="POS"
                        isActive={activeView === View.POS}
                        onClick={() => setActiveView(View.POS)}
                    />
                    <NavItem
                        icon={<InventoryIcon className="w-5 h-5" />}
                        label="Inventory"
                        isActive={activeView === View.Inventory}
                        onClick={() => setActiveView(View.Inventory)}
                    />
                    <NavItem
                        icon={<ChartBarIcon className="w-5 h-5" />}
                        label="Reports"
                        isActive={activeView === View.Reports}
                        onClick={() => setActiveView(View.Reports)}
                    />
                </nav>

                <div className="mt-auto">
                    <NavItem
                        icon={<CogIcon className="w-5 h-5" />}
                        label="Settings"
                        isActive={activeView === View.Settings}
                        onClick={() => setActiveView(View.Settings)}
                    />
                     <div className="flex items-center p-3 mt-4">
                        <img className="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/seed/user/100" alt="User" />
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-white">Jane Doe</p>
                            <p className="text-xs text-gray-400">Cashier</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
               {renderView()}
            </main>
        </div>
    );
};

export default App;
